import { connect } from 'cloudflare:sockets';
import dashboardHtml from './dashboard.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. Serve Dashboard HTML
      if (url.pathname === '/' || url.pathname === '/index.html') {
        return new Response(dashboardHtml, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      // 2. API: Get all customers (with dynamic draft check and 7-day auto-red check)
      if (url.pathname === '/api/kunden' && method === 'GET') {
        const list = await env.KUNDEN_DB.list({ prefix: 'kunde:' });
        const kunden = [];
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

        for (const key of list.keys) {
          const raw = await env.KUNDEN_DB.get(key.name);
          if (raw) {
            const customer = JSON.parse(raw);
            
            // Set createdAt if missing
            if (!customer.createdAt) {
              customer.createdAt = new Date().toISOString();
              await env.KUNDEN_DB.put(key.name, JSON.stringify(customer));
            }

            // Check draft logic (must have project AND custom domain that is not a default workers/pages dev domain):
            const hasProject = customer.linkedCloudflareProject && customer.linkedCloudflareProject.trim();
            const hasDomain = customer.customDomain && customer.customDomain.trim() && !customer.customDomain.includes('.workers.dev') && !customer.customDomain.includes('.pages.dev');
            
            customer.isDraft = !hasProject || !hasDomain;

            if (customer.manualOverride) {
              // Respect manual override in GET
            } else if (customer.isDraft) {
              const ageMs = Date.now() - new Date(customer.createdAt).getTime();
              if (ageMs > sevenDaysMs) {
                if (customer.status !== 'red' || customer.statusReason !== 'Bitte wieder beim Kunden melden (Entwurf seit 7 Tagen)') {
                  customer.status = 'red';
                  customer.statusReason = 'Bitte wieder beim Kunden melden (Entwurf seit 7 Tagen)';
                  await env.KUNDEN_DB.put(key.name, JSON.stringify(customer));
                }
              } else {
                // Draft but less than 7 days: clean up any legacy immediate red or expired red status if they were set
                if (
                  customer.statusReason === 'Kunde ist noch ein Entwurf - Keine Domain verbunden' ||
                  customer.statusReason === 'Bitte wieder beim Kunden melden (Entwurf seit 7 Tagen)'
                ) {
                  customer.status = 'green';
                  customer.statusReason = 'Neu angelegt (Entwurf)';
                  await env.KUNDEN_DB.put(key.name, JSON.stringify(customer));
                }
              }
            } else {
              // Clear draft status if project & custom domain are linked
              if (
                customer.statusReason === 'Kunde ist noch ein Entwurf - Keine Domain verbunden' || 
                customer.statusReason === 'Bitte wieder beim Kunden melden (Entwurf seit 7 Tagen)'
              ) {
                customer.status = 'green';
                customer.statusReason = 'Website verknüpft';
                await env.KUNDEN_DB.put(key.name, JSON.stringify(customer));
              }

              // Check 7-day auto-red logic:
              // If last interaction was outgoing (we wrote) and > 7 days ago, and not manually overridden
              if (
                customer.lastInteraction &&
                customer.lastDirection === 'outgoing' &&
                customer.status === 'green'
              ) {
                const lastDate = new Date(customer.lastInteraction).getTime();
                if (Date.now() - lastDate > sevenDaysMs) {
                  customer.status = 'red';
                  customer.statusReason = 'Keine Rückmeldung auf unsere E-Mail seit 7 Tagen';
                  // Save updated status
                  await env.KUNDEN_DB.put(key.name, JSON.stringify(customer));
                }
              }
            }

            kunden.push(customer);
          }
        }
        return new Response(JSON.stringify(kunden), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 3. API: Save/Update customer
      if (url.pathname === '/api/kunden' && method === 'POST') {
        const customer = await request.json();
        if (!customer.id) {
          customer.id = customer.name.toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        }
        
        // Load existing customer if available to preserve histories/contracts
        const existingRaw = await env.KUNDEN_DB.get(`kunde:${customer.id}`);
        let finalCustomer = customer;
        if (existingRaw) {
          const existing = JSON.parse(existingRaw);
          finalCustomer = {
            ...existing,
            ...customer,
            contracts: customer.contracts || existing.contracts || [],
          };
        } else {
          finalCustomer.contracts = [];
          finalCustomer.status = finalCustomer.status || 'green';
          finalCustomer.statusReason = finalCustomer.statusReason || 'Neu angelegt';
        }

        // Keep or create createdAt timestamp
        finalCustomer.createdAt = finalCustomer.createdAt || new Date().toISOString();

        // Apply draft checks on save:
        const hasProject = finalCustomer.linkedCloudflareProject && finalCustomer.linkedCloudflareProject.trim();
        const hasDomain = finalCustomer.customDomain && finalCustomer.customDomain.trim() && !finalCustomer.customDomain.includes('.workers.dev') && !finalCustomer.customDomain.includes('.pages.dev');

        finalCustomer.isDraft = !hasProject || !hasDomain;
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

        // Fetch emails to check if any unresolved incoming mail exists
        const emailsRaw = await env.KUNDEN_DB.get(`emails:${finalCustomer.id}`);
        const emails = emailsRaw ? JSON.parse(emailsRaw) : [];
        const hasUnresolvedIncoming = emails.some(m => m.direction === 'incoming' && !m.isResolved);
        const hasUnresolvedTodos = (finalCustomer.todos || []).some(t => !t.done);

        if (finalCustomer.manualOverride) {
          // Explicit manual override by user - preserve status & statusReason!
        } else if (hasUnresolvedIncoming || hasUnresolvedTodos) {
          finalCustomer.status = 'red';
          if (hasUnresolvedIncoming) {
            const unresolvedMail = emails.find(m => m.direction === 'incoming' && !m.isResolved);
            finalCustomer.statusReason = unresolvedMail.body || unresolvedMail.subject;
          } else {
            const unresolvedTodo = finalCustomer.todos.find(t => !t.done);
            finalCustomer.statusReason = `Offene Aufgabe: ${unresolvedTodo.text}`;
          }
        } else {
          // No unresolved items! Check draft rules:
          if (finalCustomer.isDraft) {
            const ageMs = Date.now() - new Date(finalCustomer.createdAt).getTime();
            if (ageMs > sevenDaysMs) {
              finalCustomer.status = 'red';
              finalCustomer.statusReason = 'Bitte wieder beim Kunden melden (Entwurf seit 7 Tagen)';
            } else {
              finalCustomer.status = 'green';
              finalCustomer.statusReason = 'Neu angelegt (Entwurf)';
            }
          } else {
            finalCustomer.status = 'green';
            finalCustomer.statusReason = 'Alle Aufgaben erledigt';
          }
        }

        await env.KUNDEN_DB.put(`kunde:${finalCustomer.id}`, JSON.stringify(finalCustomer));
        return new Response(JSON.stringify({ success: true, customer: finalCustomer }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 4. API: Delete customer
      if (url.pathname.startsWith('/api/kunden/') && method === 'DELETE') {
        const id = url.pathname.split('/').pop();
        await env.KUNDEN_DB.delete(`kunde:${id}`);
        await env.KUNDEN_DB.delete(`emails:${id}`);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 5. API: Upload Contract to R2
      if (url.pathname === '/api/contracts' && method === 'POST') {
        const formData = await request.formData();
        const clientId = formData.get('clientId');
        const file = formData.get('file');

        if (!clientId || !file || !(file instanceof File)) {
          return new Response(JSON.stringify({ error: 'Missing clientId or file' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const customerRaw = await env.KUNDEN_DB.get(`kunde:${clientId}`);
        if (!customerRaw) {
          return new Response(JSON.stringify({ error: 'Client not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const customer = JSON.parse(customerRaw);
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const r2Path = `gustav/contracts/${clientId}/${Date.now()}_${safeName}`;

        // Put object to R2 BUCKET
        await env.BUCKET.put(r2Path, file.stream(), {
          httpMetadata: { contentType: file.type || 'application/octet-stream' },
        });

        const contractUrl = `/api/contracts/download?path=${encodeURIComponent(r2Path)}`;
        const newContract = {
          name: file.name,
          r2Path: r2Path,
          url: contractUrl,
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        customer.contracts = customer.contracts || [];
        customer.contracts.push(newContract);
        await env.KUNDEN_DB.put(`kunde:${clientId}`, JSON.stringify(customer));

        return new Response(JSON.stringify({ success: true, contract: newContract }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 5b. API: Download Contract from R2 via Secure Proxy
      if (url.pathname === '/api/contracts/download' && method === 'GET') {
        const path = url.searchParams.get('path');
        if (!path) {
          return new Response('Missing path parameter', { status: 400 });
        }

        const file = await env.BUCKET.get(path);
        if (!file) {
          return new Response('Contract not found', { status: 404 });
        }

        const headers = new Headers();
        file.writeHttpMetadata(headers);
        headers.set('etag', file.httpEtag);
        // Force inline display so it opens cleanly in the browser
        headers.set('Content-Disposition', `inline; filename="${path.split('/').pop()}"`);
        headers.set('Access-Control-Allow-Origin', '*');

        return new Response(file.body, { headers });
      }

      // 5c. API: Delete Contract from R2 and Customer Database
      if (url.pathname === '/api/contracts/delete' && method === 'POST') {
        const { clientId, r2Path } = await request.json();
        if (!clientId || !r2Path) {
          return new Response(JSON.stringify({ error: 'Missing clientId or r2Path' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const customerRaw = await env.KUNDEN_DB.get(`kunde:${clientId}`);
        if (!customerRaw) {
          return new Response(JSON.stringify({ error: 'Client not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const customer = JSON.parse(customerRaw);

        // Delete from R2 BUCKET
        try {
          await env.BUCKET.delete(r2Path);
        } catch (e) {
          console.error('Failed to delete file from R2:', e);
        }

        // Filter out the deleted contract
        customer.contracts = (customer.contracts || []).filter(c => c.r2Path !== r2Path);
        await env.KUNDEN_DB.put(`kunde:${clientId}`, JSON.stringify(customer));

        return new Response(JSON.stringify({ success: true, customer }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 6. API: Get Email Logs for Client
      if (url.pathname.startsWith('/api/emails/') && method === 'GET') {
        const id = url.pathname.split('/').pop();
        const raw = await env.KUNDEN_DB.get(`emails:${id}`);
        const emails = raw ? JSON.parse(raw) : [];
        return new Response(JSON.stringify(emails), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 7.5 API: Resolve specific email (mark done/open)
      if (url.pathname === '/api/emails/resolve' && method === 'POST') {
        const { clientId, emailId, isResolved } = await request.json();
        if (!clientId || !emailId) {
          return new Response(JSON.stringify({ error: 'Missing clientId or emailId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        // 1. Update the email log
        const logKey = `emails:${clientId}`;
        const rawMails = await env.KUNDEN_DB.get(logKey);
        if (!rawMails) {
          return new Response(JSON.stringify({ error: 'No emails found for client' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const mailLog = JSON.parse(rawMails);
        const email = mailLog.find(m => m.id === emailId);
        if (!email) {
          return new Response(JSON.stringify({ error: 'Email not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        email.isResolved = !!isResolved;
        await env.KUNDEN_DB.put(logKey, JSON.stringify(mailLog));

        // 2. Scan for remaining unresolved incoming emails and tasks for this client
        const hasUnresolvedIncoming = mailLog.some(m => m.direction === 'incoming' && !m.isResolved);

        // 3. Update customer status if all emails are resolved
        const customerRaw = await env.KUNDEN_DB.get(`kunde:${clientId}`);
        if (customerRaw) {
          const customer = JSON.parse(customerRaw);
          const hasUnresolvedTodos = (customer.todos || []).some(t => !t.done);
          
          if (hasUnresolvedIncoming || hasUnresolvedTodos) {
            customer.status = 'red';
            if (hasUnresolvedIncoming) {
              const unresolvedMail = mailLog.find(m => m.direction === 'incoming' && !m.isResolved);
              customer.statusReason = unresolvedMail.body || unresolvedMail.subject;
            } else {
              const unresolvedTodo = customer.todos.find(t => !t.done);
              customer.statusReason = `Offene Aufgabe: ${unresolvedTodo.text}`;
            }
          } else {
            // No unresolved items! Check draft rules:
            const hasProject = customer.linkedCloudflareProject && customer.linkedCloudflareProject.trim();
            const hasDomain = customer.customDomain && customer.customDomain.trim() && !customer.customDomain.includes('.workers.dev') && !customer.customDomain.includes('.pages.dev');
            const isDraft = !hasProject || !hasDomain;

            if (isDraft) {
              const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
              const ageMs = Date.now() - new Date(customer.createdAt || Date.now()).getTime();
              if (ageMs > sevenDaysMs) {
                customer.status = 'red';
                customer.statusReason = 'Bitte wieder beim Kunden melden (Entwurf seit 7 Tagen)';
              } else {
                customer.status = 'green';
                customer.statusReason = 'Neu angelegt (Entwurf)';
              }
            } else {
              customer.status = 'green';
              customer.statusReason = 'Alle Aufgaben erledigt';
            }
          }

          await env.KUNDEN_DB.put(`kunde:${clientId}`, JSON.stringify(customer));
          return new Response(JSON.stringify({ success: true, customer, emails: mailLog }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        return new Response(JSON.stringify({ success: true, emails: mailLog }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 7.6 API: Fetch Cloudflare Status and Internal System Status
      if (url.pathname === '/api/system/status' && method === 'GET') {
        let indicator = 'none';
        let description = 'Alle Systeme laufen nominal';
        try {
          // Fetch Cloudflare status v2 API with a 3-second timeout
          const res = await fetch('https://www.cloudflarestatus.com/api/v2/status.json', {
            headers: { 'User-Agent': 'Gustav Scholz & Friese Status Monitor' },
            signal: AbortSignal.timeout(3000)
          });
          if (res.ok) {
            const data = await res.json();
            indicator = data.status.indicator || 'none';
            description = data.status.description || 'Systeme nominal';
          }
        } catch (e) {
          console.error('Failed to fetch Cloudflare status page:', e);
          indicator = 'unknown';
          description = 'Statusseite nicht erreichbar';
        }

        // Check internal services
        const imapConfigured = !!(await env.KUNDEN_DB.get('settings:imap'));

        return new Response(JSON.stringify({
          cloudflare: env.CLOUDFLARE_API_TOKEN ? 'green' : 'red',
          r2: env.BUCKET ? 'green' : 'red',
          ai: env.AI ? 'green' : 'red',
          imap: imapConfigured ? 'green' : 'red',
          cfStatusPage: {
            indicator,
            description
          }
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 7.7 API: Finanzen CRUD Endpunkte
      if (url.pathname === '/api/finanzen' && method === 'GET') {
        const raw = await env.KUNDEN_DB.get('finanzen');
        const transactions = raw ? JSON.parse(raw) : [];
        return new Response(JSON.stringify(transactions), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      if (url.pathname === '/api/finanzen' && method === 'POST') {
        const transaction = await request.json();
        if (!transaction.description || transaction.amount === undefined) {
          return new Response(JSON.stringify({ error: 'Missing required transaction fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const raw = await env.KUNDEN_DB.get('finanzen');
        let list = raw ? JSON.parse(raw) : [];

        if (!transaction.id) {
          transaction.id = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        }

        transaction.date = transaction.date || new Date().toISOString().split('T')[0];
        transaction.type = transaction.type || 'income'; // 'income' or 'expense'
        transaction.category = transaction.category || 'Allgemein';
        transaction.interval = transaction.interval || 'once'; // 'once' or 'monthly'
        transaction.amount = parseFloat(transaction.amount) || 0;

        const idx = list.findIndex(t => t.id === transaction.id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...transaction };
        } else {
          list.unshift(transaction);
        }

        await env.KUNDEN_DB.put('finanzen', JSON.stringify(list));
        return new Response(JSON.stringify({ success: true, transaction, transactions: list }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      if (url.pathname.startsWith('/api/finanzen/') && method === 'DELETE') {
        const txId = url.pathname.split('/').pop();
        const raw = await env.KUNDEN_DB.get('finanzen');
        let list = raw ? JSON.parse(raw) : [];
        list = list.filter(t => t.id !== txId);
        await env.KUNDEN_DB.put('finanzen', JSON.stringify(list));
        return new Response(JSON.stringify({ success: true, transactions: list }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 8. API: Gustav Workers AI Chat
      if (url.pathname === '/api/chat' && method === 'POST') {
        const { message, clientId } = await request.json();

        // Build context about clients
        const list = await env.KUNDEN_DB.list({ prefix: 'kunde:' });
        let clientsContext = '';
        for (const key of list.keys) {
          const raw = await env.KUNDEN_DB.get(key.name);
          if (raw) {
            const c = JSON.parse(raw);
            clientsContext += `- Name: ${c.name}, E-Mail: ${c.email}, Status: ${c.status} (${c.statusReason || ''}), Cloudflare Project: ${c.linkedCloudflareProject || 'none'}, Notizen: ${c.notes || ''}\n`;
          }
        }

        let activeClientMails = '';
        if (clientId) {
          const rawMails = await env.KUNDEN_DB.get(`emails:${clientId}`);
          if (rawMails) {
            const mails = JSON.parse(rawMails).slice(0, 10); // top 10 mails
            activeClientMails = `Aktueller E-Mail-Verlauf für diesen Kunden (Kunden-ID: ${clientId}):\n` + mails.map(m => {
              const directionLabel = m.direction === 'incoming' 
                ? 'EINGEHEND (Vom Kunden an uns/Scholz & Friese gesendet)' 
                : 'AUSGEHEND (Von uns/Scholz & Friese an den Kunden gesendet)';
              return `  - Am ${new Date(m.date).toLocaleString('de-DE')}: ${directionLabel}\n    Betreff: "${m.subject}"\n    Inhalt: "${m.body.substring(0, 300)}..."`;
            }).join('\n') + '\n';
          } else {
            activeClientMails = `Für diesen Kunden (${clientId}) liegt noch kein E-Mail-Verlauf vor.\n`;
          }
        } else {
          // Global context: Fetch emails across all clients
          const mailList = await env.KUNDEN_DB.list({ prefix: 'emails:' });
          let allMails = [];
          for (const key of mailList.keys) {
            const cId = key.name.split(':')[1];
            const clientRaw = await env.KUNDEN_DB.get(`kunde:${cId}`);
            let clientName = cId;
            if (clientRaw) {
              try {
                clientName = JSON.parse(clientRaw).name;
              } catch(e) {}
            }
            const rawMails = await env.KUNDEN_DB.get(key.name);
            if (rawMails) {
              try {
                const mails = JSON.parse(rawMails);
                mails.forEach(m => {
                  allMails.push({ ...m, clientName, clientId: cId });
                });
              } catch(e) {}
            }
          }
          // Sort allMails newest first
          allMails.sort((a, b) => new Date(b.date) - new Date(a.date));
          const topMails = allMails.slice(0, 10);
          if (topMails.length > 0) {
            activeClientMails = `Letzte E-Mails über alle Kunden hinweg (chronologisch, neueste zuerst):\n` + topMails.map(m => {
              const directionLabel = m.direction === 'incoming' 
                ? `EINGEHEND (Vom Kunden ${m.clientName} an uns/Scholz & Friese)` 
                : `AUSGEHEND (Von uns/Scholz & Friese an Kunden ${m.clientName})`;
              return `  - Am ${new Date(m.date).toLocaleString('de-DE')}: ${directionLabel}\n    Kunde: ${m.clientName} (ID: ${m.clientId})\n    Betreff: "${m.subject}"\n    Inhalt: "${m.body.substring(0, 300)}..."`;
            }).join('\n') + '\n';
          } else {
            activeClientMails = `Es sind noch überhaupt keine E-Mails im System hinterlegt.\n`;
          }
        }

        const systemPrompt = `Du bist Gustav, der intelligente, absolut kompetente und treue Jarvis-ähnliche KI-Assistent der Webdesign-Agentur Scholz & Friese.
Dein Job ist es, alle Informationen über Kunden, Verträge und Webseiten zu verwalten und bei Fragen Rede und Antwort zu stehen.
Sprich den Benutzer mit Du an. Antworte professionell, hilfsbereit, aber locker und mit feinem Humor, passend zu einem coolen Jarvis.

WICHTIGSTE REGEL ZU DEINER IDENTITÄT UND DEINEM CHATPARTNER:
- Du sprichst mit deinen Entwickler-Kollegen/Chefs von Scholz & Friese (den Betreibern der Webdesign-Agentur). 
- Die Person, mit der du chattest, ist NIEMALS der Kunde selbst! Sie ist dein Kollege/Chef von Scholz & Friese. Sprich sie immer direkt und locker mit "Du" an.
- Der Kunde (z. B. Weymann Gebäudetechnik) ist eine dritte Partei. Sprich immer ÜBER den Kunden in der 3. Person (z. B. "Der Kunde Weymann hat uns geschrieben..."). Sprich deinen Chatpartner niemals mit "Sehr geehrter Herr Weymann" oder "Sie" an!
- Wenn der Benutzer fragt "was habe ich gesendet", "unsere E-Mails", "letzte gesendete Mail" oder Ähnliches, meint er E-Mails, die AUSGEHEND (von uns/Scholz & Friese an den Kunden) gesendet wurden.
- Wenn der Benutzer fragt "was habe ich bekommen", "letzte Mail die ich bekommen habe", "letzte eingegangene Mail", "was hat der Kunde gesendet" oder Ähnliches, meint er E-Mails, die EINGEHEND (vom Kunden an uns/Scholz & Friese) empfangen wurden.
- Wenn der Benutzer nach "der letzten Mail" fragt, fass die chronologisch allerneueste Mail zusammen (entweder aus dem Verlauf des ausgewählten Kunden oder aus dem globalen Verlauf, je nachdem welche Daten unten vorliegen). Sag ihm genau, von wem sie kam, wann sie ankam und was der Inhalt/Betreff ist.

Hier ist das aktuelle Firmenwissen über alle Kunden von Scholz & Friese:
${clientsContext}

${activeClientMails}

Antworte kurz, strukturiert und präzise auf Deutsch. Falls du Informationen nicht hast, sag das ehrlich.`;

        const response = await env.AI.run('@cf/meta/llama-3.2-1b-instruct', {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ]
        });

        return new Response(JSON.stringify(response), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 8.1 API: Save IMAP Settings
      if (url.pathname === '/api/settings/imap' && method === 'POST') {
        const accounts = await request.json();
        if (!Array.isArray(accounts)) {
          return new Response(JSON.stringify({ error: 'Expected array of IMAP settings' }), { status: 400, headers: corsHeaders });
        }

        // Get existing accounts to preserve passwords if sent as mask '********'
        const rawExisting = await env.KUNDEN_DB.get('settings:imap');
        let existingAccounts = [];
        if (rawExisting) {
          try {
            const parsed = JSON.parse(rawExisting);
            existingAccounts = Array.isArray(parsed) ? parsed : [parsed];
          } catch (e) {
            console.error("Failed to parse existing IMAP settings:", e);
          }
        }

        const finalAccounts = accounts.map(acc => {
          let password = acc.password;
          if (password === '********') {
            const match = existingAccounts.find(ea => ea.email === acc.email);
            if (match) {
              password = match.password;
            }
          }
          return {
            email: acc.email,
            password: password,
            host: acc.host || 'mail.hostinger.com',
            port: acc.port || 993
          };
        });

        await env.KUNDEN_DB.put('settings:imap', JSON.stringify(finalAccounts));
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 8.2 API: Get IMAP Settings (Masked Passwords)
      if (url.pathname === '/api/settings/imap' && method === 'GET') {
        const raw = await env.KUNDEN_DB.get('settings:imap');
        if (!raw) {
          return new Response(JSON.stringify({ configured: false, accounts: [] }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
        try {
          const parsed = JSON.parse(raw);
          const accounts = Array.isArray(parsed) ? parsed : [parsed];
          const maskedAccounts = accounts.map(acc => ({
            email: acc.email,
            host: acc.host,
            port: acc.port,
            password: '********'
          }));
          return new Response(JSON.stringify({
            configured: maskedAccounts.length > 0,
            accounts: maskedAccounts
          }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (e) {
          return new Response(JSON.stringify({ configured: false, accounts: [], error: 'Failed to parse settings' }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }

      // 8.3 API: Sync emails from all IMAP servers
      if (url.pathname === '/api/emails/sync' && method === 'POST') {
        const rawSettings = await env.KUNDEN_DB.get('settings:imap');
        if (!rawSettings) {
          return new Response(JSON.stringify({ error: 'IMAP settings not configured' }), { status: 400, headers: corsHeaders });
        }

        let accounts = [];
        try {
          const parsed = JSON.parse(rawSettings);
          accounts = Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
          return new Response(JSON.stringify({ error: 'Failed to parse IMAP settings' }), { status: 500, headers: corsHeaders });
        }

        if (accounts.length === 0) {
          return new Response(JSON.stringify({ error: 'No IMAP accounts configured' }), { status: 400, headers: corsHeaders });
        }

        // Fetch all customers to match
        const list = await env.KUNDEN_DB.list({ prefix: 'kunde:' });
        const customers = [];
        for (const key of list.keys) {
          const raw = await env.KUNDEN_DB.get(key.name);
          if (raw) customers.push(JSON.parse(raw));
        }

        const emailRegex = /<([^>]+)>/;
        const parseEmail = (raw) => {
          const m = raw.match(emailRegex);
          return m ? m[1].toLowerCase().trim() : raw.toLowerCase().trim();
        };

        let totalAddedCount = 0;
        const errors = [];

        for (const account of accounts) {
          try {
            console.log(`Syncing IMAP headers for ${account.email}...`);
            const imapMails = await fetchImapHeaders(account.email, account.password, account.host, account.port);

            for (const mail of imapMails) {
              const sender = parseEmail(mail.from);
              const recipient = parseEmail(mail.to);

              // Find matching customer
              const matched = customers.find(c => {
                const cEmail = (c.email || '').toLowerCase().trim();
                return cEmail && (sender === cEmail || recipient === cEmail);
              });

              if (matched) {
                const direction = sender === matched.email.toLowerCase().trim() ? 'incoming' : 'outgoing';
                const logKey = `emails:${matched.id}`;

                const rawMails = await env.KUNDEN_DB.get(logKey);
                const mailLog = rawMails ? JSON.parse(rawMails) : [];

                // Check if mail already exists in logs (by subject and date)
                const exists = mailLog.some(m => m.subject === mail.subject && m.date === mail.date);
                if (!exists) {
                  let bodyPreview = `E-Mail über Account ${account.email} geladen. E-Mail liegt auf dem Server.`;
                  
                  // Update customer metadata
                  matched.lastInteraction = mail.date;
                  matched.lastDirection = direction;

                  if (direction === 'incoming') {
                    const analysis = await analyzeIncomingEmail(env, mail.subject, mail.body || '(Kein E-Mail-Inhalt geladen)');
                    bodyPreview = analysis.summary;
                    
                    if (analysis.actionRequired) {
                      matched.status = 'red';
                      matched.statusReason = analysis.summary;
                    } else {
                      // Do not mark red if not actionable! Check if client is in draft state.
                      const hasProject = matched.linkedCloudflareProject && matched.linkedCloudflareProject.trim();
                      const hasDomain = matched.customDomain && matched.customDomain.trim() && !matched.customDomain.includes('.workers.dev') && !matched.customDomain.includes('.pages.dev');
                      if (!hasProject || !hasDomain) {
                        matched.status = 'red';
                        matched.statusReason = 'Kunde ist noch ein Entwurf - Keine Domain verbunden';
                      } else {
                        matched.status = 'green';
                        matched.statusReason = `Info: ${analysis.summary}`;
                      }
                    }
                  } else {
                    if (!matched.manualOverride) {
                      matched.status = 'green';
                      matched.statusReason = `Beantwortet am ${new Date(mail.date).toLocaleDateString('de-DE')}`;
                    }
                  }

                  const newMail = {
                    id: mail.id,
                    date: mail.date,
                    direction,
                    from: mail.from,
                    subject: mail.subject,
                    body: bodyPreview,
                    isResolved: direction !== 'incoming', // Eingehende E-Mails sind initial offen, ausgehende erledigt
                  };
                  mailLog.unshift(newMail);
                  await env.KUNDEN_DB.put(logKey, JSON.stringify(mailLog));
                  await env.KUNDEN_DB.put(`kunde:${matched.id}`, JSON.stringify(matched));
                  totalAddedCount++;
                }
              }
            }
          } catch (err) {
            console.error(`Failed to sync emails for ${account.email}:`, err);
            errors.push(`${account.email}: ${err.message}`);
          }
        }

        if (errors.length > 0 && totalAddedCount === 0) {
          return new Response(JSON.stringify({ error: `Sync failed: ${errors.join(', ')}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        return new Response(JSON.stringify({ 
          success: true, 
          syncedCount: totalAddedCount,
          errors: errors.length > 0 ? errors : undefined
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 8.4 API: Cloudflare Domain List (Zones)
      if (url.pathname === '/api/cloudflare/domains' && method === 'GET') {
        const apiToken = env.CLOUDFLARE_API_TOKEN;
        if (!apiToken) {
          return new Response(JSON.stringify({ error: 'Cloudflare API Token not configured' }), { status: 400, headers: corsHeaders });
        }

        const res = await fetch('https://api.cloudflare.com/client/v4/zones', {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Accept': 'application/json'
          }
        });

        if (!res.ok) {
          const err = await res.text();
          return new Response(JSON.stringify({ error: 'Failed to fetch domains from Cloudflare', details: err }), {
            status: res.status,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 9. API: Cloudflare Live Pages & Workers status
      if (url.pathname === '/api/cloudflare/projects' && method === 'GET') {
        const accountId = env.CLOUDFLARE_ACCOUNT_ID;
        const apiToken = env.CLOUDFLARE_API_TOKEN;

        // Fetch Pages Projects, Workers Scripts, Custom Domains and Subdomain
        const pagesUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`;
        const workersUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`;
        const domainsUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/domains`;
        const subdomainUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/subdomain`;

        const [pagesRes, workersRes, domainsRes, subdomainRes] = await Promise.all([
          fetch(pagesUrl, { headers: { Authorization: `Bearer ${apiToken}` } }),
          fetch(workersUrl, { headers: { Authorization: `Bearer ${apiToken}` } }),
          fetch(domainsUrl, { headers: { Authorization: `Bearer ${apiToken}` } }),
          fetch(subdomainUrl, { headers: { Authorization: `Bearer ${apiToken}` } }).catch(() => null),
        ]);

        const pagesData = await pagesRes.json();
        const workersData = await workersRes.json();
        const domainsData = await domainsRes.json();

        let workersSubdomain = '';
        if (subdomainRes) {
          try {
            const sdData = await subdomainRes.json();
            if (sdData.success && sdData.result) {
              workersSubdomain = sdData.result.subdomain || '';
            }
          } catch (e) {
            console.error('Failed to parse workers subdomain:', e);
          }
        }

        return new Response(JSON.stringify({
          pages: pagesData.success ? pagesData.result : [],
          workers: workersData.success ? workersData.result : [],
          workerDomains: domainsData.success ? domainsData.result : [],
          workersSubdomain: workersSubdomain,
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 10. Webhook: Resend Inbound Email webhook intake
      if (url.pathname === '/api/webhooks/email' && method === 'POST') {
        const payload = await request.json();
        // Resend inbound schema: payload has from, to, subject, text/html, etc.
        // Let's parse out sender email address
        const fromRaw = payload.from || '';
        const emailRegex = /<([^>]+)>/;
        const match = fromRaw.match(emailRegex);
        const senderEmail = match ? match[1].toLowerCase().trim() : fromRaw.toLowerCase().trim();

        const subject = payload.subject || 'Kein Betreff';
        const bodyText = payload.text || payload.html || '';
        const toList = Array.isArray(payload.to) ? payload.to : [payload.to || ''];
        
        // Find matching customer by checking their stored email address
        const list = await env.KUNDEN_DB.list({ prefix: 'kunde:' });
        let matchedCustomer = null;

        for (const key of list.keys) {
          const raw = await env.KUNDEN_DB.get(key.name);
          if (raw) {
            const customer = JSON.parse(raw);
            const customerEmail = (customer.email || '').toLowerCase().trim();
            
            // Check if sender or recipient matches customer email
            // (sender matches = incoming; recipient matches = outgoing copy)
            if (customerEmail && (senderEmail === customerEmail || toList.some(t => t.toLowerCase().includes(customerEmail)))) {
              matchedCustomer = customer;
              break;
            }
          }
        }

        if (matchedCustomer) {
          // Determine direction:
          // If the sender is the customer -> incoming.
          // If the sender is NOT the customer (it's us replying) -> outgoing.
          const isCustomerSender = senderEmail === matchedCustomer.email.toLowerCase().trim();
          const direction = isCustomerSender ? 'incoming' : 'outgoing';

          const decodedSubject = decodeRFC2047(subject);
          let bodyPreview = bodyText;

          // Update Customer overall status
          matchedCustomer.lastInteraction = new Date().toISOString();
          matchedCustomer.lastDirection = direction;

          if (direction === 'incoming') {
            const analysis = await analyzeIncomingEmail(env, decodedSubject, bodyText);
            bodyPreview = analysis.summary;

            if (analysis.actionRequired) {
              matchedCustomer.status = 'red';
              matchedCustomer.statusReason = analysis.summary;
            } else {
              // Check draft status before setting to green
              const hasProject = matchedCustomer.linkedCloudflareProject && matchedCustomer.linkedCloudflareProject.trim();
              const hasDomain = matchedCustomer.customDomain && matchedCustomer.customDomain.trim() && !matchedCustomer.customDomain.includes('.workers.dev') && !matchedCustomer.customDomain.includes('.pages.dev');
              if (!hasProject || !hasDomain) {
                matchedCustomer.status = 'red';
                matchedCustomer.statusReason = 'Kunde ist noch ein Entwurf - Keine Domain verbunden';
              } else {
                matchedCustomer.status = 'green';
                matchedCustomer.statusReason = `Info: ${analysis.summary}`;
              }
            }
          } else {
            // Outgoing mail from us -> reset status to GREEN (we answered!)
            // (Unless it was manually overridden to RED)
            if (!matchedCustomer.manualOverride) {
              matchedCustomer.status = 'green';
              matchedCustomer.statusReason = `Beantwortet am ${new Date().toLocaleDateString('de-DE')}`;
            }
          }

          // Load / Initialize email log
          const logKey = `emails:${matchedCustomer.id}`;
          const rawMails = await env.KUNDEN_DB.get(logKey);
          const mailLog = rawMails ? JSON.parse(rawMails) : [];

          const newMail = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            date: new Date().toISOString(),
            direction,
            from: decodeRFC2047(fromRaw),
            subject: decodedSubject,
            body: bodyPreview,
            isResolved: direction !== 'incoming',
          };

          mailLog.unshift(newMail); // newest first
          await env.KUNDEN_DB.put(logKey, JSON.stringify(mailLog));
          await env.KUNDEN_DB.put(`kunde:${matchedCustomer.id}`, JSON.stringify(matchedCustomer));
          
          return new Response(JSON.stringify({ success: true, matched: matchedCustomer.id }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ success: true, matched: null, info: 'Sender/Recipient not matched to any client' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response('Not Found', { status: 404 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }
};

// --- RFC 2047 MIME Decoder ---
function decodeRFC2047(text) {
  if (!text) return '';
  const regex = /=\?([^?]+)\?([QBqb])\?([^?]*)\?=/g;
  return text.replace(regex, (match, charset, encoding, encodedText) => {
    let raw;
    if (encoding.toUpperCase() === 'B') {
      try {
        const bin = atob(encodedText);
        raw = new Uint8Array([...bin].map(c => c.charCodeAt(0)));
      } catch (e) {
        return match;
      }
    } else {
      const hexEncoded = encodedText.replace(/_/g, ' ').replace(/=([0-9A-F]{2})/gi, (m, hex) => '%' + hex);
      try {
        return decodeURIComponent(hexEncoded);
      } catch (e) {
        const bytes = [];
        let i = 0;
        while (i < hexEncoded.length) {
          if (hexEncoded[i] === '%') {
            bytes.push(parseInt(hexEncoded.substr(i + 1, 2), 16));
            i += 3;
          } else {
            bytes.push(hexEncoded.charCodeAt(i));
            i++;
          }
        }
        raw = new Uint8Array(bytes);
      }
    }

    if (raw) {
      try {
        const decoder = new TextDecoder(charset.toLowerCase() === 'utf-8' ? 'utf-8' : 'iso-8859-1');
        return decoder.decode(raw);
      } catch (e) {
        return match;
      }
    }
    return match;
  });
}

// --- Workers AI Inbound Email Sentiment Analyzer ---
async function analyzeIncomingEmail(env, subject, body) {
  try {
    const prompt = `Analysiere diese E-Mail eines Kunden.

E-Mail-Betreff: "${subject}"
E-Mail-Inhalt: "${body}"

Klassifizierungs-Regeln:
1. Wenn der Kunde eine Änderung der Website, Textanpassungen, neue Bilder, Austausch von Bilddateien (z.B. "Bild in der Fußzeile"), neue Links, Google Drive Ordner-Bilder oder sonstige aktive Arbeitsaufträge wünscht (z.B. "möchte gerne ein neues Bild in der Fußzeile eingefügt haben und alle texte neu"), MUSST du "actionRequired" zwingend auf true setzen.
2. Setze "actionRequired" nur dann auf false, wenn die E-Mail ein reiner Gruß ohne jeglichen Arbeitsauftrag ist (z.B. "Schönes Wochenende!", "Danke", "Frohe Ostern", "Schöne Grüße" oder automatische Abwesenheitsnotizen).
3. Sobald irgendein Wunsch, eine Frage, eine Kritik oder eine Bitte um Umsetzung enthalten ist, gilt es als Aktion (actionRequired = true).

Gib das Ergebnis AUSSCHLIESSLICH im folgenden JSON-Format aus, ohne zusätzlichen Text davor oder danach:
{
  "actionRequired": true/false,
  "summary": "Deine kurze Zusammenfassung auf Deutsch (z.B. 'Wünscht neues Fußzeilen-Bild und Text-Update')"
}`;

    console.log('--- AI Email Analysis Input ---');
    console.log('Subject:', subject);
    console.log('Body:', body.substring(0, 100));

    const res = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: [
        { role: 'system', content: 'You are a precise server assistant that outputs strictly valid JSON only.' },
        { role: 'user', content: prompt }
      ]
    });

    console.log('AI Email Analysis Output Raw:', res);

    let resultObj = null;

    if (res.response) {
      if (typeof res.response === 'object') {
        resultObj = res.response;
      } else if (typeof res.response === 'string') {
        const match = res.response.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            resultObj = JSON.parse(match[0]);
          } catch(e) {}
        }
      }
    }

    if (resultObj) {
      console.log('Parsed AI Output (Direct/JSON):', resultObj);
      return {
        actionRequired: resultObj.actionRequired === true || resultObj.actionRequired === 'true',
        summary: resultObj.summary || `Neue Kunden-E-Mail: "${subject}"`
      };
    }

    // Otherwise treat res/text as string and fallback to regex parsing
    const text = typeof res === 'string' ? res : (res.response ? String(res.response) : JSON.stringify(res));
    if (text) {
      // Regex/Keyword Fallback Parsing in case JSON parse fails
      const textLower = text.toLowerCase();
      let actionRequired = true;
      if (
        textLower.includes('actionrequired": false') || 
        textLower.includes('actionrequired: false') || 
        textLower.includes('action required: false') ||
        textLower.includes('actionrequired": "false"') ||
        textLower.includes('actionrequired: "false"')
      ) {
        actionRequired = false;
      }

      // Try to extract summary
      let summary = `Neue Kunden-E-Mail: "${subject}"`;
      const summaryMatch = text.match(/"summary"\s*:\s*"([^"]+)"/) || text.match(/summary\s*:\s*([^\n]+)/i);
      if (summaryMatch) {
        summary = summaryMatch[1].replace(/[*_#]/g, '').trim();
      } else {
        if (!actionRequired) {
          summary = `Höflichkeits-Mail: ${subject}`;
        }
      }

      console.log('Parsed AI Output (Fallback):', { actionRequired, summary });
      return { actionRequired, summary };
    }
  } catch (e) {
    console.error('AI email analysis failed:', e);
  }
  
  return {
    actionRequired: true,
    summary: `Neue Kunden-E-Mail: "${subject}"`
  };
}

// --- IMAP Email Client using Socket API ---
async function fetchImapHeaders(email, password, host, port = 993) {
  const socket = connect(`${host}:${port}`, { secureTransport: 'on' });
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();

  let buffer = '';

  async function readLine() {
    while (!buffer.includes('\n')) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += textDecoder.decode(value, { stream: true });
    }
    const lineIdx = buffer.indexOf('\n');
    if (lineIdx === -1) {
      const line = buffer;
      buffer = '';
      return line;
    }
    const line = buffer.substring(0, lineIdx + 1);
    buffer = buffer.substring(lineIdx + 1);
    return line;
  }

  async function sendCommand(cmd) {
    await writer.write(textEncoder.encode(cmd + '\r\n'));
  }

  try {
    let line = await readLine();
    if (!line.startsWith('* OK')) throw new Error('Invalid IMAP greeting: ' + line);

    await sendCommand(`A1 LOGIN ${email} ${password}`);
    while (true) {
      line = await readLine();
      if (line.startsWith('A1 OK')) break;
      if (line.startsWith('A1 NO') || line.startsWith('A1 BAD')) throw new Error('IMAP Login failed: ' + line);
    }

    // 1. Query directories to find the sent folder (outbox)
    await sendCommand(`A2 LIST "" "*"`);
    const folders = [];
    while (true) {
      line = await readLine();
      if (line.startsWith('A2 OK')) break;
      if (line.startsWith('* LIST')) {
        const match = line.match(/\* LIST \(([^)]*)\)\s+(?:"[^"]+"|\S+)\s+(?:"([^"]+)"|(\S+))/i);
        if (match) {
          const flags = match[1].toLowerCase();
          const folderName = match[2] || match[3];
          folders.push({ name: folderName, flags });
        }
      }
    }

    // Identify sent folder
    let sentFolder = 'Sent';
    const foundSent = folders.find(f => f.flags.includes('\\sent') || f.flags.includes('\\sentitems'));
    if (foundSent) {
      sentFolder = foundSent.name;
    } else {
      const fallbackSent = folders.find(f => {
        const nameLower = f.name.toLowerCase();
        return nameLower.includes('sent') || nameLower.includes('gesendet') || nameLower.includes('outbox');
      });
      if (fallbackSent) {
        sentFolder = fallbackSent.name;
      }
    }

    // Helper function to fetch headers from a specific folder
    async function fetchHeadersFromFolder(folderName, cmdIdPrefix) {
      await sendCommand(`${cmdIdPrefix} SELECT "${folderName}"`);
      let messageCount = 0;
      while (true) {
        line = await readLine();
        if (line.includes('EXISTS')) {
          const match = line.match(/\* (\d+) EXISTS/);
          if (match) messageCount = parseInt(match[1]);
        }
        if (line.startsWith(`${cmdIdPrefix} OK`)) break;
        if (line.startsWith(`${cmdIdPrefix} NO`) || line.startsWith(`${cmdIdPrefix} BAD`)) {
          console.error(`IMAP SELECT for folder ${folderName} failed: ${line}`);
          return [];
        }
      }

      if (messageCount === 0) return [];

      const startMsg = Math.max(1, messageCount - 9);
      await sendCommand(`${cmdIdPrefix}F FETCH ${startMsg}:${messageCount} (INTERNALDATE BODY[HEADER.FIELDS (DATE FROM TO SUBJECT)] BODY[TEXT]<0.500>)`);
      
      const folderEmails = [];
      let currentEmail = null;

      while (true) {
        line = await readLine();
        
        if (line.startsWith('* ') && line.includes('FETCH')) {
          if (currentEmail) {
            folderEmails.push(currentEmail);
          }
          
          const dateMatch = line.match(/INTERNALDATE "([^"]+)"/);
          currentEmail = {
            id: `imap_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            date: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString(),
            from: '',
            to: '',
            subject: '',
            body: '',
            direction: 'incoming'
          };
        }

        if (currentEmail) {
          const lowerLine = line.toLowerCase();
          if (lowerLine.startsWith('from:')) {
            currentEmail.from = decodeRFC2047(line.substring(5).trim());
          } else if (lowerLine.startsWith('to:')) {
            currentEmail.to = decodeRFC2047(line.substring(3).trim());
          } else if (lowerLine.startsWith('subject:')) {
            currentEmail.subject = decodeRFC2047(line.substring(8).trim());
          } else if (
            line.trim() &&
            !line.startsWith('*') &&
            !line.startsWith(')') &&
            !line.startsWith(`${cmdIdPrefix}`) &&
            !lowerLine.startsWith('date:') &&
            !lowerLine.startsWith('body[')
          ) {
            const cleanLine = line.replace(/\r/g, '').trim();
            if (cleanLine) {
              currentEmail.body = ((currentEmail.body || '') + ' ' + cleanLine).trim().substring(0, 500);
            }
          }
        }

        if (line.startsWith(`${cmdIdPrefix}F OK`)) {
          if (currentEmail) folderEmails.push(currentEmail);
          break;
        }
        if (line.startsWith(`${cmdIdPrefix}F NO`) || line.startsWith(`${cmdIdPrefix}F BAD`)) break;
      }
      return folderEmails;
    }

    // Fetch from both INBOX and Sent folders
    const inboxMails = await fetchHeadersFromFolder('INBOX', 'A3');
    const sentMails = await fetchHeadersFromFolder(sentFolder, 'A4');
    
    // Combine and sort by date descending
    const allMails = [...inboxMails, ...sentMails];
    allMails.sort((a, b) => new Date(b.date) - new Date(a.date));

    await sendCommand('A5 LOGOUT');
    await socket.close();

    return allMails;
  } catch (e) {
    await socket.close();
    throw e;
  }
}
