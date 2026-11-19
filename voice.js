export default `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Gustav Voice – Scholz & Friese</title>
    
    <!-- Favicon & App Icons -->
    <link rel="icon" type="image/png" sizes="32x32" href="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="192x192" href="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/gustav-icon-192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/apple-touch-icon.png">
    <link rel="apple-touch-icon" href="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    
    <!-- PWA & Mobile Web App Meta -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Gustav">
    <meta name="theme-color" content="#05070b">
    
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --bg-dark: #05070b;
            --primary: #3b82f6;
            --cyan: #06b6d4;
            --violet: #8b5cf6;
            --card-bg: rgba(15, 20, 32, 0.85);
            --border: rgba(255, 255, 255, 0.08);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            height: 100dvh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        /* Subtle radial ambient background */
        .ambient-radial {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 45%, rgba(37, 99, 235, 0.12) 0%, rgba(5, 7, 11, 0.95) 75%);
            z-index: 0;
            pointer-events: none;
        }

        /* Top Minimal Header */
        header {
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: calc(env(safe-area-inset-top, 16px) + 12px) 24px 12px;
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .header-title h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: -0.3px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
        }

        .header-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border);
            color: var(--text-muted);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
        }
        .header-btn:hover, .header-btn:active {
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.12);
        }

        /* Main Center Stage: Animated Fluid Orb */
        .orb-stage {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 10;
            cursor: pointer;
            user-select: none;
            padding-bottom: 60px;
        }

        .orb-canvas-container {
            position: relative;
            width: 320px;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        canvas#orb-canvas {
            width: 320px;
            height: 320px;
            filter: drop-shadow(0 0 35px rgba(59, 130, 246, 0.35));
            transition: filter 0.3s ease;
        }

        .orb-stage.listening canvas#orb-canvas {
            filter: drop-shadow(0 0 45px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 70px rgba(244, 63, 94, 0.4));
        }

        .orb-stage.speaking canvas#orb-canvas {
            filter: drop-shadow(0 0 50px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.5));
        }

        .orb-center-icon {
            position: absolute;
            font-size: 32px;
            color: rgba(255, 255, 255, 0.95);
            pointer-events: none;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .orb-stage:active .orb-center-icon {
            transform: scale(0.9);
        }

        .status-caption {
            margin-top: 28px;
            font-size: 15px;
            font-weight: 500;
            color: var(--text-muted);
            letter-spacing: -0.2px;
            transition: all 0.25s ease;
            text-align: center;
            padding: 0 20px;
            max-width: 340px;
            line-height: 1.4;
        }

        .status-caption.active {
            color: #ffffff;
            font-weight: 600;
        }

        /* Live transcription preview badge */
        .live-preview-pill {
            margin-top: 14px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            border-radius: 20px;
            font-size: 13px;
            color: #cbd5e1;
            max-width: 85%;
            text-align: center;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateY(6px);
            transition: all 0.25s ease;
            pointer-events: none;
        }
        .live-preview-pill.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Bottom Sheet / Expandable Drawer for Chat & Text */
        .bottom-sheet {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--card-bg);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-top: 1px solid var(--border);
            border-top-left-radius: 28px;
            border-top-right-radius: 28px;
            z-index: 30;
            display: flex;
            flex-direction: column;
            transform: translateY(calc(100% - 68px));
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            max-height: 82dvh;
            box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.6);
        }

        .bottom-sheet.expanded {
            transform: translateY(0);
        }

        .sheet-drag-handle {
            padding: 16px 20px 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;
        }

        .sheet-drag-pill {
            width: 42px;
            height: 4px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 2px;
            margin: 0 auto;
        }

        .sheet-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 8px;
        }

        .sheet-title {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .sheet-toggle-icon {
            font-size: 13px;
            color: var(--text-muted);
            transition: transform 0.3s ease;
        }

        .bottom-sheet.expanded .sheet-toggle-icon {
            transform: rotate(180deg);
        }

        /* Chat transcript list inside sheet */
        .sheet-content {
            flex: 1;
            overflow-y: auto;
            padding: 10px 20px 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 280px;
        }

        .msg-bubble {
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.5;
            max-width: 88%;
            word-wrap: break-word;
        }

        .msg-user {
            align-self: flex-end;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: #ffffff;
            border-bottom-right-radius: 4px;
        }

        .msg-gustav {
            align-self: flex-start;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            color: var(--text-main);
            border-bottom-left-radius: 4px;
        }

        .msg-gustav strong {
            color: #60a5fa;
        }

        /* Text Input Bar inside Sheet */
        .sheet-input-bar {
            padding: 12px 18px calc(env(safe-area-inset-bottom, 16px) + 12px);
            border-top: 1px solid var(--border);
            display: flex;
            gap: 10px;
            background: rgba(10, 14, 22, 0.95);
        }

        .sheet-input-bar input {
            flex: 1;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 12px 16px;
            color: var(--text-main);
            font-size: 14px;
            outline: none;
        }
        .sheet-input-bar input:focus {
            border-color: var(--primary);
        }

        .sheet-send-btn {
            background: var(--primary);
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 14px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="ambient-radial"></div>

    <!-- Minimal Header -->
    <header>
        <div class="header-title">
            <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/gustav-avatar.webp" alt="Gustav" style="width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--cyan); object-fit: cover; box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);">
            <div style="display: flex; flex-direction: column;">
                <div style="display: flex; align-items: center; gap: 6px;">
                    <div class="status-dot"></div>
                    <h1>Gustav Voice</h1>
                </div>
                <span style="font-size: 10px; color: #10b981; font-weight: 500; line-height: 1.2;">🟢 Antigravity Live</span>
            </div>
        </div>
        <div style="display: flex; gap: 8px;">
            <button class="header-btn" id="voice-mute-btn" onclick="toggleMute()" title="Sprachausgabe stumm">
                <i class="fa-solid fa-volume-high" id="mute-icon"></i>
            </button>
            <a href="/" class="header-btn" title="Dashboard">
                <i class="fa-solid fa-grid-2"></i>
            </a>
        </div>
    </header>

    <!-- Main Center Stage: Animated Organic Voice Orb -->
    <div class="orb-stage" id="orb-trigger" onclick="handleOrbClick()">
        <div class="orb-canvas-container">
            <canvas id="orb-canvas" width="640" height="640"></canvas>
            <i class="fa-solid fa-microphone orb-center-icon" id="orb-icon"></i>
        </div>
        
        <div class="status-caption" id="status-caption">Tippe auf den Orb, um zu sprechen</div>
        <div class="live-preview-pill" id="live-preview">...</div>
    </div>

    <!-- Expandable Bottom Drawer for Transcript & Keyboard Input -->
    <div class="bottom-sheet" id="bottom-sheet">
        <div class="sheet-drag-handle" onclick="toggleSheet()">
            <div style="width: 100%;">
                <div class="sheet-drag-pill"></div>
                <div class="sheet-title-row">
                    <span class="sheet-title"><i class="fa-solid fa-message-lines"></i> Transkript & Chat</span>
                    <i class="fa-solid fa-chevron-up sheet-toggle-icon"></i>
                </div>
            </div>
        </div>

        <div class="sheet-content" id="sheet-messages">
            <div class="msg-bubble msg-gustav" id="welcome-bubble">
                Moin! Ich bin bereit. Woran arbeiten wir heute?
            </div>
        </div>

        <div class="sheet-input-bar">
            <input type="text" id="keyboard-input" placeholder="Oder tippe eine Nachricht..." onkeydown="handleKey(event)">
            <button class="sheet-send-btn" onclick="sendKeyboardMessage()">
                <i class="fa-solid fa-arrow-up"></i>
            </button>
        </div>
    </div>

    <script>
        // State
        let state = 'idle'; // 'idle' | 'listening' | 'thinking' | 'speaking'
        let voiceOutput = true;
        let sheetExpanded = false;
        let recognition = null;
        let isManualRecording = false;
        let accumulatedTranscript = '';
        let currentSessionTranscript = '';
        let synth = window.speechSynthesis;

        const orbStage = document.getElementById('orb-trigger');
        const orbIcon = document.getElementById('orb-icon');
        const statusCaption = document.getElementById('status-caption');
        const livePreview = document.getElementById('live-preview');
        const bottomSheet = document.getElementById('bottom-sheet');
        const sheetMessages = document.getElementById('sheet-messages');

        // --- ANIMATED FLUID 3D ORB (Canvas 60fps) ---
        const canvas = document.getElementById('orb-canvas');
        const ctx = canvas.getContext('2d');
        let time = 0;

        function renderOrb() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Orb Parameters based on state
            let baseRadius = 180;
            let speed = 0.012;
            let roughness = 10;
            let colorStops = [
                { offset: 0, color: '#2563eb' },    // Rich Royal Blue
                { offset: 0.5, color: '#4f46e5' },  // Deep Indigo
                { offset: 1, color: '#7c3aed' }     // Elegant Violet
            ];

            if (state === 'listening') {
                baseRadius = 188;
                speed = 0.016; // Calm, velvety motion while recording
                roughness = 14; // Soft organic waves instead of wild spikes
                colorStops = [
                    { offset: 0, color: '#dc2626' },   // Coral Red
                    { offset: 0.5, color: '#e11d48' }, // Rose
                    { offset: 1, color: '#ea580c' }    // Warm Orange
                ];
            } else if (state === 'thinking') {
                baseRadius = 175;
                speed = 0.022;
                roughness = 12;
                colorStops = [
                    { offset: 0, color: '#7c3aed' },  // Purple
                    { offset: 0.5, color: '#6366f1' }, // Indigo
                    { offset: 1, color: '#2563eb' }   // Blue
                ];
            } else if (state === 'speaking') {
                baseRadius = 185 + Math.sin(time * 2) * 8;
                speed = 0.018;
                roughness = 14;
                colorStops = [
                    { offset: 0, color: '#0284c7' },   // Sky Blue
                    { offset: 0.5, color: '#2563eb' }, // Royal Blue
                    { offset: 1, color: '#0d9488' }    // Teal
                ];
            }

            time += speed;

            // Draw multi-layered undulating fluid blob
            ctx.save();
            ctx.beginPath();
            const points = 120;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const wave1 = Math.sin(angle * 4 + time) * roughness;
                const wave2 = Math.cos(angle * 6 - time * 1.5) * (roughness * 0.6);
                const wave3 = Math.sin(angle * 2 + time * 0.8) * (roughness * 0.4);
                const r = baseRadius + wave1 + wave2 + wave3;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Seamless diagonal linear gradient across the organic fluid shape (NO inner circular rings or bullseye spots!)
            const grad = ctx.createLinearGradient(
                cx - baseRadius * 0.8,
                cy - baseRadius * 0.8,
                cx + baseRadius * 0.8,
                cy + baseRadius * 0.8
            );
            colorStops.forEach(cs => grad.addColorStop(cs.offset, cs.color));
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.restore();

            requestAnimationFrame(renderOrb);
        }
        renderOrb();

        // --- SPEECH RECOGNITION SETUP ---
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.lang = 'de-DE';
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onstart = () => {
                setState('listening');
                statusCaption.textContent = 'Ich höre zu... Tippe zum Absenden';
                livePreview.classList.add('visible');
            };

            recognition.onresult = (event) => {
                let interim = '';
                let finalized = '';
                for (let i = 0; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalized += event.results[i][0].transcript + ' ';
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }
                currentSessionTranscript = (finalized + interim).trim();
                const fullText = (accumulatedTranscript + ' ' + currentSessionTranscript).trim();
                livePreview.textContent = fullText || '...';
            };

            recognition.onerror = (e) => {
                console.warn('Recognition error:', e.error);
                if (e.error === 'no-speech') {
                    return;
                }
                if (e.error !== 'aborted') {
                    isManualRecording = false;
                    setState('idle');
                    statusCaption.textContent = 'Tippe auf den Orb, um zu sprechen';
                    livePreview.classList.remove('visible');
                }
            };

            recognition.onend = () => {
                if (isManualRecording) {
                    // Browser stopped due to pause/silence, but user has not clicked stop yet:
                    // Preserve accumulated transcript and auto-restart so pauses don't cut off recording
                    accumulatedTranscript = (accumulatedTranscript + ' ' + currentSessionTranscript).trim();
                    currentSessionTranscript = '';
                    try {
                        recognition.start();
                    } catch(e) {
                        setTimeout(() => {
                            if (isManualRecording) {
                                try { recognition.start(); } catch(err) {}
                            }
                        }, 100);
                    }
                } else {
                    if (state === 'listening') {
                        setState('idle');
                        statusCaption.textContent = 'Tippe auf den Orb, um zu sprechen';
                        livePreview.classList.remove('visible');
                    }
                }
            };
        }

        const SILENT_WAV = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        const ttsPlayer = new Audio();
        ttsPlayer.preload = 'auto';
        let audioUnlocked = false;
        let speakWatchdog = null;
        let speakStartTimer = null;
        window._activeUtterance = null;

        if (synth && typeof synth.onvoiceschanged !== 'undefined') {
            synth.onvoiceschanged = () => { synth.getVoices(); };
        }

        function unlockAudio() {
            if ('speechSynthesis' in window && synth) {
                try {
                    if (synth.paused) synth.resume();
                    const u = new SpeechSynthesisUtterance('');
                    u.volume = 0;
                    u.lang = 'de-DE';
                    synth.speak(u);
                } catch(e) {}
            }
            if (!audioUnlocked && ttsPlayer) {
                try {
                    ttsPlayer.src = SILENT_WAV;
                    ttsPlayer.volume = 0.01;
                    const p = ttsPlayer.play();
                    if (p && typeof p.then === 'function') {
                        p.then(() => {
                            ttsPlayer.pause();
                            ttsPlayer.currentTime = 0;
                            ttsPlayer.volume = 1.0;
                            audioUnlocked = true;
                        }).catch(() => {});
                    }
                } catch(e) {}
            }
        }

        function stopAllSpeech() {
            if (speakWatchdog) { clearTimeout(speakWatchdog); speakWatchdog = null; }
            if (speakStartTimer) { clearTimeout(speakStartTimer); speakStartTimer = null; }
            if (synth) {
                try { synth.cancel(); } catch(e) {}
            }
            if (ttsPlayer) {
                try {
                    ttsPlayer.pause();
                    ttsPlayer.currentTime = 0;
                } catch(e) {}
            }
        }

        function handleOrbClick() {
            unlockAudio();

            if (state === 'speaking') {
                stopAllSpeech();
                setState('idle');
                statusCaption.textContent = 'Tippe auf den Orb, um zu sprechen';
                return;
            }

            if (state === 'listening' || isManualRecording) {
                // User clicked stop to submit recording
                isManualRecording = false;
                if (recognition) {
                    try { recognition.stop(); } catch(e) {}
                }

                const fullText = (accumulatedTranscript + ' ' + currentSessionTranscript).trim();
                accumulatedTranscript = '';
                currentSessionTranscript = '';

                if (fullText) {
                    processUserInput(fullText);
                } else {
                    setState('idle');
                    statusCaption.textContent = 'Tippe auf den Orb, um zu sprechen';
                    livePreview.classList.remove('visible');
                }
                return;
            }

            if (!recognition) {
                alert('Spracherkennung wird auf diesem Gerät nicht unterstützt. Bitte nutze das Textfeld unten.');
                toggleSheet();
                return;
            }

            // Start manual recording
            stopAllSpeech();
            isManualRecording = true;
            accumulatedTranscript = '';
            currentSessionTranscript = '';
            livePreview.textContent = '...';
            livePreview.classList.add('visible');
            statusCaption.textContent = 'Ich höre zu... Tippe zum Absenden';

            try {
                recognition.start();
            } catch(e) {
                try {
                    recognition.stop();
                    setTimeout(() => {
                        if (isManualRecording) recognition.start();
                    }, 100);
                } catch(err) {}
            }
        }

        function setState(newState) {
            state = newState;
            orbStage.className = 'orb-stage ' + newState;

            if (newState === 'listening') {
                orbIcon.className = 'fa-solid fa-stop orb-center-icon';
                statusCaption.textContent = 'Ich höre zu... Tippe zum Absenden';
            } else if (newState === 'thinking') {
                orbIcon.className = 'fa-solid fa-spinner fa-spin orb-center-icon';
                statusCaption.textContent = 'Gustav denkt nach...';
            } else if (newState === 'speaking') {
                orbIcon.className = 'fa-solid fa-volume-high orb-center-icon';
                statusCaption.textContent = 'Gustav spricht... (Tippe zum Stoppen)';
            } else {
                orbIcon.className = 'fa-solid fa-microphone orb-center-icon';
                statusCaption.textContent = 'Tippe auf den Orb, um zu sprechen';
            }
        }

        async function processUserInput(text) {
            livePreview.classList.remove('visible');
            setState('thinking');
            appendMsg(text, 'user');

            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text, user: 'Adrian' })
                });

                const data = await res.json();
                let reply = data.response;

                // If response is pending (waiting for server bridge), poll status up to 110s
                if (!reply && data.id) {
                    let attempts = 0;
                    while (attempts < 110) {
                        await new Promise(r => setTimeout(r, 1000));
                        attempts++;
                        try {
                            const pollRes = await fetch('/api/chat/status?id=' + encodeURIComponent(data.id));
                            if (pollRes.ok) {
                                const pollData = await pollRes.json();
                                if (pollData.status === 'completed' && pollData.response) {
                                    reply = pollData.response;
                                    break;
                                }
                                if (pollData.progress) {
                                    statusCaption.textContent = pollData.progress;
                                }
                            }
                        } catch(e) {}
                    }
                }

                if (!reply) {
                    reply = 'Ich habe deine Nachricht erhalten und verarbeite sie auf dem Server.';
                }

                // 1. Immediately clear thinking state & spinning wheel BEFORE audio starts
                setState('idle');
                appendMsg(reply, 'gustav');

                // 2. Wait 250ms so smartphone releases microphone session and routes to loudspeaker
                setTimeout(() => {
                    speakAnswer(reply, false);
                }, 250);
            } catch(err) {
                setState('idle');
                statusCaption.textContent = 'Verbindungsfehler';
                appendMsg('Entschuldige, ich konnte gerade keine Antwort abrufen.', 'gustav');
            }
        }

        function getGermanMaleVoice() {
            if (!synth) return null;
            const voices = synth.getVoices();
            const deVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('de'));
            
            // 1. Explicit male voice names (iOS, Windows, Android)
            const maleIdentifiers = ['yannick', 'stefan', 'florian', 'markus', 'viktor', 'martin', 'conrad', 'killian', 'klaus', 'male', 'männlich', 'de-de-x-deg', 'de-de-x-deb'];
            let found = deVoices.find(v => maleIdentifiers.some(m => v.name.toLowerCase().includes(m)));
            if (found) return found;

            // 2. Reject explicit female voice names
            const femaleIdentifiers = ['anna', 'petra', 'katja', 'amira', 'marlene', 'hedda', 'gudrun', 'zira', 'helena', 'female', 'weiblich'];
            found = deVoices.find(v => !femaleIdentifiers.some(f => v.name.toLowerCase().includes(f)));
            if (found) return found;

            // 3. Fallback
            return deVoices[0] || null;
        }

        function cleanTextForSpeech(text, summarizeLong) {
            let clean = String(text || '').split('\x60\x60\x60')[0]
                .replace(/\\*\\*(.*?)\\*\\*/g, '$1')
                .replace(/\\*(.*?)\\*/g, '$1')
                .replace(/#{1,6}\\s+/g, '')
                .replace(/\\[([^\\]]+)\\]\\([^)]+\\)/g, '$1')
                .replace(/\\x60([^\\x60]+)\\x60/g, '$1')
                .replace(/^\\s*[-*•]\\s+/gm, '')
                .replace(/---+/g, '')
                .replace(/[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}]/gu, '')
                .replace(/\\s+/g, ' ')
                .trim();

            if (summarizeLong && clean.length > 360) {
                let cut = clean.slice(0, 340);
                const lastDot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
                if (lastDot > 120) {
                    cut = cut.slice(0, lastDot + 1);
                }
                clean = cut + ' Die vollständige Übersicht findest du im Chat.';
            }
            return clean;
        }

        function playServerTts(cleanText) {
            if (!voiceOutput || !cleanText) {
                setState('idle');
                return;
            }
            try {
                ttsPlayer.volume = 1.0;
                ttsPlayer.src = '/api/tts?text=' + encodeURIComponent(cleanText);
                ttsPlayer.onplay = () => {
                    setState('speaking');
                };
                ttsPlayer.onended = () => {
                    if (speakWatchdog) { clearTimeout(speakWatchdog); speakWatchdog = null; }
                    setState('idle');
                };
                ttsPlayer.onerror = () => {
                    if (speakWatchdog) { clearTimeout(speakWatchdog); speakWatchdog = null; }
                    setState('idle');
                };
                const playPromise = ttsPlayer.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {
                        if (speakWatchdog) { clearTimeout(speakWatchdog); speakWatchdog = null; }
                        setState('idle');
                    });
                }
            } catch(e) {
                setState('idle');
            }
        }

        function speakAnswer(text, fullLength) {
            stopAllSpeech();

            if (!voiceOutput) {
                setState('idle');
                return;
            }

            const clean = cleanTextForSpeech(text, !fullLength);
            if (!clean) {
                setState('idle');
                return;
            }

            // Hard safety watchdog so UI never gets stuck
            const maxDurationMs = Math.min(45000, Math.max(10000, clean.length * 110));
            speakWatchdog = setTimeout(() => {
                stopAllSpeech();
                setState('idle');
            }, maxDurationMs);

            if (!('speechSynthesis' in window) || !synth) {
                playServerTts(clean);
                return;
            }

            try {
                if (synth.paused) synth.resume();
                const utterance = new SpeechSynthesisUtterance(clean);
                window._activeUtterance = utterance;
                utterance.lang = 'de-DE';
                utterance.pitch = 0.85;
                utterance.rate = 1.03;

                const maleVoice = getGermanMaleVoice();
                if (maleVoice) utterance.voice = maleVoice;

                let started = false;
                let fallbackTriggered = false;

                // If mobile browser blocks speechSynthesis after long async wait (>900ms without onstart),
                // automatically switch to unlocked HTML5 <audio> stream (/api/tts)
                speakStartTimer = setTimeout(() => {
                    if (!started && !fallbackTriggered) {
                        fallbackTriggered = true;
                        try { synth.cancel(); } catch(e) {}
                        playServerTts(clean);
                    }
                }, 900);

                utterance.onstart = () => {
                    started = true;
                    if (speakStartTimer) { clearTimeout(speakStartTimer); speakStartTimer = null; }
                    setState('speaking');
                };

                utterance.onend = () => {
                    if (fallbackTriggered) return;
                    if (speakStartTimer) { clearTimeout(speakStartTimer); speakStartTimer = null; }
                    if (speakWatchdog) { clearTimeout(speakWatchdog); speakWatchdog = null; }
                    setState('idle');
                };

                utterance.onerror = () => {
                    if (fallbackTriggered) return;
                    if (speakStartTimer) { clearTimeout(speakStartTimer); speakStartTimer = null; }
                    if (!started) {
                        fallbackTriggered = true;
                        playServerTts(clean);
                    } else {
                        if (speakWatchdog) { clearTimeout(speakWatchdog); speakWatchdog = null; }
                        setState('idle');
                    }
                };

                synth.speak(utterance);
            } catch(e) {
                playServerTts(clean);
            }
        }

        function toggleMute() {
            unlockAudio();
            voiceOutput = !voiceOutput;
            const icon = document.getElementById('mute-icon');
            if (voiceOutput) {
                icon.className = 'fa-solid fa-volume-high';
            } else {
                icon.className = 'fa-solid fa-volume-xmark';
                stopAllSpeech();
                if (state === 'speaking') setState('idle');
            }
        }

        let historyLoaded = false;
        async function loadHistory() {
            try {
                const res = await fetch('/api/chat/history?limit=10');
                if (res.ok) {
                    const data = await res.json();
                    if (data.history && Array.isArray(data.history) && data.history.length > 0) {
                        sheetMessages.innerHTML = '';
                        data.history.forEach(item => {
                            appendMsg(item.text, item.role === 'gustav' ? 'gustav' : 'user');
                        });
                    }
                    historyLoaded = true;
                }
            } catch(e) {}
        }

        function toggleSheet() {
            sheetExpanded = !sheetExpanded;
            if (sheetExpanded) {
                bottomSheet.classList.add('expanded');
                loadHistory();
            } else {
                bottomSheet.classList.remove('expanded');
            }
        }

        function appendMsg(text, sender) {
            const bubble = document.createElement('div');
            bubble.className = \`msg-bubble msg-\${sender}\`;
            let formatted = String(text || '')
                .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                .replace(/\\n/g, '<br>');
            bubble.innerHTML = formatted;

            if (sender === 'gustav') {
                const actionRow = document.createElement('div');
                actionRow.style.cssText = 'margin-top: 8px; display: flex; justify-content: flex-end;';
                const speakBtn = document.createElement('button');
                speakBtn.type = 'button';
                speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Vorlesen';
                speakBtn.style.cssText = 'background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: #94a3b8; font-size: 11px; padding: 3px 9px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;';
                speakBtn.onclick = (e) => {
                    e.stopPropagation();
                    unlockAudio();
                    speakAnswer(text, true);
                };
                actionRow.appendChild(speakBtn);
                bubble.appendChild(actionRow);
            }

            sheetMessages.appendChild(bubble);
            sheetMessages.scrollTop = sheetMessages.scrollHeight;
        }

        function sendKeyboardMessage() {
            unlockAudio();
            const input = document.getElementById('keyboard-input');
            const val = input.value.trim();
            if (!val) return;
            input.value = '';
            processUserInput(val);
        }

        function handleKey(e) {
            if (e.key === 'Enter') sendKeyboardMessage();
        }
    </script>
</body>
</html>
`;
