export default `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gustav - Scholz & Friese Jarvis</title>
    <!-- FontAwesome & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        :root {
            --bg-main: #080b13;
            --bg-sidebar: #0d1220;
            --bg-card: rgba(17, 24, 39, 0.7);
            --bg-card-hover: rgba(26, 35, 54, 0.85);
            --border-color: rgba(255, 255, 255, 0.08);
            --border-hover: rgba(59, 130, 246, 0.4);
            
            --text-primary: #f3f4f6;
            --text-secondary: #9ca3af;
            --text-muted: #6b7280;

            --color-primary: #3b82f6;
            --color-primary-glow: rgba(59, 130, 246, 0.15);
            --color-cyan: #06b6d4;
            --color-green: #10b981;
            --color-green-glow: rgba(16, 185, 129, 0.15);
            --color-red: #ef4444;
            --color-red-glow: rgba(239, 68, 68, 0.15);
            
            --font-sans: 'Plus Jakarta Sans', sans-serif;
            --font-heading: 'Outfit', sans-serif;
            --transition-smooth: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        body {
            font-family: var(--font-sans);
            background-color: var(--bg-main);
            color: var(--text-primary);
            margin: 0;
            padding: 0;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* --- SIDEBAR --- */
        .sidebar {
            width: 320px;
            background-color: var(--bg-sidebar);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }

        .sidebar-header {
            padding: 24px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            font-family: var(--font-heading);
            font-weight: 800;
            font-size: 22px;
            background: linear-gradient(135deg, var(--text-primary) 30%, var(--color-primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .logo i {
            color: var(--color-primary);
            -webkit-text-fill-color: initial;
        }

        .btn-add-client {
            background: var(--color-primary-glow);
            border: 1px solid var(--color-primary);
            color: var(--text-primary);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition-smooth);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .btn-add-client:hover {
            background: var(--color-primary);
            box-shadow: 0 0 12px var(--color-primary-glow);
        }

        .search-container {
            padding: 16px 20px;
            position: relative;
        }

        .search-container i {
            position: absolute;
            left: 32px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
        }

        .search-input {
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 10px 10px 10px 36px;
            color: var(--text-primary);
            font-size: 14px;
            box-sizing: border-box;
            outline: none;
            transition: var(--transition-smooth);
        }

        .search-input:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px var(--color-primary-glow);
        }

        .client-list {
            flex-grow: 1;
            overflow-y: auto;
            padding: 0 12px 20px;
        }

        .client-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            border-radius: 10px;
            margin-bottom: 8px;
            cursor: pointer;
            border: 1px solid transparent;
            transition: var(--transition-smooth);
        }

        .client-item:hover {
            background: var(--bg-card);
            border-color: var(--border-color);
        }

        .client-item.active {
            background: var(--color-primary-glow);
            border-color: rgba(59, 130, 246, 0.3);
        }

        .client-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .client-name {
            font-weight: 600;
            font-size: 15px;
        }

        .client-sub {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            flex-shrink: 0;
            position: relative;
        }

        .status-dot.green {
            background-color: var(--color-green);
            box-shadow: 0 0 8px var(--color-green);
        }

        .status-dot.orange {
            background-color: #f59e0b;
            box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }

        .status-dot.red {
            background-color: var(--color-red);
            box-shadow: 0 0 8px var(--color-red);
            animation: pulse-red 2s infinite;
        }

        @keyframes pulse-red {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* --- MAIN PANEL --- */
        .main-panel {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            background: radial-gradient(circle at 10% 20%, rgba(17, 24, 39, 0.4) 0%, transparent 80%);
            overflow: hidden;
        }

        /* Welcome Screen */
        .welcome-screen {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px;
        }

        .welcome-screen h1 {
            font-family: var(--font-heading);
            font-weight: 700;
            margin: 0 0 12px;
            font-size: 32px;
        }

        .welcome-screen p {
            color: var(--text-secondary);
            max-width: 500px;
            line-height: 1.6;
            margin: 0;
        }

        /* --- NAVIGATION --- */
        .sidebar-nav {
            padding: 12px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .nav-item {
            background: none;
            border: 1px solid transparent;
            color: var(--text-secondary);
            text-align: left;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 13.5px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            transition: var(--transition-smooth);
            box-sizing: border-box;
        }

        .nav-item:hover {
            background: rgba(255, 255, 255, 0.04);
            color: var(--text-primary);
        }

        .nav-item.active {
            background: rgba(59, 130, 246, 0.08);
            border-color: rgba(59, 130, 246, 0.15);
            color: var(--color-primary);
        }

        /* --- DOMAIN DATA TABLE --- */
        .domain-table-row:hover {
            background: rgba(255, 255, 255, 0.015);
        }

        /* Client Details Active */
        .client-header {
            padding: 24px 40px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(13, 18, 32, 0.5);
            backdrop-filter: blur(10px);
        }

        .client-title-area {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .client-title {
            font-family: var(--font-heading);
            font-size: 26px;
            font-weight: 700;
            margin: 0;
        }

        .status-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
        }

        .status-pill.green {
            background: var(--color-green-glow);
            color: var(--color-green);
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-pill.red {
            background: var(--color-red-glow);
            color: var(--color-red);
            border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: var(--transition-smooth);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--text-secondary);
        }

        .btn-primary {
            background: var(--color-primary);
            border-color: var(--color-primary);
        }

        .btn-primary:hover {
            background: #2563eb;
            border-color: #2563eb;
            box-shadow: 0 0 10px var(--color-primary-glow);
        }

        .btn-danger {
            background: var(--color-red-glow);
            border-color: var(--color-red);
            color: var(--color-red);
        }

        .btn-danger:hover {
            background: var(--color-red);
            color: var(--text-primary);
        }

        .client-content {
            flex-grow: 1;
            padding: 30px 40px;
            overflow-y: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            box-sizing: border-box;
        }

        /* --- CARDS --- */
        .card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 24px;
            backdrop-filter: blur(10px);
            transition: var(--transition-smooth);
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .card:hover {
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .card-title {
            font-family: var(--font-heading);
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text-primary);
        }

        .card-title i {
            color: var(--color-primary);
        }

        /* Cloudflare Live Card */
        .cloudflare-status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .cf-badge {
            background: rgba(243, 128, 32, 0.15);
            color: #f38020;
            border: 1px solid rgba(243, 128, 32, 0.3);
            font-size: 11px;
            font-weight: bold;
            padding: 3px 6px;
            border-radius: 4px;
            text-transform: uppercase;
        }

        /* Notes Card */
        .notes-textarea {
            width: 100%;
            height: 100px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            padding: 12px;
            font-family: inherit;
            box-sizing: border-box;
            resize: none;
            outline: none;
            transition: var(--transition-smooth);
        }

        .notes-textarea:focus {
            border-color: var(--color-primary);
        }

        /* Contracts (R2) Uploader */
        .uploader-zone {
            border: 2px dashed var(--border-color);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            background: rgba(0,0,0,0.1);
            transition: var(--transition-smooth);
        }

        .uploader-zone:hover, .uploader-zone.dragover {
            border-color: var(--color-primary);
            background: rgba(59, 130, 246, 0.05);
        }

        .uploader-zone i {
            font-size: 32px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }

        .file-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .file-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: rgba(0,0,0,0.15);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
        }

        .file-item a {
            color: var(--text-primary);
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .file-item a:hover {
            color: var(--color-primary);
            text-decoration: underline;
        }

        /* Google Drive List */
        .drive-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-height: 150px;
            overflow-y: auto;
        }

        .drive-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            background: rgba(15, 157, 88, 0.05);
            border: 1px solid rgba(15, 157, 88, 0.15);
            border-radius: 8px;
            font-size: 13px;
        }

        .drive-item a {
            color: #0f9d58;
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .drive-item a:hover {
            text-decoration: underline;
        }

        /* E-Mail Timeline */
        .email-card {
            grid-column: span 2;
        }

        .email-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: 300px;
            overflow-y: auto;
            padding-right: 8px;
        }

        .email-item {
            padding: 16px;
            border-radius: 12px;
            border-left: 4px solid var(--border-color);
            background: rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .email-item.incoming {
            border-left-color: rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.02);
        }

        .email-item.incoming.unresolved-email {
            border-left-color: var(--color-red);
            background: rgba(239, 68, 68, 0.04);
        }

        .email-item.outgoing {
            border-left-color: var(--color-green);
            background: rgba(16, 185, 129, 0.02);
        }

        .email-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-secondary);
        }

        .email-meta-left {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
        }

        .email-meta-left i {
            font-size: 14px;
        }

        .email-item.incoming .email-meta-left i { color: var(--color-red); }
        .email-item.outgoing .email-meta-left i { color: var(--color-green); }

        .email-subject {
            font-weight: 600;
            font-size: 14px;
            color: var(--text-primary);
        }

        .email-body {
            font-size: 13px;
            color: var(--text-secondary);
            line-height: 1.5;
            white-space: pre-wrap;
        }

        .email-attachment-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 11px;
            color: #fff;
            text-decoration: none;
            transition: background 0.2s;
        }

        .email-attachment-link:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* --- GUSTAV CHAT PANEL --- */
        .chat-panel {
            width: 380px;
            background-color: var(--bg-sidebar);
            border-left: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            position: relative;
            transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s;
        }

        @media (min-width: 993px) {
            .chat-panel.collapsed {
                width: 0px !important;
                border-left: none !important;
            }
            .chat-panel.collapsed .chat-header,
            .chat-panel.collapsed .chat-history,
            .chat-panel.collapsed .chat-suggested,
            .chat-panel.collapsed .chat-input-container {
                display: none !important;
            }
        }

        .chat-toggle-handle {
            position: absolute;
            left: -28px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 56px;
            background-color: var(--bg-sidebar);
            border: 1px solid var(--border-color);
            border-right: none;
            border-radius: 8px 0 0 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--text-secondary);
            z-index: 100;
            transition: var(--transition-smooth);
            box-shadow: -4px 2px 10px rgba(0, 0, 0, 0.3);
        }

        .chat-toggle-handle:hover {
            color: var(--text-primary);
            background-color: rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 992px) {
            .chat-toggle-handle {
                display: none !important;
            }
        }

        .chat-header {
            padding: 24px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .chat-title {
            font-family: var(--font-heading);
            font-weight: 700;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .chat-title i {
            color: var(--color-cyan);
            animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
            0% { text-shadow: 0 0 0px var(--color-cyan); }
            50% { text-shadow: 0 0 8px var(--color-cyan); }
            100% { text-shadow: 0 0 0px var(--color-cyan); }
        }

        .chat-history {
            flex-grow: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .chat-bubble {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 14px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }

        .chat-bubble.user {
            background-color: var(--color-primary);
            color: var(--text-primary);
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }

        .chat-bubble.gustav {
            background-color: rgba(255, 255, 255, 0.05);
            color: var(--text-primary);
            align-self: flex-start;
            border-bottom-left-radius: 2px;
            border: 1px solid var(--border-color);
        }

        .chat-suggested {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 10px 20px;
            border-top: 1px solid var(--border-color);
            background: rgba(0,0,0,0.1);
        }

        .suggested-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            font-size: 11px;
            padding: 6px 10px;
            border-radius: 12px;
            cursor: pointer;
            transition: var(--transition-smooth);
        }

        .suggested-btn:hover {
            color: var(--text-primary);
            border-color: var(--color-cyan);
            background: rgba(6, 182, 212, 0.05);
        }

        .chat-input-container {
            padding: 16px 20px;
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 10px;
        }

        .chat-input {
            flex-grow: 1;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 10px 14px;
            color: var(--text-primary);
            font-size: 14px;
            outline: none;
            transition: var(--transition-smooth);
        }

        .chat-input:focus {
            border-color: var(--color-cyan);
        }

        .btn-send {
            background: var(--color-cyan);
            color: #000;
            border: none;
            width: 38px;
            height: 38px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: var(--transition-smooth);
            flex-shrink: 0;
        }

        .btn-send:hover {
            opacity: 0.9;
            transform: scale(1.05);
        }

        /* --- MODAL --- */
        .modal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: #111827;
            border: 1px solid var(--border-color);
            padding: 30px;
            border-radius: 16px;
            width: 500px;
            max-width: 90%;
            display: flex;
            flex-direction: column;
            gap: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .modal-title {
            font-family: var(--font-heading);
            font-size: 20px;
            font-weight: 700;
            margin: 0;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group label {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-secondary);
        }

        .form-group input, .form-group textarea {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 10px 12px;
            color: var(--text-primary);
            font-family: inherit;
            outline: none;
            transition: var(--transition-smooth);
        }

        .form-group input:focus, .form-group textarea:focus {
            border-color: var(--color-primary);
        }

        .recipient-suggestion-item {
            padding: 10px 14px;
            cursor: pointer;
            color: var(--text-primary);
            font-size: 13.5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            transition: var(--transition-smooth);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .recipient-suggestion-item:last-child {
            border-bottom: none;
        }
        .recipient-suggestion-item:hover {
            background: rgba(6, 182, 212, 0.1);
            color: var(--color-cyan);
        }

        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 10px;
        }

        @keyframes pulse-red {
            0% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
                border-color: rgba(239, 68, 68, 0.8);
            }
            50% {
                box-shadow: 0 0 20px 10px rgba(239, 68, 68, 0.2);
                border-color: rgba(239, 68, 68, 1);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
                border-color: rgba(239, 68, 68, 0.8);
            }
        }

        /* --- MOBILE & RESPONSIVE DESIGN (PRO MAX) --- */
        .mobile-header {
            display: none;
            height: 56px;
            background-color: var(--bg-sidebar);
            border-bottom: 1px solid var(--border-color);
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 900;
        }

        .mobile-toggle-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            width: 38px;
            height: 38px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
        }

        .mobile-bottom-nav {
            display: none;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            height: 60px;
            background: #0d1220;
            border-top: 1px solid var(--border-color);
            z-index: 900;
            align-items: center;
            justify-content: space-around;
            backdrop-filter: blur(10px);
        }

        .mobile-nav-item {
            background: none;
            border: none;
            color: var(--text-secondary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            font-size: 10px;
            font-weight: 600;
            cursor: pointer;
            padding: 6px 10px;
            border-radius: 8px;
            transition: var(--transition-smooth);
        }

        .mobile-nav-item i {
            font-size: 16px;
        }

        .mobile-nav-item.active {
            color: var(--color-primary);
            background: rgba(59, 130, 246, 0.1);
        }

        .mobile-backdrop {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 940;
        }

        .fin-header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto 24px auto;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 20px;
            box-sizing: border-box;
            padding-left: 20px;
            padding-right: 20px;
        }
        .fin-header-actions {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .fin-container-wrapper {
            padding-left: 20px;
            padding-right: 20px;
        }

        .mobile-backdrop.active {
            display: block;
        }

        @media (max-width: 992px) {
            .fin-header-container {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 16px !important;
                padding-bottom: 14px !important;
                padding-left: 14px !important;
                padding-right: 14px !important;
            }
            .fin-header-actions {
                flex-wrap: wrap !important;
                width: 100% !important;
                gap: 8px !important;
            }
            .fin-header-actions button {
                flex-grow: 1 !important;
                font-size: 11px !important;
                padding: 8px 10px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            .fin-container-wrapper {
                padding-left: 14px !important;
                padding-right: 14px !important;
            }

            .fin-kpis-grid {
                grid-template-columns: 1fr 1fr !important;
                gap: 12px !important;
            }
            @media (max-width: 480px) {
                .fin-kpis-grid {
                    grid-template-columns: 1fr !important;
                }
            }
            .fin-top-grid, .fin-bottom-grid {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
            }

            body {
                flex-direction: column;
                height: 100vh;
                padding-top: 56px;
                padding-bottom: 60px;
                box-sizing: border-box;
            }

            .mobile-header {
                display: flex;
            }

            .mobile-bottom-nav {
                display: flex;
            }

            /* Sidebar Drawer */
            .sidebar {
                position: fixed;
                top: 56px;
                bottom: 60px;
                left: -330px;
                width: 300px;
                z-index: 950;
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 10px 0 30px rgba(0,0,0,0.5);
            }

            .sidebar.mobile-open {
                transform: translateX(330px);
            }

            /* Main Panel */
            .main-panel {
                width: 100%;
                height: calc(100vh - 116px);
                overflow-y: auto;
            }

            /* Chat Panel Drawer */
            .chat-panel {
                position: fixed;
                top: 56px;
                bottom: 60px;
                right: -370px;
                width: 340px;
                z-index: 950;
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            }

            .chat-panel.mobile-open {
                transform: translateX(-370px);
            }

            /* Spacing adjustments for Mobile Screens */
            .welcome-screen {
                padding: 16px !important;
            }

            #finanzen-screen, #domains-screen {
                padding: 16px !important;
            }

            .welcome-screen h1, #finanzen-screen h1, #domains-screen h1 {
                font-size: 22px !important;
            }

            /* Grid Layout adjustments for Mobile */
            div[style*="grid-template-columns: 1.2fr 1.8fr"] {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
            }

            div[style*="grid-template-columns: repeat(4, 1fr)"] {
                grid-template-columns: 1fr 1fr !important;
                gap: 10px !important;
            }

            div[style*="grid-template-columns: 1fr 1fr"] {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
            }

            div[style*="grid-template-columns: 1fr 1.5fr"] {
                grid-template-columns: 1fr !important;
                gap: 20px !important;
            }

            /* Client Header Mobile */
            .client-header {
                padding: 16px;
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }

            .header-actions {
                width: 100%;
                flex-wrap: wrap;
            }

            .client-content {
                grid-template-columns: 1fr !important;
                padding: 16px;
                gap: 20px;
            }
        }

        @media (max-width: 600px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
                grid-template-columns: 1fr !important;
            }
            
            .modal-content {
                width: 95% !important;
                padding: 18px !important;
            }
        }
    </style>
</head>
<body>

    <!-- MOBILE BACKDROP & HEADER -->
    <div class="mobile-backdrop" id="mobile-backdrop" onclick="closeMobileDrawers()"></div>

    <div class="mobile-header">
        <button class="mobile-toggle-btn" onclick="toggleMobileSidebar()" title="Kunden-Menü öffnen">
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="logo" style="font-size: 18px; display: flex; align-items: center; gap: 6px;">
            <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/scholz-friese-gbr-c95bc9f6.png" alt="Gustav Logo" style="width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--color-primary); object-fit: cover;">
            <span>Gustav</span>
        </div>
        <button class="mobile-toggle-btn" onclick="toggleMobileChat()" title="Gustav KI Chat öffnen">
            <i class="fa-solid fa-robot"></i>
        </button>
    </div>

    <!-- SIDEBAR -->
    <div class="sidebar">
        <div class="sidebar-header">
            <div class="logo" style="display: flex; align-items: center; gap: 8px;">
                <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/scholz-friese-gbr-c95bc9f6.png" alt="Gustav Logo" style="width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid var(--color-primary); object-fit: cover;">
                <span>Gustav</span>
            </div>
            <div style="display:flex; gap: 6px; align-items:center;">
                <button class="btn-add-client" style="background:rgba(255,255,255,0.05); border-color:var(--border-color); padding: 8px; color: #ef4444;" onclick="handleLogout()" title="Abmelden">
                    <i class="fa-solid fa-sign-out-alt"></i>
                </button>
                <button class="btn-add-client" onclick="openAddClientModal()">
                    <i class="fa-solid fa-plus"></i> Neu
                </button>
            </div>
        </div>
        <div class="sidebar-nav">
            <button class="nav-item active" id="nav-btn-hub" onclick="showView('hub')">
                <i class="fa-solid fa-chart-line"></i> Command Center
            </button>
            <button class="nav-item" id="nav-btn-domains" onclick="showView('domains')">
                <i class="fa-solid fa-cloud"></i> Cloudflare Domains
            </button>
            <button class="nav-item" id="nav-btn-finanzen" onclick="showView('finanzen')">
                <i class="fa-solid fa-wallet"></i> Finanzen
            </button>
            <button class="nav-item" id="nav-btn-mail" onclick="showView('mail')">
                <i class="fa-solid fa-paper-plane"></i> E-Mail verfassen
            </button>
        </div>
        <div class="search-container">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search-input" id="search-bar" placeholder="Kunden durchsuchen..." oninput="filterClients()">
        </div>
        <div class="client-list" id="client-list">
            <!-- Dynamic Client Items -->
        </div>
    </div>

    <!-- MAIN PANEL -->
    <div class="main-panel">
        
        <!-- Welcome / State Empty / Command Center -->
        <div class="welcome-screen" id="welcome-screen" style="overflow-y: auto; display: flex; flex-direction: column; justify-content: flex-start; padding: 40px; box-sizing: border-box; width: 100%; height: 100%;">
            <!-- Header-Leiste mit Live-Uhr -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; max-width: 1200px; margin: 0 auto 30px auto; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; box-sizing: border-box;">
                <div style="text-align: left;">
                    <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--color-cyan); text-shadow: 0 0 10px rgba(6,182,212,0.3); display: block; margin-bottom: 8px;">
                        <i class="fa-solid fa-satellite-dish"></i> Scholz & Friese Command Center
                    </span>
                    <h1 style="margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 32px; background: linear-gradient(135deg, var(--text-primary) 30%, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        Gustav Dashboard
                    </h1>
                </div>
                <div style="text-align: right;">
                    <div id="live-clock" style="font-family: var(--font-heading); font-size: 28px; font-weight: 700; color: var(--text-primary); text-shadow: 0 0 10px rgba(59,130,246,0.3); line-height: 1;">--:--:--</div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;" id="live-date">Dienstag, 16. Juni 2026</div>
                </div>
            </div>
            
            <!-- Grid Layout -->
            <div style="display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 30px; width: 100%; max-width: 1200px; margin: 0 auto; text-align: left; align-items: start; box-sizing: border-box;">
                
                <!-- Links: Status & Alerts -->
                <div style="display: flex; flex-direction: column; gap: 30px; box-sizing: border-box;">
                    <!-- Stat Card: Radial/Ampel Visual -->
                    <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 24px;">
                        <h3 class="card-title" style="margin-bottom: 16px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-cyan);"></i> Agentur Status</h3>
                        
                        <div style="display: flex; align-items: center; gap: 24px; margin-top: 10px;">
                            <!-- Circle status visualization -->
                            <div style="position: relative; width: 80px; height: 80px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 40%, transparent 70%); border-radius: 50%;">
                                <div id="status-glow-ring" style="width: 70px; height: 70px; border-radius: 50%; border: 4px solid var(--color-green); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(16, 185, 129, 0.3); transition: var(--transition-smooth); box-sizing: border-box;">
                                    <i id="status-ring-icon" class="fa-solid fa-check" style="font-size: 24px; color: var(--color-green);"></i>
                                </div>
                            </div>
                            
                            <div style="flex-grow: 1; text-align: left;">
                                <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;" id="status-title-center">Alle Systeme nominal</div>
                                <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;" id="status-desc-center">Sämtliche Kunden-Websites laufen stabil. Keine offenen Support-Mails ausstehend.</div>
                            </div>
                        </div>

                        <!-- System Checklist -->
                        <div style="border-top: 1px solid var(--border-color); padding-top: 16px; margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px; color: var(--text-secondary);">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="status-dot green" id="cf-api-check-dot" style="width: 8px; height: 8px; box-shadow: 0 0 6px var(--color-green); position: static; display: inline-block;"></span> Cloudflare API
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="status-dot green" id="imap-check-dot" style="width: 8px; height: 8px; box-shadow: 0 0 6px var(--color-green); position: static; display: inline-block;"></span> E-Mail Webhooks
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="status-dot green" id="r2-check-dot" style="width: 8px; height: 8px; box-shadow: 0 0 6px var(--color-green); position: static; display: inline-block;"></span> R2 Cloud Storage
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="status-dot green" id="ai-check-dot" style="width: 8px; height: 8px; box-shadow: 0 0 6px var(--color-green); position: static; display: inline-block;"></span> Workers AI Engine
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; grid-column: span 2;">
                                <span class="status-dot green" id="cf-status-page-dot" style="width: 8px; height: 8px; box-shadow: 0 0 6px var(--color-green); position: static; display: inline-block;"></span> 
                                <span style="display: inline-flex; align-items: center; gap: 4px;">
                                    Cloudflare Status (Extern)
                                    <a href="https://www.cloudflarestatus.com/" target="_blank" style="color: var(--color-primary); text-decoration: none; font-size: 10px; display: inline-flex; align-items: center;" title="Offizielle Cloudflare Statusseite öffnen"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Client Summary Card -->
                    <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 24px;">
                        <h3 class="card-title" style="margin-bottom: 16px;"><i class="fa-solid fa-chart-pie"></i> Kunden & Auslastung</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
                            <div style="background: rgba(16, 185, 129, 0.03); border: 1px solid rgba(16, 185, 129, 0.1); padding: 16px; border-radius: 12px; text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; color: var(--color-green); font-family: var(--font-heading);" id="stats-ok">0</div>
                                <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; margin-top: 6px; letter-spacing: 0.5px;">Alles OK</div>
                            </div>
                            <div style="background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.1); padding: 16px; border-radius: 12px; text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; color: var(--color-red); font-family: var(--font-heading);" id="stats-red">0</div>
                                <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; margin-top: 6px; letter-spacing: 0.5px;">Aktion nötig</div>
                            </div>
                        </div>
                    </div>

                    <!-- Finance Command Center Card -->
                    <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 20px; cursor: pointer;" onclick="showView('finanzen')">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <h3 class="card-title" style="margin: 0; font-size: 14px;"><i class="fa-solid fa-coins" style="color: var(--color-green);"></i> Finanzen & Cashflow</h3>
                            <span style="font-size: 11px; color: var(--color-cyan); font-weight: 600;">Zur Übersicht <i class="fa-solid fa-chevron-right"></i></span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); padding: 10px 12px; border-radius: 8px;">
                                <div style="font-size: 10px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Umsatz (Monat)</div>
                                <div style="font-size: 18px; font-weight: 800; color: var(--color-green); margin-top: 2px; font-family: var(--font-heading);" id="dash-fin-incomes">0,00 €</div>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 10px 12px; border-radius: 8px;">
                                <div style="font-size: 10px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Gewinn (Monat)</div>
                                <div style="font-size: 18px; font-weight: 800; color: #fff; margin-top: 2px; font-family: var(--font-heading);" id="dash-fin-profit">0,00 €</div>
                            </div>
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 10px; display: flex; justify-content: space-between;">
                            <span>MRR: <strong id="dash-fin-mrr" style="color: var(--color-cyan);">0,00 €</strong></span>
                            <span>YTD: <strong id="dash-fin-ytd" style="color: var(--text-primary);">0,00 €</strong></span>
                        </div>
                    </div>
                </div>

                <!-- Rechts: Activity & Alarm-Zentrale (nimmt die volle Höhe ein für bessere Symmetrie) -->
                <div style="display: flex; flex-direction: column; gap: 30px; box-sizing: border-box;">
                    <!-- Card: Active alerts / Mail Action Center -->
                    <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 24px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column;">
                        <h3 class="card-title" style="margin-bottom: 16px;"><i class="fa-solid fa-bell" style="color: var(--color-red);"></i> Aktivitäts- & Alarm-Zentrale</h3>
                        <div id="alerts-center-list" style="display: flex; flex-direction: column; gap: 10px; overflow-y: auto; flex-grow: 1; max-height: 380px; padding-right: 4px;">
                            <!-- Dynamische Liste von Kunden-Alarms -->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- NEW: Cloudflare Domains Screen -->
        <div class="welcome-screen" id="domains-screen" style="display: none; overflow-y: auto; flex-direction: column; justify-content: flex-start; padding: 40px; box-sizing: border-box; width: 100%; height: 100%;">
            <!-- Header-Leiste -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; max-width: 1200px; margin: 0 auto 30px auto; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; box-sizing: border-box;">
                <div style="text-align: left;">
                    <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #f38020; text-shadow: 0 0 10px rgba(243,128,32,0.2); display: block; margin-bottom: 8px;">
                        <i class="fa-solid fa-cloud"></i> Cloudflare Network
                    </span>
                    <h1 style="margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 32px; background: linear-gradient(135deg, var(--text-primary) 30%, #f38020); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        Domain Portfolio
                    </h1>
                </div>
                <div style="text-align: right; display: flex; align-items: center; gap: 15px;">
                    <input type="text" id="domain-search" placeholder="Domain filtern..." oninput="filterDomains()" style="background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 12px; color: var(--text-primary); font-size: 13px; outline: none; width: 200px; transition: var(--transition-smooth);">
                    <span style="font-size: 13px; color: #f38020; font-weight: 600; background: rgba(243, 128, 32, 0.1); border: 1px solid rgba(243, 128, 32, 0.2); padding: 6px 12px; border-radius: 8px;" id="domains-page-count">0 Zonen</span>
                </div>
            </div>
            
            <!-- Table Wrapper -->
            <div style="width: 100%; max-width: 1200px; margin: 0 auto; box-sizing: border-box;">
                <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 0; overflow: hidden; display: flex; flex-direction: column;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.02);">
                                <th style="padding: 16px 24px; color: var(--text-secondary); font-weight: 600;">Domain</th>
                                <th style="padding: 16px 24px; color: var(--text-secondary); font-weight: 600;">Status</th>
                                <th style="padding: 16px 24px; color: var(--text-secondary); font-weight: 600;">Typ</th>
                                <th style="padding: 16px 24px; color: var(--text-secondary); font-weight: 600;">Nameserver</th>
                                <th style="padding: 16px 24px; color: var(--text-secondary); font-weight: 600; text-align: right;">Aktion</th>
                            </tr>
                        </thead>
                        <tbody id="domains-table-body">
                            <!-- Dynamic Rows -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- MAIL COMPOSER SCREEN -->
        <div class="welcome-screen" id="mail-screen" style="display: none; overflow-y: auto; flex-direction: column; justify-content: flex-start; padding: 40px; box-sizing: border-box; width: 100%; height: 100%;">
            <!-- Header-Leiste -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; max-width: 1000px; margin: 0 auto 30px auto; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; box-sizing: border-box;">
                <div style="text-align: left;">
                    <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--color-cyan); text-shadow: 0 0 10px rgba(6,182,212,0.2); display: block; margin-bottom: 8px;">
                        <i class="fa-solid fa-paper-plane"></i> Outbound Mail Engine
                    </span>
                    <h1 style="margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 32px; background: linear-gradient(135deg, var(--text-primary) 30%, var(--color-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        E-Mail verfassen
                    </h1>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 11px; color: var(--color-green); font-weight: 600; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-green); box-shadow: 0 0 6px var(--color-green);"></span> Resend API verbunden
                    </span>
                </div>
            </div>
            
            <!-- Composer Form Card -->
            <div style="width: 100%; max-width: 1000px; margin: 0 auto; box-sizing: border-box;">
                <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 30px; display: flex; flex-direction: column; gap: 20px;">
                    
                    <!-- Absender und Empfänger in einem 2-Spalten Layout -->
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
                        
                        <!-- Absender -->
                        <div class="form-group" style="margin: 0;">
                            <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Absender (Sender)</label>
                            <select id="mail-sender" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 14px; outline: none; transition: var(--transition-smooth); cursor: pointer;">
                                <option value="info@scholz-friese-webdesign.de">info@scholz-friese-webdesign.de</option>
                                <option value="bastianscholz@scholz-friese-webdesign.de">bastianscholz@scholz-friese-webdesign.de</option>
                            </select>
                        </div>
                        
                        <!-- Empfänger-Optionen -->
                        <div class="form-group" style="margin: 0; display: flex; flex-direction: column; gap: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin: 0;">Empfänger (Recipients)</label>
                                <div style="display: flex; gap: 8px;">
                                    <button type="button" class="btn" style="padding: 4px 8px; font-size: 11px; font-weight: 600;" onclick="selectMailRecipients('all')">
                                        <i class="fa-solid fa-check-double"></i> Alle Kunden
                                    </button>
                                    <button type="button" class="btn" style="padding: 4px 8px; font-size: 11px; font-weight: 600; color: var(--color-red); border-color: rgba(239,68,68,0.2);" onclick="selectMailRecipients('clear')">
                                        <i class="fa-solid fa-trash-can"></i> Leeren
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Empfänger-Eingabe & Such-Dropdown -->
                            <div style="position: relative; display: flex; gap: 8px;">
                                <input type="text" id="mail-recipient-input" placeholder="Kunde suchen oder E-Mail eingeben..." oninput="showMailRecipientSuggestions()" onkeydown="handleMailRecipientKeyDown(event)" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; flex-grow: 1; box-sizing: border-box; font-size: 14px; outline: none; transition: var(--transition-smooth);">
                                <button type="button" class="btn btn-primary" style="padding: 0 16px;" onclick="addMailRecipientFromInput()">Hinzufügen</button>
                                
                                <!-- Dropdown Suggestions -->
                                <div id="mail-suggestions-dropdown" style="display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #0c0f17; border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; max-height: 200px; overflow-y: auto;">
                                    <!-- Dynamic items -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Empfänger Tags Container -->
                    <div id="mail-recipients-tags" style="display: flex; flex-wrap: wrap; gap: 8px; min-height: 38px; background: rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.05); padding: 8px; border-radius: 8px; box-sizing: border-box; align-items: center;">
                        <span style="font-size: 12px; color: var(--text-secondary); padding: 2px 4px;">Keine Empfänger ausgewählt. Verwende die Suche, trage eine Mail ein oder wähle "Alle Kunden".</span>
                    </div>
                    
                    <!-- Betreff -->
                    <div class="form-group" style="margin: 0;">
                        <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Betreff (Subject)</label>
                        <input type="text" id="mail-subject" placeholder="Betreff der E-Mail eingeben..." style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 14px; outline: none; transition: var(--transition-smooth);">
                    </div>
                    
                    <!-- E-Mail Inhalt (Body) -->
                    <div class="form-group" style="margin: 0;">
                        <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">E-Mail Inhalt (Plain Text / HTML)</label>
                        <textarea id="mail-body" placeholder="Schreibe deine E-Mail hier..." style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 16px; border-radius: 8px; width: 100%; height: 280px; box-sizing: border-box; font-size: 14px; line-height: 1.5; outline: none; font-family: inherit; resize: vertical; transition: var(--transition-smooth);"></textarea>
                    </div>

                    <!-- Signatur-Hinweis -->
                    <div style="font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.02); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                        <i class="fa-solid fa-signature" style="color: var(--color-cyan);"></i>
                        <span>Die Standard-Signatur von **Scholz & Friese Webdesign** wird automatisch an die gesendete Mail angehängt.</span>
                    </div>
                    
                    <!-- Senden-Bereich -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 10px;">
                        <div id="mail-status-message" style="font-size: 13.5px; font-weight: 500;"></div>
                        <button type="button" class="btn btn-primary" id="btn-send-mail" style="padding: 12px 30px; font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 10px;" onclick="sendMail()">
                            <i class="fa-solid fa-paper-plane" id="mail-send-icon"></i> <span id="mail-send-btn-text">E-Mail senden</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- FINANZEN SCREEN -->
        <div id="finanzen-screen" style="display: none; height: 100%; flex-direction: column; overflow-y: auto;">
            <div class="fin-header-container">
                <div style="text-align: left;">
                    <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--color-green); text-shadow: 0 0 10px rgba(16,185,129,0.2); display: block; margin-bottom: 8px;">
                        <i class="fa-solid fa-coins"></i> Agentur Finanzen & Cashflow
                    </span>
                    <h1 style="margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 32px; background: linear-gradient(135deg, var(--text-primary) 30%, var(--color-green)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        Finanzübersicht & MRR
                    </h1>
                </div>
                <div class="fin-header-actions">
                    <button class="btn btn-secondary" onclick="exportFinancesCSV('income')" style="padding: 8px 12px; font-size: 12px;" title="Nur Einnahmen mit MwSt für Steuerberater">
                        <i class="fa-solid fa-file-excel" style="color: #10b981;"></i> Einnahmen (CSV)
                    </button>
                    <button class="btn btn-secondary" onclick="exportFinancesCSV('expense')" style="padding: 8px 12px; font-size: 12px;" title="Nur Ausgaben mit MwSt für Steuerberater">
                        <i class="fa-solid fa-file-excel" style="color: #ef4444;"></i> Ausgaben (CSV)
                    </button>
                    <button class="btn btn-secondary" onclick="exportFinancesCSV('all')" style="padding: 8px 12px; font-size: 12px;" title="Gesamtübersicht Einnahmen & Ausgaben">
                        <i class="fa-solid fa-download"></i> Alle (CSV)
                    </button>
                    <button class="btn btn-primary" onclick="openTransactionModal()" style="padding: 8px 14px; font-size: 13px;">
                        <i class="fa-solid fa-plus"></i> Transaktion hinzufügen
                    </button>
                </div>
            </div>

            <div class="fin-container-wrapper" style="width: 100%; max-width: 1200px; margin: 0 auto; box-sizing: border-box; display: flex; flex-direction: column; gap: 24px; padding-bottom: 40px;">
                <!-- KPI CARDS -->
                <div class="fin-kpis-grid">
                    <div class="card" style="padding: 18px; text-align: left; background: rgba(17, 24, 39, 0.4);">
                        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Monatliche Einnahmen</div>
                        <div style="font-size: 24px; font-weight: 800; color: var(--color-green); margin-top: 6px; font-family: var(--font-heading);" id="fin-kpi-incomes">0,00 €</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;" id="fin-kpi-mrr">MRR: 0,00 € / Mon.</div>
                    </div>
                    <div class="card" style="padding: 18px; text-align: left; background: rgba(17, 24, 39, 0.4);">
                        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Monatliche Ausgaben</div>
                        <div style="font-size: 24px; font-weight: 800; color: var(--color-red); margin-top: 6px; font-family: var(--font-heading);" id="fin-kpi-expenses">0,00 €</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;" id="fin-kpi-fix-expenses">Fixkosten: 0,00 € / Mon.</div>
                    </div>
                    <div class="card" style="padding: 18px; text-align: left; background: rgba(17, 24, 39, 0.4);">
                        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Jahres-Gewinn (<span id="fin-kpi-profit-year">2026</span>)</div>
                        <div style="font-size: 24px; font-weight: 800; color: #fff; margin-top: 6px; font-family: var(--font-heading);" id="fin-kpi-profit">0,00 €</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;" id="fin-kpi-margin">Gewinnmarge: 0%</div>
                    </div>
                    <div class="card" style="padding: 18px; text-align: left; background: rgba(17, 24, 39, 0.4);">
                        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Jahres-Umsatz (YTD)</div>
                        <div style="font-size: 24px; font-weight: 800; color: var(--color-cyan); margin-top: 6px; font-family: var(--font-heading);" id="fin-kpi-ytd">0,00 €</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;" id="fin-kpi-total-count">0 Transaktion(en)</div>
                    </div>
                </div>

                <!-- YEAR FILTER BAR (ENDLESS ARROW NAVIGATION) -->
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(17, 24, 39, 0.4); border: 1px solid var(--border-color); padding: 14px 20px; border-radius: 12px; box-sizing: border-box; flex-wrap: wrap; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                        <span style="font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-calendar-days" style="color: var(--color-cyan);"></i> Auswertungs-Jahr:
                        </span>
                        
                        <!-- Endlose Pfeil-Steuerung -->
                        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-color); padding: 4px 8px; border-radius: 10px;">
                            <button onclick="prevFinanceYear()" class="btn btn-secondary" style="padding: 6px 12px; font-size: 13px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Vorheriges Jahr (Endlos)">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <span id="fin-selected-year-display" style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-green); min-width: 65px; text-align: center; display: inline-block;">2026</span>
                            <button onclick="nextFinanceYear()" class="btn btn-secondary" style="padding: 6px 12px; font-size: 13px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Nächstes Jahr (Endlos)">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div style="font-size: 12px; color: var(--text-secondary);" id="fin-year-summary-text">
                        Alle Auswertungen & Diagramme gelten für das Jahr <strong id="fin-selected-year-label" style="color: var(--color-green);">2026</strong>
                    </div>
                </div>

                <!-- TOP CHARTS ROW (2 LARGE COMPARISON CHARTS) -->
                <div class="fin-top-grid">
                    <div class="card" style="padding: 22px; background: rgba(17, 24, 39, 0.4);">
                        <h3 class="card-title" style="margin-bottom: 16px; font-size: 14px;"><i class="fa-solid fa-chart-column" style="color: var(--color-green);"></i> Monatlicher Gesamtverlauf (Einnahmen vs. Ausgaben)</h3>
                        <div style="height: 280px; position: relative;">
                            <canvas id="fin-chart-monthly"></canvas>
                        </div>
                    </div>
                    <div class="card" style="padding: 22px; background: rgba(17, 24, 39, 0.4);">
                        <h3 class="card-title" style="margin-bottom: 16px; font-size: 14px;"><i class="fa-solid fa-arrows-rotate" style="color: var(--color-cyan);"></i> Einnahmen-Struktur (MRR Abos vs. Einmalig Projekte)</h3>
                        <div style="height: 280px; position: relative;">
                            <canvas id="fin-chart-incomes-split"></canvas>
                        </div>
                    </div>
                </div>

                <!-- BOTTOM ROW: CATEGORY BREAKDOWNS (INCOME & EXPENSE) -->
                <div class="fin-bottom-grid">
                    <!-- INCOME CATEGORY ANALYSIS CARD -->
                    <div class="card" style="padding: 24px; background: rgba(17, 24, 39, 0.4); display: flex; flex-direction: column; gap: 16px;">
                        <h3 class="card-title" style="margin-bottom: 8px; font-size: 15px;">
                            <i class="fa-solid fa-chart-pie" style="color: var(--color-green);"></i> Einnahmen-Analyse nach Kategorie
                        </h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            <!-- Top: Doughnut Chart (Centered & scaled) -->
                            <div style="height: 180px; position: relative; display: flex; justify-content: center; align-items: center; margin: 0 auto; width: 100%;">
                                <canvas id="fin-chart-categories-income" style="max-height: 180px; max-width: 180px;"></canvas>
                            </div>

                            <!-- Bottom: Big Total Income KPI & Detailed Category Breakdown List -->
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
                                    <div>
                                        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Gesamteinnahmen im Jahr <span class="fin-cat-year-label-class">2026</span></div>
                                        <div style="font-size: 28px; font-weight: 800; color: var(--color-green); margin-top: 4px; font-family: var(--font-heading);" id="fin-cat-total-incomes">0,00 €</div>
                                    </div>
                                    <div style="text-align: right; font-size: 12px; color: var(--text-secondary);" id="fin-cat-avg-income">
                                        Ø 0,00 € / Mon.
                                    </div>
                                </div>

                                <!-- Category breakdown list for income -->
                                <div id="fin-category-breakdown-list-income" style="display: flex; flex-direction: column; gap: 6px;">
                                    <!-- Dynamic breakdown list -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- EXPENSE CATEGORY ANALYSIS CARD -->
                    <div class="card" style="padding: 24px; background: rgba(17, 24, 39, 0.4); display: flex; flex-direction: column; gap: 16px;">
                        <h3 class="card-title" style="margin-bottom: 8px; font-size: 15px;">
                            <i class="fa-solid fa-chart-pie" style="color: var(--color-red);"></i> Ausgaben-Analyse nach Kategorie
                        </h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            <!-- Top: Doughnut Chart (Centered & scaled) -->
                            <div style="height: 180px; position: relative; display: flex; justify-content: center; align-items: center; margin: 0 auto; width: 100%;">
                                <canvas id="fin-chart-categories" style="max-height: 180px; max-width: 180px;"></canvas>
                            </div>

                            <!-- Bottom: Big Total Expense KPI & Detailed Category Breakdown List -->
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
                                    <div>
                                        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Gesamtausgaben im Jahr <span class="fin-cat-year-label-class">2026</span></div>
                                        <div style="font-size: 28px; font-weight: 800; color: var(--color-red); margin-top: 4px; font-family: var(--font-heading);" id="fin-cat-total-expenses">0,00 €</div>
                                    </div>
                                    <div style="text-align: right; font-size: 12px; color: var(--text-secondary);" id="fin-cat-avg-expense">
                                        Ø 0,00 € / Mon.
                                    </div>
                                </div>

                                <!-- Category breakdown list for expense -->
                                <div id="fin-category-breakdown-list" style="display: flex; flex-direction: column; gap: 6px;">
                                    <!-- Dynamic breakdown list -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TRANSACTIONS TABLE CARD -->
                <div class="card" style="padding: 20px; background: rgba(17, 24, 39, 0.4); display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 class="card-title" style="margin: 0;"><i class="fa-solid fa-list-ul"></i> Alle Transaktionen</h3>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary fin-filter-btn active" onclick="filterTransactions('all', this)" style="padding: 4px 10px; font-size: 11px;">Alle</button>
                            <button class="btn btn-secondary fin-filter-btn" onclick="filterTransactions('income', this)" style="padding: 4px 10px; font-size: 11px;">Einnahmen</button>
                            <button class="btn btn-secondary fin-filter-btn" onclick="filterTransactions('expense', this)" style="padding: 4px 10px; font-size: 11px;">Ausgaben</button>
                            <button class="btn btn-secondary fin-filter-btn" onclick="filterTransactions('monthly', this)" style="padding: 4px 10px; font-size: 11px;">Wiederkehrend</button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 11px; text-transform: uppercase;">
                                    <th style="padding: 10px;">Typ</th>
                                    <th style="padding: 10px;">Datum</th>
                                    <th style="padding: 10px;">Beschreibung</th>
                                    <th style="padding: 10px;">Kategorie</th>
                                    <th style="padding: 10px;">Intervall</th>
                                    <th style="padding: 10px; text-align: right;">Netto (€)</th>
                                    <th style="padding: 10px; text-align: right;">19% MwSt (€)</th>
                                    <th style="padding: 10px; text-align: right;">Brutto (€)</th>
                                    <th style="padding: 10px; text-align: center;">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody id="finances-table-body">
                                <!-- Dynamic rows -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Client Active Details -->
        <div id="client-view" style="display: none; height: 100%; flex-direction: column;">
            <div class="client-header">
                <div class="client-title-area">
                    <h2 class="client-title" id="active-client-name">Kundenname</h2>
                    <div class="status-pill" id="active-client-status">
                        <span class="status-dot"></span>
                        <span class="status-text">Status</span>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="openMailWithClient()">
                        <i class="fa-solid fa-paper-plane"></i> E-Mail schreiben
                    </button>
                    <button class="btn" onclick="toggleManualStatus()">
                        <i class="fa-solid fa-rotate"></i> Status umstellen
                    </button>
                    <button class="btn" onclick="openEditClientModal()">
                        <i class="fa-solid fa-pen-to-square"></i> Bearbeiten
                    </button>
                    <button class="btn btn-danger" onclick="deleteClient()">
                        <i class="fa-solid fa-trash"></i> Löschen
                    </button>
                </div>
            </div>
            
            <!-- Warning / Action Banner -->
            <div id="client-action-banner" style="display: none;"></div>

            <div class="client-content">
                <!-- COL 1 -->
                <div style="display: flex; flex-direction: column; gap: 30px;">
                    <!-- Cloudflare Card -->
                    <div class="card">
                        <h3 class="card-title">
                            <i class="fa-solid fa-cloud"></i> Cloudflare Live-Status
                        </h3>
                        <div class="cloudflare-status">
                            <div>
                                <span class="cf-badge">Pages</span>
                                <strong style="margin-left: 8px;" id="cf-project-name">-</strong>
                            </div>
                            <span id="cf-project-status" style="font-weight: 600;">Unverknüpft</span>
                        </div>
                        <div style="font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
                            <div><strong>Live-URL:</strong> <a href="#" id="cf-project-url" target="_blank" style="color: var(--color-primary); text-decoration: none;">-</a></div>
                            <div><strong>Letztes Deployment:</strong> <span id="cf-project-modified">-</span></div>
                        </div>
                    </div>

                    <!-- Notes & Tasks Card -->
                    <div class="card">
                        <h3 class="card-title">
                            <i class="fa-solid fa-list-check"></i> Notizen & Aufgaben
                        </h3>
                        <ul class="todo-list" id="todo-list" style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; max-height:220px; overflow-y:auto; margin-bottom:15px;">
                            <!-- Todos list populated dynamically -->
                        </ul>
                        <div class="todo-input-area" style="display:flex; gap:8px;">
                            <input type="text" id="new-todo-input" placeholder="Neue Aufgabe / Notiz hinzufügen..." style="flex:1; background:rgba(0,0,0,0.2); border:1px solid var(--border-color); border-radius:6px; color:#fff; padding:8px 12px; font-size:13px; outline:none;" onkeydown="if(event.key === 'Enter') addTodo()">
                            <button class="btn btn-primary" onclick="addTodo()" style="padding:8px 14px; font-size:13px;"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>

                <!-- COL 2 -->
                <div style="display: flex; flex-direction: column; gap: 30px;">
                    <!-- Contracts (R2) -->
                    <div class="card">
                        <h3 class="card-title">
                            <i class="fa-solid fa-file-contract"></i> Verträge & Dokumente (R2)
                        </h3>
                        <div class="uploader-zone" id="uploader-zone" onclick="triggerFileInput()">
                            <i class="fa-solid fa-file-arrow-up"></i>
                            <p style="margin: 0; font-size: 13px; font-weight: 500;">Vertrag hochladen (PDF, Word...)</p>
                            <span style="font-size: 11px; color: var(--text-secondary);">Klicken oder Datei hierher ziehen</span>
                            <input type="file" id="contract-file-input" style="display: none;" onchange="uploadContract(event)">
                        </div>
                        <ul class="file-list" id="contracts-list">
                            <!-- Dynamic Files -->
                        </ul>
                    </div>

                </div>

                <!-- ROW 2: E-Mail log -->
                <div class="card email-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 class="card-title">
                            <i class="fa-solid fa-envelope-open-text"></i> Letzte Interaktionen (E-Mails)
                        </h3>
                        <span style="font-size: 11px; color: var(--color-green); font-weight: 500; display: flex; align-items: center; gap: 6px;">
                            <span class="status-dot green" style="width: 6px; height: 6px; position: static; display: inline-block; box-shadow: 0 0 4px var(--color-green);"></span> Webhooks aktiv
                        </span>
                    </div>
                    <div class="email-list" id="email-list">
                        <!-- Dynamic Emails -->
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- GUSTAV CHAT PANEL -->
    <div class="chat-panel">
        <!-- Collapse/Expand handle for Desktop -->
        <div class="chat-toggle-handle" onclick="toggleChatCollapse()" title="Chat ein-/ausklappen">
            <i class="fa-solid fa-chevron-right" id="chat-toggle-chevron"></i>
        </div>
        <div class="chat-header">
            <div class="chat-title" style="display: flex; align-items: center; gap: 8px;">
                <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/gustav/scholz-friese-gbr-c95bc9f6.png" alt="Gustav Assistant" style="width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--color-primary); object-fit: cover;">
                <span>Gustav Assistant</span>
            </div>
            <span style="font-size: 11px; color: var(--text-secondary);">llama-3.1-8b</span>
        </div>
        <div class="chat-history" id="chat-history">
            <div class="chat-bubble gustav">
                Hallo! Ich bin Gustav. Womit kann ich dir heute bei Scholz & Friese helfen?
            </div>
        </div>
        <div class="chat-suggested">
            <button class="suggested-btn" onclick="sendSuggestedChat('Welche Kunden stehen auf rot?')">Wer steht auf Rot?</button>
            <button class="suggested-btn" onclick="sendSuggestedChat('Gibt es Verträge, die ausstehen?')">Offene Verträge?</button>
            <button class="suggested-btn" id="suggest-client-btn" style="display:none;" onclick="sendClientSuggested()">Zusammenfassung?</button>
        </div>
        <div class="chat-input-container">
            <input type="text" class="chat-input" id="chat-input" placeholder="Frage Gustav..." onkeydown="handleChatKey(event)">
            <button class="btn-send" onclick="sendChatMessage()">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </div>

    <!-- IMAP SETTINGS MODAL -->
    <div class="modal" id="imap-modal">
        <div class="modal-content" style="width: 600px; max-width: 95%;">
            <h3 class="modal-title">IMAP-Einstellungen</h3>
            <div id="imap-status-indicator" style="font-size: 13px; margin-bottom: 10px;"></div>
            
            <div id="imap-accounts-list" style="display: flex; flex-direction: column; gap: 16px; max-height: 400px; overflow-y: auto; padding-right: 4px; margin-bottom: 16px;">
                <!-- Dynamic accounts rows -->
            </div>
            
            <button type="button" class="btn" onclick="addImapAccountRow()" style="margin-bottom: 10px; width: 100%; justify-content: center;">
                <i class="fa-solid fa-plus"></i> Weiteres E-Mail-Konto hinzufügen
            </button>
            
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeImapModal()">Abbrechen</button>
                <button type="button" class="btn btn-primary" id="imap-save-btn" onclick="submitImapSettings()">Speichern</button>
            </div>
        </div>
    </div>

    <!-- ADD/EDIT CLIENT MODAL -->
    <div class="modal" id="client-modal">
        <div class="modal-content">
            <h3 class="modal-title" id="modal-title">Kunde hinzufügen</h3>
            <form id="client-form" onsubmit="saveClient(event)">
                <input type="hidden" id="modal-client-id">
                
                <div class="form-group">
                    <label>Firmenname *</label>
                    <input type="text" id="modal-client-name" required placeholder="Z.B. Weymann Gebäudetechnik">
                </div>

                <div class="form-group">
                    <label>Kunden-E-Mail *</label>
                    <input type="email" id="modal-client-email" required placeholder="Z.B. info@weymann.de">
                </div>

                <div class="form-group">
                    <label>Verknüpftes Cloudflare Pages Projekt</label>
                    <input type="text" id="modal-client-cf" placeholder="Z.B. weymann-gebaeudetechnik">
                </div>

                <div class="form-group">
                    <label>Echte Domain (Custom Domain)</label>
                    <input type="text" id="modal-client-domain" placeholder="Z.B. weymann-gebaeudetechnik.de">
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn" onclick="closeClientModal()">Abbrechen</button>
                    <button type="submit" class="btn btn-primary">Speichern</button>
                </div>
            </form>
        </div>
    </div>

    <!-- TRANSACTION MODAL -->
    <div class="modal" id="transaction-modal">
        <div class="modal-content">
            <h3 class="modal-title" id="tx-modal-title">Transaktion hinzufügen</h3>
            <form id="tx-form" onsubmit="saveTransaction(event)">
                <input type="hidden" id="tx-id">
                
                <div class="form-group">
                    <label>Typ *</label>
                    <select id="tx-type" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px; border-radius: 8px; width: 100%; box-sizing: border-box;">
                        <option value="income">🟢 Einnahme (+)</option>
                        <option value="expense">🔴 Ausgabe (-)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Beschreibung *</label>
                    <input type="text" id="tx-desc" required placeholder="Z. B. Webdesign Kunde M. Muster, Hosting Hostinger...">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div class="form-group">
                        <label>Betrag (€) *</label>
                        <input type="number" step="0.01" id="tx-amount" required placeholder="0.00">
                    </div>
                    <div class="form-group">
                        <label>Datum *</label>
                        <input type="date" id="tx-date" required style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px; border-radius: 8px; width: 100%; box-sizing: border-box;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div class="form-group">
                        <label>Kategorie</label>
                        <select id="tx-category" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px; border-radius: 8px; width: 100%; box-sizing: border-box;">
                            <option value="Webdesign & Entwicklung">Webdesign & Entwicklung</option>
                            <option value="Wartung & Support">Wartung & Support</option>
                            <option value="Hosting & Domains">Hosting & Domains</option>
                            <option value="Software & Abos">Software & Abos</option>
                            <option value="Marketing & Werbung">Marketing & Werbung</option>
                            <option value="Büro & Sonstiges">Büro & Sonstiges</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Intervall</label>
                        <select id="tx-interval" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px; border-radius: 8px; width: 100%; box-sizing: border-box;">
                            <option value="once">Einmalig</option>
                            <option value="monthly">Monatlich wiederkehrend</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top: 14px; background: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.2); padding: 10px 14px; border-radius: 8px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin: 0;">
                        <input type="checkbox" id="tx-vat-included" checked style="width: 16px; height: 16px; accent-color: var(--color-cyan); cursor: pointer;">
                        <span style="font-size: 13px; color: var(--text-primary); font-weight: 500;">
                            <i class="fa-solid fa-percent" style="color: var(--color-cyan); margin-right: 4px;"></i> 19% MwSt. enthalten (Standard)
                        </span>
                    </label>
                </div>

                <div class="modal-actions" style="margin-top: 20px;">
                    <button type="button" class="btn" onclick="closeTransactionModal()">Abbrechen</button>
                    <button type="submit" class="btn btn-primary">Speichern</button>
                </div>
            </form>
        </div>
    </div>

    <!-- MOBILE BOTTOM NAVIGATION BAR -->
    <div class="mobile-bottom-nav">
        <button class="mobile-nav-item active" id="mob-nav-hub" onclick="showView('hub'); updateMobileBottomNav('hub');">
            <i class="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
        </button>
        <button class="mobile-nav-item" id="mob-nav-kunden" onclick="toggleMobileSidebar();">
            <i class="fa-solid fa-users"></i>
            <span>Kunden</span>
        </button>
        <button class="mobile-nav-item" id="mob-nav-finanzen" onclick="showView('finanzen'); updateMobileBottomNav('finanzen');">
            <i class="fa-solid fa-coins"></i>
            <span>Finanzen</span>
        </button>
        <button class="mobile-nav-item" id="mob-nav-domains" onclick="showView('domains'); updateMobileBottomNav('domains');">
            <i class="fa-solid fa-cloud"></i>
            <span>Domains</span>
        </button>
        <button class="mobile-nav-item" id="mob-nav-chat" onclick="toggleMobileChat();">
            <i class="fa-solid fa-robot"></i>
            <span>Gustav</span>
        </button>
    </div>

    <!-- JS LOGIC -->
    <script>
        let clients = [];
        let activeClient = null;
        let cfProjects = { pages: [], workers: [] };

        // --- OUTBOUND MAIL SYSTEM STATE & LOGIC ---
        let selectedMailRecipients = [];

        function initMailScreen() {
            // Clear inputs
            document.getElementById('mail-subject').value = '';
            document.getElementById('mail-body').value = '';
            document.getElementById('mail-recipient-input').value = '';
            document.getElementById('mail-status-message').innerHTML = '';
            
            // Re-render tags
            renderMailRecipientTags();
        }

        function renderMailRecipientTags() {
            const container = document.getElementById('mail-recipients-tags');
            if (selectedMailRecipients.length === 0) {
                container.innerHTML = '<span style="font-size: 12px; color: var(--text-secondary); padding: 2px 4px;">Keine Empfänger ausgewählt. Verwende die Suche, trage eine Mail ein oder wähle "Alle Kunden".</span>';
                return;
            }

            container.innerHTML = selectedMailRecipients.map((r, idx) => {
                return \`
                    <span style="display: inline-flex; align-items: center; gap: 6px; background: rgba(6, 182, 212, 0.12); border: 1px solid rgba(6, 182, 212, 0.25); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 12.5px; font-weight: 500;">
                        \${r.name} <span style="font-size: 11px; opacity: 0.65;">(\${r.email})</span>
                        <i class="fa-solid fa-xmark" style="cursor: pointer; color: var(--color-cyan); margin-left: 2px; font-size: 12px;" onclick="removeMailRecipient(\${idx})"></i>
                    </span>
                \`;
            }).join('');
        }

        function removeMailRecipient(idx) {
            selectedMailRecipients.splice(idx, 1);
            renderMailRecipientTags();
        }

        function selectMailRecipients(action) {
            if (action === 'all') {
                clients.forEach(c => {
                    const email = (c.email || '').trim();
                    if (email && !selectedMailRecipients.some(r => r.email.toLowerCase() === email.toLowerCase())) {
                        selectedMailRecipients.push({
                            name: c.name,
                            email: email,
                            id: c.id
                        });
                    }
                });
            } else if (action === 'clear') {
                selectedMailRecipients = [];
            }
            renderMailRecipientTags();
        }

        function showMailRecipientSuggestions() {
            const input = document.getElementById('mail-recipient-input');
            const dropdown = document.getElementById('mail-suggestions-dropdown');
            const val = input.value.trim().toLowerCase();

            if (!val) {
                dropdown.style.display = 'none';
                return;
            }

            const matches = clients.filter(c => {
                const email = (c.email || '').toLowerCase();
                const name = (c.name || '').toLowerCase();
                const isAlreadySelected = selectedMailRecipients.some(r => r.email.toLowerCase() === email);
                return email && !isAlreadySelected && (name.includes(val) || email.includes(val));
            });

            if (matches.length === 0) {
                dropdown.style.display = 'none';
                return;
            }

            dropdown.innerHTML = matches.map(c => {
                return \`
                    <div class="recipient-suggestion-item" onclick="addMailRecipient('\${c.name.replace(/'/g, "\\\\'")}', '\${c.email}', '\${c.id}')">
                        <span style="font-weight: 600;">\${c.name}</span>
                        <span style="font-size: 11px; opacity: 0.6;">\${c.email}</span>
                    </div>
                \`;
            }).join('');

            dropdown.style.display = 'block';
        }

        function addMailRecipient(name, email, id) {
            if (!selectedMailRecipients.some(r => r.email.toLowerCase() === email.toLowerCase())) {
                selectedMailRecipients.push({ name, email, id });
                renderMailRecipientTags();
            }
            const input = document.getElementById('mail-recipient-input');
            input.value = '';
            document.getElementById('mail-suggestions-dropdown').style.display = 'none';
            input.focus();
        }

        function handleMailRecipientKeyDown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                addMailRecipientFromInput();
            }
        }

        function addMailRecipientFromInput() {
            const input = document.getElementById('mail-recipient-input');
            const val = input.value.trim();
            if (!val) return;

            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(val)) {
                alert('Bitte gib eine gültige E-Mail-Adresse ein.');
                return;
            }

            if (selectedMailRecipients.some(r => r.email.toLowerCase() === val.toLowerCase())) {
                input.value = '';
                return;
            }

            const existingClient = clients.find(c => (c.email || '').toLowerCase().trim() === val.toLowerCase());
            const name = existingClient ? existingClient.name : 'Extern';
            const id = existingClient ? existingClient.id : null;

            addMailRecipient(name, val, id);
        }

        // Click outside listener for dropdown
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('mail-suggestions-dropdown');
            const input = document.getElementById('mail-recipient-input');
            if (dropdown && e.target !== input && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });

        function openMailWithClient() {
            if (!activeClient || !activeClient.email) {
                alert('Dieser Kunde hat keine E-Mail-Adresse hinterlegt.');
                return;
            }
            
            showView('mail');
            
            selectedMailRecipients = [{
                name: activeClient.name,
                email: activeClient.email.trim(),
                id: activeClient.id
            }];
            renderMailRecipientTags();
        }

        async function sendMail() {
            if (selectedMailRecipients.length === 0) {
                alert('Bitte wähle mindestens einen Empfänger aus.');
                return;
            }

            const subject = document.getElementById('mail-subject').value.trim();
            const body = document.getElementById('mail-body').value.trim();

            if (!subject || !body) {
                alert('Bitte fülle Betreff und Inhalt aus.');
                return;
            }

            const sender = document.getElementById('mail-sender').value;
            const btn = document.getElementById('btn-send-mail');
            const icon = document.getElementById('mail-send-icon');
            const btnText = document.getElementById('mail-send-btn-text');
            const statusMsg = document.getElementById('mail-status-message');

            btn.disabled = true;
            btn.style.opacity = '0.7';
            icon.className = 'fa-solid fa-spinner fa-spin';
            btnText.innerText = 'Wird gesendet...';
            statusMsg.innerHTML = '<span style="color: var(--text-secondary);"><i class="fa-solid fa-hourglass-half"></i> Sende E-Mails via Resend...</span>';

            const recipientEmails = selectedMailRecipients.map(r => r.email);

            try {
                const res = await fetch('/api/emails/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sender,
                        recipients: recipientEmails,
                        subject,
                        body
                    })
                });

                const data = await res.json();

                if (res.ok || res.status === 207) {
                    if (data.success) {
                        statusMsg.innerHTML = '<span style="color: var(--color-green); font-weight: 600;"><i class="fa-solid fa-circle-check"></i> E-Mail erfolgreich gesendet!</span>';
                        document.getElementById('mail-subject').value = '';
                        document.getElementById('mail-body').value = '';
                        selectedMailRecipients = [];
                        renderMailRecipientTags();
                        
                        if (activeClient && recipientEmails.some(email => email.toLowerCase() === activeClient.email.toLowerCase())) {
                            await loadClients();
                            showClientDetails(activeClient.id);
                        }
                    } else {
                        statusMsg.innerHTML = '<span style="color: var(--color-red); font-weight: 600;"><i class="fa-solid fa-circle-xmark"></i> Fehler: ' + (data.message || 'Versand fehlgeschlagen') + '</span>';
                    }
                } else {
                    statusMsg.innerHTML = '<span style="color: var(--color-red); font-weight: 600;"><i class="fa-solid fa-circle-xmark"></i> Serverfehler beim Senden: ' + (data.error || 'Fehlgeschlagen') + '</span>';
                }
            } catch (e) {
                console.error(\'Mail sending error:\', e);
                statusMsg.innerHTML = '<span style="color: var(--color-red); font-weight: 600;"><i class="fa-solid fa-circle-xmark"></i> Netzwerkfehler beim Mailversand.</span>';
            } finally {
                btn.disabled = false;
                btn.style.opacity = '1';
                icon.className = 'fa-solid fa-paper-plane';
                btnText.innerText = 'E-Mail senden';
            }
        }

        // --- INIT ---
        window.addEventListener('DOMContentLoaded', async () => {
            // Restore chat collapse state
            const chatCollapsed = localStorage.getItem('chat_collapsed') === '1';
            if (chatCollapsed) {
                const cp = document.querySelector('.chat-panel');
                const chevron = document.getElementById('chat-toggle-chevron');
                if (cp) cp.classList.add('collapsed');
                if (chevron) chevron.className = 'fa-solid fa-chevron-left';
            }

            await loadCloudflareProjects();
            await loadClients();
            await loadCloudflareDomains();
            updateGlobalStats();
            initDragAndDrop();
            await loadImapSettings();
            await updateSystemChecklist();
            
            // Sync emails on load and every 5 minutes silently
            syncEmails(true);
            setInterval(() => syncEmails(true), 5 * 60 * 1000);
            setInterval(updateSystemChecklist, 60 * 1000);
            
            // Live-Uhrzeit & Datum für das Command Center
            const updateClock = () => {
                const clockEl = document.getElementById('live-clock');
                const dateEl = document.getElementById('live-date');
                const now = new Date();
                if (clockEl) {
                    clockEl.innerText = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                }
                if (dateEl) {
                    dateEl.innerText = now.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                }
            };
            updateClock();
            setInterval(updateClock, 1000);
        });

        // --- CLOUDFLARE FETCH ---
        async function loadCloudflareProjects() {
            try {
                const res = await fetch('/api/cloudflare/projects');
                cfProjects = await res.json();
            } catch (e) {
                console.error("Failed to load Cloudflare projects:", e);
            }
        }

        // --- CLIENTS CRUD ---
        async function loadClients() {
            try {
                const res = await fetch('/api/kunden');
                clients = await res.json();
                renderClientList();
                if (activeClient) {
                    // Refresh current active client view
                    const refreshed = clients.find(c => c.id === activeClient.id);
                    if (refreshed) {
                        selectClient(refreshed);
                    }
                }
            } catch(e) {
                alert("Fehler beim Laden der Kunden.");
            }
        }

        function renderClientList() {
            const list = document.getElementById('client-list');
            list.innerHTML = '';
            clients.forEach(c => {
                const item = document.createElement('div');
                item.className = 'client-item' + (activeClient && activeClient.id === c.id ? ' active' : '');
                item.onclick = () => selectClient(c);
                
                item.innerHTML = \`
                    <div class="client-info">
                        <div class="client-name" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                            \${c.name}
                            \${c.isDraft ? '<span class="draft-badge" style="font-size: 8px; color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.25); background: rgba(245, 158, 11, 0.05); padding: 1px 5px; border-radius: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 2px;"><i class="fa-solid fa-pen-ruler" style="font-size:7px;"></i> Entwurf</span>' : ''}
                        </div>
                        <div class="client-sub">\${c.customDomain || c.linkedCloudflareProject || 'Keine Website verknüpft'}</div>
                    </div>
                    <span class="status-dot \${c.status}"></span>
\`;
                list.appendChild(item);
            });
        }

        function filterClients() {
            const q = document.getElementById('search-bar').value.toLowerCase();
            const items = document.querySelectorAll('.client-item');
            clients.forEach((c, index) => {
                const matches = c.name.toLowerCase().includes(q) || (c.linkedCloudflareProject && c.linkedCloudflareProject.toLowerCase().includes(q));
                items[index].style.display = matches ? 'flex' : 'none';
            });
        }

        // Select client
        async function selectClient(client) {
            activeClient = client;
            closeMobileDrawers();

            document.querySelectorAll('.client-item').forEach(el => el.classList.remove('active'));
            const activeEl = document.getElementById('client-item-' + client.id);
            if (activeEl) activeEl.classList.add('active');

            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('client-view').style.display = 'flex';
            document.getElementById('domains-screen').style.display = 'none';
            const finS = document.getElementById('finanzen-screen');
            if (finS) finS.style.display = 'none';
            document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

            // Update title & status
            document.getElementById('active-client-name').innerHTML = client.name + (client.isDraft ? ' <span class="draft-badge" style="font-size: 11px; color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.25); background: rgba(245, 158, 11, 0.05); padding: 3px 8px; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 10px; vertical-align: middle; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-pen-ruler" style="font-size:9px;"></i> Entwurf</span>' : '');
            const statusPill = document.getElementById('active-client-status');
            statusPill.className = 'status-pill ' + client.status;
            statusPill.querySelector('.status-text').innerText = client.status === 'green' ? 'Alles OK' : 'Aktion erforderlich';

            // Warning Banner for outstanding tasks
            const actionBanner = document.getElementById('client-action-banner');
            if (client.status === 'red') {
                actionBanner.style.display = 'block';
                actionBanner.innerHTML = \`
                    <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; margin: 0px 30px 20px 30px;">
                        <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; font-size: 16px;"></i>
                        <div style="flex: 1; font-size: 13px; text-align: left;">
                            <strong style="color: #ef4444;">Ausstehendes Anliegen:</strong>
                            <span style="color: var(--text-primary); margin-left: 6px;">\${client.statusReason || 'Änderungswunsch ausstehend'}</span>
                        </div>
                    </div>
\`;
            } else {
                actionBanner.style.display = 'none';
                actionBanner.innerHTML = '';
            }

            // Render Todos & Tasks
            renderTodos(client);

            // Render Cloudflare info
            renderCloudflareStatus(client);

            // Render Contracts
            renderContracts(client);

            // Fetch E-Mail logs
            loadEmailLogs(client.id);



            // Update suggested chat button
            const suggestBtn = document.getElementById('suggest-client-btn');
            suggestBtn.style.display = 'block';
            suggestBtn.innerText = 'Info zu ' + client.name;

            // Highlight in list
            renderClientList();
        }

        // Render Cloudflare details from cache
        function renderCloudflareStatus(client) {
            const cfName = client.linkedCloudflareProject;
            const projectNameEl = document.getElementById('cf-project-name');
            const projectStatusEl = document.getElementById('cf-project-status');
            const projectUrlEl = document.getElementById('cf-project-url');
            const projectModEl = document.getElementById('cf-project-modified');

            if (!cfName) {
                projectNameEl.innerText = '-';
                projectStatusEl.innerText = 'Keine Website verknüpft';
                projectStatusEl.style.color = 'var(--text-secondary)';
                projectUrlEl.innerText = '-';
                projectUrlEl.href = '#';
                projectModEl.innerText = '-';
                return;
            }

            // Look in Pages
            const pageProj = cfProjects.pages.find(p => p.name === cfName);
            if (pageProj) {
                projectNameEl.innerText = pageProj.name;
                projectStatusEl.innerText = 'Pages Aktiv';
                projectStatusEl.style.color = 'var(--color-green)';
                projectUrlEl.innerText = pageProj.subdomain;
                projectUrlEl.href = 'https://' + pageProj.subdomain;
                projectModEl.innerText = new Date(pageProj.created_on).toLocaleDateString('de-DE');
                return;
            }

            // Look in Workers
            const workerProj = cfProjects.workers.find(w => w.id === cfName);
            if (workerProj) {
                projectNameEl.innerText = workerProj.id;
                projectStatusEl.innerText = 'Worker Aktiv';
                projectStatusEl.style.color = 'var(--color-cyan)';
                
                // Find custom domain for this worker service if available
                const customDomain = (cfProjects.workerDomains || []).find(d => d.service === cfName);
                if (customDomain) {
                    projectUrlEl.innerText = customDomain.hostname;
                    projectUrlEl.href = 'https://' + customDomain.hostname;
                } else if (cfProjects.workersSubdomain) {
                    // Fallback to default workers.dev subdomain link
                    const devUrl = workerProj.id + '.' + cfProjects.workersSubdomain + '.workers.dev';
                    projectUrlEl.innerText = devUrl;
                    projectUrlEl.href = 'https://' + devUrl;
                } else {
                    projectUrlEl.innerText = 'Worker (Keine Custom Domain)';
                    projectUrlEl.href = '#';
                }
                
                projectModEl.innerText = new Date(workerProj.modified_on).toLocaleDateString('de-DE');
                return;
            }

            // Not found
            projectNameEl.innerText = cfName;
            projectStatusEl.innerText = 'Projekt unauffindbar';
            projectStatusEl.style.color = 'var(--color-red)';
            projectUrlEl.innerText = '-';
            projectUrlEl.href = '#';
            projectModEl.innerText = '-';
        }

        // Render Contracts (R2)
        function renderContracts(client) {
            const list = document.getElementById('contracts-list');
            list.innerHTML = '';
            const contracts = client.contracts || [];
            
            if (contracts.length === 0) {
                list.innerHTML = '<li style="font-size: 13px; color: var(--text-secondary);">Noch keine Verträge hochgeladen.</li>';
                return;
            }

            contracts.forEach(c => {
                const item = document.createElement('li');
                item.className = 'file-item';
                const sizeKb = Math.round(c.size / 1024);

                // Rewrite direct R2 links to the download proxy
                let downloadUrl = c.url;
                if (c.r2Path) {
                    downloadUrl = \`/api/contracts/download?path=\${encodeURIComponent(c.r2Path)}\`;
                } else if (c.url && c.url.includes('.r2.dev/')) {
                    const parts = c.url.split('.r2.dev/');
                    if (parts.length > 1) {
                        downloadUrl = \`/api/contracts/download?path=\${encodeURIComponent(parts[1])}\`;
                    }
                }

                item.innerHTML = \`
                    <a href="\${downloadUrl}" target="_blank">
                        <i class="fa-solid fa-file-pdf"></i> \${c.name} (\&nbsp;\${sizeKb} KB)
                    </a>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 11px; color: var(--text-secondary); opacity: 0.8;">\${new Date(c.uploadedAt).toLocaleDateString('de-DE')}</span>
                        <button onclick="deleteContract('\${client.id}', '\${c.r2Path || ''}', '\${c.name}')" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Vertrag löschen">
                            <i class="fa-solid fa-trash-can" style="font-size: 13px;"></i>
                        </button>
                    </div>
                \`;
                list.appendChild(item);
            });
        }

        async function deleteContract(clientId, r2Path, name) {
            if (!confirm(\`Möchtest du den Vertrag "\${name}" wirklich löschen?\`)) {
                return;
            }

            try {
                const res = await fetch('/api/contracts/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ clientId, r2Path })
                });

                const data = await res.json();
                if (data.success) {
                    // Update activeClient local object
                    if (activeClient && activeClient.id === clientId) {
                        activeClient.contracts = data.customer.contracts;
                        renderContracts(activeClient);
                    }
                    // Reload clients cache
                    await loadClients();
                } else {
                    alert('Fehler beim Löschen des Vertrags: ' + data.error);
                }
            } catch (e) {
                alert('Netzwerkfehler beim Löschen des Vertrags.');
            }
        }

        // Fetch & render emails
        async function loadEmailLogs(clientId) {
            const list = document.getElementById('email-list');
            list.innerHTML = '<div style="font-size:13px; color:var(--text-secondary);">Mails werden geladen...</div>';
            
            try {
                const res = await fetch('/api/emails/' + clientId);
                const emails = await res.json();
                list.innerHTML = '';

                if (emails.length === 0) {
                    list.innerHTML = '<div style="font-size:13px; color:var(--text-secondary);">Kein Mailverkehr registriert.</div>';
                    return;
                }

                emails.forEach(e => {
                    const item = document.createElement('div');
                    const isUnresolvedIncoming = e.direction === 'incoming' && !e.isResolved;
                    item.className = 'email-item ' + e.direction + (isUnresolvedIncoming ? ' unresolved-email' : '');
                    
                    const directionText = e.direction === 'incoming' ? 'Eingehend' : 'Gesendet';
                    const iconClass = e.direction === 'incoming' ? 'fa-arrow-down-left' : 'fa-arrow-up-right';
                    
                    let attachmentsHtml = '';
                    if (e.attachments && e.attachments.length > 0) {
                        attachmentsHtml = '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">';
                        e.attachments.forEach(att => {
                            attachmentsHtml += '<a href="' + att.url + '" target="_blank" class="email-attachment-link"><i class="fa-solid fa-paperclip" style="color: var(--color-cyan);"></i> ' + att.name + '</a>';
                        });
                        attachmentsHtml += '</div>';
                    }

                    const badgeHtml = e.direction === 'incoming' 
                        ? '<span style="background: rgba(59, 130, 246, 0.15); color: #3b82f6; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Kunde</span>'
                        : '<span style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Ich</span>';

                    const summaryHtml = e.summary
                        ? '<div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.05); padding: 10px 12px; border-radius: 8px; font-size: 12.5px; color: var(--text-primary); margin-top: 6px; line-height: 1.4;">' +
                            '<strong style="color: var(--color-cyan); font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 4px;"><i class="fa-solid fa-robot"></i> KI-Zusammenfassung</strong>' +
                            e.summary +
                           '</div>'
                        : '';

                    item.innerHTML = \`
                        <div class="email-meta">
                            <div class="email-meta-left" style="display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid \${iconClass}"></i> \${directionText} (\&lt;\${e.from}\&gt;) \${badgeHtml}
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span>\${new Date(e.date).toLocaleString('de-DE')}</span>
                                \${e.direction === 'incoming' ? (
                                    e.isResolved 
                                    ? \`<button onclick="toggleEmailResolve('\${clientId}', '\${e.id}', false)" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 10px; padding: 2px 8px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight:600;" title="Aufgabe wiedereröffnen"><i class="fa-solid fa-circle-check"></i> Erledigt</button>\`
                                    : \`<button onclick="toggleEmailResolve('\${clientId}', '\${e.id}', true)" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 10px; padding: 2px 8px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight:700;" title="Als erledigt markieren"><i class="fa-solid fa-circle-exclamation"></i> Offen</button>\`
                                ) : ''}
                            </div>
                        </div>
                        <div class="email-subject">\${e.subject}</div>
                        \${summaryHtml}
                        <div onclick="const el = this.nextElementSibling; const isH = el.style.display === 'none'; el.style.display = isH ? 'block' : 'none'; this.querySelector('i').className = isH ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'; this.querySelector('span').innerText = isH ? 'E-Mail ausblenden' : 'Vollständige E-Mail anzeigen';" style="font-size: 11px; color: var(--text-secondary); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; font-weight: 600; user-select: none;">
                            <i class="fa-solid fa-chevron-down" style="font-size: 8px;"></i> <span>Vollständige E-Mail anzeigen</span>
                        </div>
                        <div class="email-body" style="display: none; margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px; font-size: 13px; color: var(--text-secondary); white-space: pre-wrap; word-break: break-word;">\${e.body || '(Kein Inhalt)'}</div>
                        \${attachmentsHtml}
\`;
                    list.appendChild(item);
                });
            } catch (err) {
                list.innerHTML = '<div style="font-size:13px; color:var(--color-red);">Fehler beim Laden der Mails.</div>';
            }
        }



        function renderTodos(client) {
            const list = document.getElementById('todo-list');
            list.innerHTML = '';
            
            // Migrate legacy notes to structured tasks
            if (client.notes && client.notes.trim() && (!client.todos || client.todos.length === 0)) {
                client.todos = [{ id: 'migrated_' + Date.now(), text: client.notes, done: false }];
                client.notes = ''; // Clear legacy note once migrated
                saveClientTodos(client);
            }

            const todos = client.todos || [];
            if (todos.length === 0) {
                list.innerHTML = '<li style="font-size: 13px; color: var(--text-secondary); text-align: left; padding: 4px 0;">Keine Aufgaben vorhanden.</li>';
                return;
            }

            todos.forEach(t => {
                const item = document.createElement('li');
                item.className = 'todo-item';
                item.style.cssText = \`display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:rgba(0,0,0,0.15); border:1px solid var(--border-color); border-radius:6px; font-size:13px; transition:all 0.2s; \${t.done ? 'opacity:0.6;' : ''}\`;
                
                item.innerHTML = \`
                    <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                        <div style="display:flex; align-items:center; gap:12px; flex:1; text-align: left;">
                            \${t.done 
                                ? \`<button onclick="toggleTodo('\${client.id}', '\${t.id}', false)" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 10px; padding: 2px 8px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight:600;" title="Aufgabe wiedereröffnen"><i class="fa-solid fa-circle-check"></i> Erledigt</button>\`
                                : \`<button onclick="toggleTodo('\${client.id}', '\${t.id}', true)" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 10px; padding: 2px 8px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight:700;" title="Als erledigt markieren"><i class="fa-solid fa-circle-exclamation"></i> Offen</button>\`
                            }
                            <span style="\${t.done ? 'text-decoration:line-through; color:var(--text-secondary);' : 'color:#fff;'}">\${t.text}</span>
                        </div>
                        <button onclick="deleteTodo('\${client.id}', '\${t.id}')" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:2px; opacity:0.8; display:inline-flex; align-items:center; margin-left:8px;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
\`;
                list.appendChild(item);
            });
        }

        async function addTodo() {
            if (!activeClient) return;
            const input = document.getElementById('new-todo-input');
            const text = input.value.trim();
            if (!text) return;

            activeClient.todos = activeClient.todos || [];
            activeClient.todos.push({
                id: 'todo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
                text: text,
                done: false
            });

            input.value = '';
            renderTodos(activeClient);
            await saveClientTodos(activeClient);
        }

        async function toggleTodo(clientId, todoId, checked) {
            if (!activeClient || activeClient.id !== clientId) return;
            activeClient.todos = activeClient.todos || [];
            const todo = activeClient.todos.find(t => t.id === todoId);
            if (todo) {
                todo.done = checked;
                renderTodos(activeClient);
                await saveClientTodos(activeClient);
            }
        }

        async function deleteTodo(clientId, todoId) {
            if (!activeClient || activeClient.id !== clientId) return;
            activeClient.todos = (activeClient.todos || []).filter(t => t.id !== todoId);
            renderTodos(activeClient);
            await saveClientTodos(activeClient);
        }

        async function saveClientTodos(client) {
            try {
                const res = await fetch('/api/kunden', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(client)
                });
                const data = await res.json();
                if (data.success) {
                    // Update cache
                    const idx = clients.findIndex(c => c.id === client.id);
                    if (idx !== -1) {
                        clients[idx] = data.customer;
                    }
                    if (activeClient && activeClient.id === client.id) {
                        activeClient.status = data.customer.status;
                        activeClient.statusReason = data.customer.statusReason;
                        activeClient.todos = data.customer.todos;
                        selectClient(activeClient);
                    }
                    await loadClients();
                }
            } catch(e) {
                console.error("Failed to save todos", e);
            }
        }

        async function toggleEmailResolve(clientId, emailId, isResolved) {
            try {
                const res = await fetch('/api/emails/resolve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ clientId, emailId, isResolved })
                });
                const data = await res.json();
                if (data.success) {
                    if (activeClient && activeClient.id === clientId) {
                        activeClient.status = data.customer.status;
                        activeClient.statusReason = data.customer.statusReason;
                        selectClient(activeClient);
                    }
                    await loadClients();
                } else {
                    alert('Fehler beim Ändern des E-Mail-Status: ' + data.error);
                }
            } catch(e) {
                alert('Netzwerkfehler beim Ändern des E-Mail-Status.');
            }
        }

        // Manual Status Switch
        async function toggleManualStatus() {
            if (!activeClient) return;
            const newStatus = activeClient.status === 'green' ? 'red' : 'green';
            const reason = newStatus === 'red' ? 'Manuell auf Rot gesetzt' : 'Manuell auf Grün gesetzt';

            activeClient.status = newStatus;
            activeClient.statusReason = reason;
            activeClient.manualOverride = true; // Always lock manual override so user choice is respected

            try {
                const res = await fetch('/api/kunden', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        ...activeClient, 
                        status: newStatus, 
                        statusReason: reason, 
                        manualOverride: true 
                    })
                });
                const data = await res.json();
                if (data.success) {
                    selectClient(data.customer);
                    await loadClients();
                }
            } catch(e) {
                alert("Status konnte nicht geändert werden.");
            }
        }

        // --- DRAG AND DROP / UPLOAD ---
        function initDragAndDrop() {
            const zone = document.getElementById('uploader-zone');
            
            window.addEventListener('dragover', e => e.preventDefault());
            window.addEventListener('drop', e => e.preventDefault());

            zone.addEventListener('dragenter', () => zone.classList.add('dragover'));
            zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
            zone.addEventListener('dragover', () => zone.classList.add('dragover'));
            
            zone.addEventListener('drop', e => {
                zone.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    performUpload(files[0]);
                }
            });
        }

        function triggerFileInput() {
            document.getElementById('contract-file-input').click();
        }

        function uploadContract(event) {
            const files = event.target.files;
            if (files.length > 0) {
                performUpload(files[0]);
            }
        }

        async function performUpload(file) {
            if (!activeClient) return;
            
            const uploaderText = document.getElementById('uploader-zone').querySelector('p');
            uploaderText.innerText = "Lade hoch... " + file.name;

            const fd = new FormData();
            fd.append('clientId', activeClient.id);
            fd.append('file', file);

            try {
                const res = await fetch('/api/contracts', {
                    method: 'POST',
                    body: fd
                });
                const data = await res.json();
                if (data.success) {
                    uploaderText.innerText = "Vertrag hochladen (PDF, Word...)";
                    loadClients(); // Reload
                } else {
                    alert("Fehler beim Upload: " + data.error);
                }
            } catch (e) {
                alert("Upload fehlgeschlagen.");
                uploaderText.innerText = "Vertrag hochladen (PDF, Word...)";
            }
        }

        // --- GUSTAV CHATBOT ---
        async function sendChatMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            if (!message) return;

            input.value = '';
            appendChatBubble(message, 'user');
            
            const typingBubble = appendChatBubble('Gustav überlegt...', 'gustav typing');

            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message,
                        clientId: activeClient ? activeClient.id : null
                    })
                });
                const data = await res.json();
                typingBubble.remove();
                appendChatBubble(data.response || data, 'gustav');
            } catch (err) {
                typingBubble.remove();
                appendChatBubble('Es gab leider einen Fehler bei meiner Abfrage. Bitte versuche es erneut.', 'gustav');
            }
        }

        function handleChatKey(event) {
            if (event.key === 'Enter') {
                sendChatMessage();
            }
        }

        function sendSuggestedChat(text) {
            document.getElementById('chat-input').value = text;
            sendChatMessage();
        }

        function sendClientSuggested() {
            if (!activeClient) return;
            sendSuggestedChat('Gib mir eine Zusammenfassung und den Status zu ' + activeClient.name);
        }

        function appendChatBubble(text, sender) {
            const history = document.getElementById('chat-history');
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble ' + sender;
            bubble.innerText = text;
            history.appendChild(bubble);
            history.scrollTop = history.scrollHeight;
            return bubble;
        }

        // --- CLIENT FORM MODAL ---
        function openAddClientModal() {
            document.getElementById('modal-title').innerText = "Kunde hinzufügen";
            document.getElementById('modal-client-id').value = "";
            document.getElementById('client-form').reset();
            document.getElementById('client-modal').style.display = 'flex';
        }

        function openEditClientModal() {
            if (!activeClient) return;
            document.getElementById('modal-title').innerText = "Kunde bearbeiten";
            document.getElementById('modal-client-id').value = activeClient.id;
            document.getElementById('modal-client-name').value = activeClient.name;
            document.getElementById('modal-client-email').value = activeClient.email || '';
            document.getElementById('modal-client-cf').value = activeClient.linkedCloudflareProject || '';
            document.getElementById('modal-client-domain').value = activeClient.customDomain || '';
            document.getElementById('client-modal').style.display = 'flex';
        }

        function closeClientModal() {
            document.getElementById('client-modal').style.display = 'none';
        }

        async function saveClient(event) {
            event.preventDefault();
            const id = document.getElementById('modal-client-id').value;
            const name = document.getElementById('modal-client-name').value;
            const email = document.getElementById('modal-client-email').value;
            const linkedCloudflareProject = document.getElementById('modal-client-cf').value;
            const customDomain = document.getElementById('modal-client-domain').value.trim();

            const payload = { name, email, linkedCloudflareProject, customDomain };
            if (id) payload.id = id;

            try {
                const res = await fetch('/api/kunden', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data.success) {
                    closeClientModal();
                    await loadClients();
                    if (!id) {
                        selectClient(data.customer); // Autoselect newly created
                    }
                }
            } catch(e) {
                alert("Fehler beim Speichern.");
            }
        }

        async function deleteClient() {
            if (!activeClient) return;
            if (!confirm(\`Möchtest du den Kunden "\${activeClient.name}" wirklich löschen? Alle Daten und Notizen gehen verloren.\`)) return;

            try {
                await fetch('/api/kunden/' + activeClient.id, { method: 'DELETE' });
                activeClient = null;
                document.getElementById('client-view').style.display = 'none';
                document.getElementById('welcome-screen').style.display = 'flex';
                document.getElementById('suggest-client-btn').style.display = 'none';
                loadClients();
            } catch(e) {
                alert("Kunde konnte nicht gelöscht werden.");
            }
        }

        // --- MOBILE DRAWER & NAV HELPERS ---
        function toggleMobileSidebar() {
            const sb = document.querySelector('.sidebar');
            const cp = document.querySelector('.chat-panel');
            const backdrop = document.getElementById('mobile-backdrop');
            if (!sb) return;

            if (cp) cp.classList.remove('mobile-open');

            const isOpen = sb.classList.toggle('mobile-open');
            if (backdrop) {
                if (isOpen) backdrop.classList.add('active');
                else backdrop.classList.remove('active');
            }
        }

        function toggleMobileChat() {
            const sb = document.querySelector('.sidebar');
            const cp = document.querySelector('.chat-panel');
            const backdrop = document.getElementById('mobile-backdrop');
            if (!cp) return;

            if (sb) sb.classList.remove('mobile-open');

            const isOpen = cp.classList.toggle('mobile-open');
            if (backdrop) {
                if (isOpen) backdrop.classList.add('active');
                else backdrop.classList.remove('active');
            }
        }

        function closeMobileDrawers() {
            const sb = document.querySelector('.sidebar');
            const cp = document.querySelector('.chat-panel');
            const backdrop = document.getElementById('mobile-backdrop');

            if (sb) sb.classList.remove('mobile-open');
            if (cp) cp.classList.remove('mobile-open');
            if (backdrop) backdrop.classList.remove('active');
        }

        function toggleChatCollapse() {
            const cp = document.querySelector('.chat-panel');
            const chevron = document.getElementById('chat-toggle-chevron');
            if (!cp) return;

            const isCollapsed = cp.classList.toggle('collapsed');
            
            localStorage.setItem('chat_collapsed', isCollapsed ? '1' : '0');

            if (chevron) {
                if (isCollapsed) {
                    chevron.className = 'fa-solid fa-chevron-left';
                } else {
                    chevron.className = 'fa-solid fa-chevron-right';
                }
            }
        }

        async function handleLogout() {
            if (!confirm('Möchtest du dich wirklich abmelden?')) return;
            document.cookie = "Authorization=; Path=/; Max-Age=0; SameSite=Lax";
            window.location.reload();
        }

        function updateMobileBottomNav(viewName) {
            document.querySelectorAll('.mobile-nav-item').forEach(btn => btn.classList.remove('active'));
            const btn = document.getElementById('mob-nav-' + viewName);
            if (btn) btn.classList.add('active');
            closeMobileDrawers();
        }

        function showView(viewName) {
            closeMobileDrawers();
            updateMobileBottomNav(viewName);

            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('client-view').style.display = 'none';
            document.getElementById('domains-screen').style.display = 'none';
            document.getElementById('mail-screen').style.display = 'none';
            const finScreen = document.getElementById('finanzen-screen');
            if (finScreen) finScreen.style.display = 'none';
            
            document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
            
            if (viewName === 'hub') {
                document.getElementById('welcome-screen').style.display = 'flex';
                document.getElementById('nav-btn-hub').classList.add('active');
            } else if (viewName === 'domains') {
                document.getElementById('domains-screen').style.display = 'flex';
                document.getElementById('nav-btn-domains').classList.add('active');
                loadCloudflareDomains();
            } else if (viewName === 'finanzen') {
                if (finScreen) finScreen.style.display = 'flex';
                const finBtn = document.getElementById('nav-btn-finanzen');
                if (finBtn) finBtn.classList.add('active');
                loadFinances();
            } else if (viewName === 'mail') {
                document.getElementById('mail-screen').style.display = 'flex';
                const mailBtn = document.getElementById('nav-btn-mail');
                if (mailBtn) mailBtn.classList.add('active');
                initMailScreen();
            }
        }

        // --- FINANZEN LOGIC ---
        let finTransactions = [];
        let finCurrentFilter = 'all';
        let finSelectedYear = new Date().getFullYear();
        let finMonthlyChartInstance = null;
        let finIncomesSplitChartInstance = null;
        let finCategoryChartInstance = null;
        let finIncomesCategoryChartInstance = null;

        async function loadFinances() {
            try {
                const res = await fetch('/api/finanzen');
                finTransactions = await res.json();
                updateFinanceYearView();
            } catch(e) {
                console.error("Failed to load finances", e);
            }
        }

        function prevFinanceYear() {
            finSelectedYear--;
            updateFinanceYearView();
        }

        function nextFinanceYear() {
            finSelectedYear++;
            updateFinanceYearView();
        }

        function updateFinanceYearView() {
            const display = document.getElementById('fin-selected-year-display');
            if (display) display.innerText = finSelectedYear;
            const label1 = document.getElementById('fin-selected-year-label');
            if (label1) label1.innerText = finSelectedYear;
            
            const profitYear = document.getElementById('fin-kpi-profit-year');
            if (profitYear) profitYear.innerText = finSelectedYear;

            document.querySelectorAll('.fin-cat-year-label-class').forEach(el => {
                el.innerText = finSelectedYear;
            });

            renderFinanceKPIs();
            renderFinanceTable();
            renderFinanceCharts();
        }

        // Helper to expand monthly recurring transactions up to current month
        function getExpandedTransactions() {
            const expanded = [];
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth(); // 0-indexed

            finTransactions.forEach(t => {
                const amt = parseFloat(t.amount) || 0;
                const vatIncluded = t.vatIncluded !== false; // default true
                const netto = vatIncluded ? amt / 1.19 : amt;
                const vat = vatIncluded ? amt - netto : 0;
                const brutto = amt;

                if (t.interval === 'monthly' && t.date) {
                    const parts = t.date.split('-');
                    const startYear = parseInt(parts[0]);
                    const startMonth = parseInt(parts[1]) - 1; // 0-indexed
                    const startDay = parts[2] || '01';

                    if (!isNaN(startYear) && !isNaN(startMonth)) {
                        let y = startYear;
                        let m = startMonth;

                        while (y < currentYear || (y === currentYear && m <= currentMonth)) {
                            const monthStr = String(m + 1).padStart(2, '0');
                            const genDate = y + '-' + monthStr + '-' + startDay;

                            expanded.push({
                                ...t,
                                id: t.id + '_' + y + '_' + monthStr,
                                originalId: t.id,
                                date: genDate,
                                netto,
                                vat,
                                brutto,
                                vatIncluded,
                                isAutoRecurring: (y !== startYear || m !== startMonth)
                            });

                            m++;
                            if (m > 11) {
                                m = 0;
                                y++;
                            }
                        }
                    } else {
                        expanded.push({ ...t, netto, vat, brutto, vatIncluded });
                    }
                } else {
                    expanded.push({ ...t, netto, vat, brutto, vatIncluded });
                }
            });

            return expanded.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        }

        function renderFinanceKPIs() {
            const expanded = getExpandedTransactions();
            const now = new Date();
            const monthNum = String(now.getMonth() + 1).padStart(2, '0');
            const currentMonthStr = now.getFullYear() + '-' + monthNum;
            const currentYearStr = String(now.getFullYear());

            let monthIncomes = 0;
            let monthExpenses = 0;
            let mrr = 0;
            let fixExpenses = 0;
            let ytdUmsatz = 0;

            let yearIncomes = 0;
            let yearExpenses = 0;

            expanded.forEach(t => {
                const brutto = t.brutto || 0;
                const isCurrentMonth = t.date && t.date.startsWith(currentMonthStr);
                const isCurrentYear = t.date && t.date.startsWith(currentYearStr);

                const tYear = t.date ? parseInt(t.date.split('-')[0]) : null;
                const isSelectedYear = tYear === finSelectedYear;

                if (t.type === 'income') {
                    if (isCurrentYear) ytdUmsatz += brutto;
                    if (isSelectedYear) yearIncomes += brutto;

                    if (isCurrentMonth) {
                        monthIncomes += brutto;
                        if (t.interval === 'monthly') mrr += brutto;
                    }
                } else if (t.type === 'expense') {
                    if (isSelectedYear) yearExpenses += brutto;

                    if (isCurrentMonth) {
                        monthExpenses += brutto;
                        if (t.interval === 'monthly') fixExpenses += brutto;
                    }
                }
            });

            const monthProfit = monthIncomes - monthExpenses;
            const yearProfit = yearIncomes - yearExpenses;
            const yearMargin = yearIncomes > 0 ? Math.round((yearProfit / yearIncomes) * 100) : 0;

            const formatEur = (val) => val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

            // Finanzen Screen KPI elements
            const incEl = document.getElementById('fin-kpi-incomes');
            if (incEl) incEl.innerText = formatEur(monthIncomes);
            const mrrEl = document.getElementById('fin-kpi-mrr');
            if (mrrEl) mrrEl.innerText = 'MRR: ' + formatEur(mrr) + ' / Mon.';

            const expEl = document.getElementById('fin-kpi-expenses');
            if (expEl) expEl.innerText = formatEur(monthExpenses);
            const fixEl = document.getElementById('fin-kpi-fix-expenses');
            if (fixEl) fixEl.innerText = 'Fixkosten: ' + formatEur(fixExpenses) + ' / Mon.';

            const profitEl = document.getElementById('fin-kpi-profit');
            if (profitEl) {
                profitEl.innerText = formatEur(yearProfit);
                profitEl.style.color = yearProfit >= 0 ? 'var(--color-green)' : 'var(--color-red)';
            }

            const marginEl = document.getElementById('fin-kpi-margin');
            if (marginEl) marginEl.innerText = 'Gewinnmarge: ' + yearMargin + '%';

            const ytdEl = document.getElementById('fin-kpi-ytd');
            if (ytdEl) ytdEl.innerText = formatEur(ytdUmsatz);
            const countEl = document.getElementById('fin-kpi-total-count');
            if (countEl) countEl.innerText = expanded.length + ' Transaktion(en)';

            // Dashboard / Command Center Finance Widget elements
            const dashInc = document.getElementById('dash-fin-incomes');
            if (dashInc) dashInc.innerText = formatEur(monthIncomes);
            const dashProfit = document.getElementById('dash-fin-profit');
            if (dashProfit) {
                dashProfit.innerText = formatEur(monthProfit);
                dashProfit.style.color = monthProfit >= 0 ? 'var(--color-green)' : 'var(--color-red)';
            }
            const dashMrr = document.getElementById('dash-fin-mrr');
            if (dashMrr) dashMrr.innerText = formatEur(mrr);
            const dashYtd = document.getElementById('dash-fin-ytd');
            if (dashYtd) dashYtd.innerText = formatEur(ytdUmsatz);
        }

        function filterTransactions(filter, btn) {
            finCurrentFilter = filter;
            document.querySelectorAll('.fin-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderFinanceTable();
        }

        function renderFinanceTable() {
            const tbody = document.getElementById('finances-table-body');
            if (!tbody) return;
            tbody.innerHTML = '';

            const expanded = getExpandedTransactions();
            let list = expanded;
            if (finCurrentFilter === 'income') list = list.filter(t => t.type === 'income');
            if (finCurrentFilter === 'expense') list = list.filter(t => t.type === 'expense');
            if (finCurrentFilter === 'monthly') list = list.filter(t => t.interval === 'monthly');

            if (list.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9" style="padding: 20px; text-align: center; color: var(--text-secondary);">Keine Transaktionen in dieser Kategorie vorhanden.</td></tr>';
                return;
            }

            list.forEach(t => {
                const tr = document.createElement('tr');
                tr.style.cssText = 'border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;';
                tr.onmouseover = () => tr.style.background = 'rgba(255,255,255,0.03)';
                tr.onmouseout = () => tr.style.background = 'transparent';

                const isIncome = t.type === 'income';
                const typeBadge = isIncome 
                    ? '<span style="color:#10b981; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); padding:2px 8px; border-radius:4px; font-weight:600; font-size:10px;">Einnahme</span>'
                    : '<span style="color:#ef4444; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); padding:2px 8px; border-radius:4px; font-weight:600; font-size:10px;">Ausgabe</span>';

                const intervalBadge = t.interval === 'monthly'
                    ? '<span style="color:#06b6d4; background:rgba(6,182,212,0.1); padding:2px 6px; border-radius:4px; font-size:10px;"><i class="fa-solid fa-repeat"></i> Monatlich' + (t.isAutoRecurring ? ' (Auto)' : '') + '</span>'
                    : '<span style="color:var(--text-secondary); font-size:10px;">Einmalig</span>';

                const fmtNum = (val) => (val || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

                const nettoFmt = (isIncome ? '+' : '-') + fmtNum(t.netto);
                const vatFmt = fmtNum(t.vat);
                const bruttoFmt = (isIncome ? '+' : '-') + fmtNum(t.brutto);
                const amtColor = isIncome ? '#10b981' : '#ef4444';

                const deleteId = t.originalId || t.id;

                tr.innerHTML = '<td style="padding: 10px;">' + typeBadge + '</td>' +
                    '<td style="padding: 10px; color: var(--text-secondary); font-size: 11px;">' + (t.date || '-') + '</td>' +
                    '<td style="padding: 10px; font-weight: 600; color: #fff;">' + (t.description || '') + '</td>' +
                    '<td style="padding: 10px; color: var(--text-secondary);">' + (t.category || 'Allgemein') + '</td>' +
                    '<td style="padding: 10px;">' + intervalBadge + '</td>' +
                    '<td style="padding: 10px; text-align: right; color: var(--text-secondary); font-family: var(--font-heading);">' + nettoFmt + '</td>' +
                    '<td style="padding: 10px; text-align: right; color: #a1a1aa; font-family: var(--font-heading); font-size: 11px;">' + vatFmt + '</td>' +
                    '<td style="padding: 10px; text-align: right; font-weight: 700; color: ' + amtColor + '; font-family: var(--font-heading);">' + bruttoFmt + '</td>' +
                    '<td style="padding: 10px; text-align: center;">' +
                        '<button data-del-id="' + deleteId + '" style="background:none; border:none; color:#ef4444; cursor:pointer; opacity:0.8;" title="Löschen"><i class="fa-solid fa-trash"></i></button>' +
                    '</td>';

                const delBtn = tr.querySelector('[data-del-id]');
                if (delBtn) {
                    delBtn.addEventListener('click', () => deleteTransaction(deleteId));
                }

                tbody.appendChild(tr);
            });
        }

        function renderFinanceCharts() {
            if (typeof Chart === 'undefined') return;

            const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
            const expanded = getExpandedTransactions();

            // Chart 1: Monthly Comparison for Selected Year (Einnahmen vs Ausgaben)
            const incomesData = new Array(12).fill(0);
            const expensesData = new Array(12).fill(0);

            expanded.forEach(t => {
                if (!t.date) return;
                const parts = t.date.split('-');
                const y = parseInt(parts[0]);
                const m = parseInt(parts[1]) - 1;
                if (y === finSelectedYear && !isNaN(m) && m >= 0 && m < 12) {
                    const brutto = t.brutto || 0;
                    if (t.type === 'income') incomesData[m] += brutto;
                    else if (t.type === 'expense') expensesData[m] += brutto;
                }
            });

            const ctxMonthly = document.getElementById('fin-chart-monthly');
            if (ctxMonthly) {
                if (finMonthlyChartInstance) finMonthlyChartInstance.destroy();
                finMonthlyChartInstance = new Chart(ctxMonthly, {
                    type: 'bar',
                    data: {
                        labels: months,
                        datasets: [
                            { label: 'Einnahmen (€)', data: incomesData, backgroundColor: 'rgba(16, 185, 129, 0.7)', borderColor: '#10b981', borderWidth: 1, borderRadius: 4 },
                            { label: 'Ausgaben (€)', data: expensesData, backgroundColor: 'rgba(239, 68, 68, 0.7)', borderColor: '#ef4444', borderWidth: 1, borderRadius: 4 }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { labels: { color: '#a1a1aa', font: { family: 'Outfit', size: 11 } } } },
                        scales: {
                            x: { ticks: { color: '#a1a1aa', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                            y: { ticks: { color: '#a1a1aa', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
                        }
                    }
                });
            }

            // Chart 2: Income Breakdown for Selected Year (Wiederkehrend MRR vs. Einmalig Projekte)
            const mrrIncomesData = new Array(12).fill(0);
            const onceIncomesData = new Array(12).fill(0);

            expanded.filter(t => t.type === 'income').forEach(t => {
                if (!t.date) return;
                const parts = t.date.split('-');
                const y = parseInt(parts[0]);
                const m = parseInt(parts[1]) - 1;
                if (y === finSelectedYear && !isNaN(m) && m >= 0 && m < 12) {
                    const brutto = t.brutto || 0;
                    if (t.interval === 'monthly') mrrIncomesData[m] += brutto;
                    else onceIncomesData[m] += brutto;
                }
            });

            const ctxSplit = document.getElementById('fin-chart-incomes-split');
            if (ctxSplit) {
                if (finIncomesSplitChartInstance) finIncomesSplitChartInstance.destroy();
                finIncomesSplitChartInstance = new Chart(ctxSplit, {
                    type: 'bar',
                    data: {
                        labels: months,
                        datasets: [
                            { label: 'Wiederkehrend (MRR)', data: mrrIncomesData, backgroundColor: 'rgba(6, 182, 212, 0.75)', borderColor: '#06b6d4', borderWidth: 1, borderRadius: 4 },
                            { label: 'Einmalig (Projekte)', data: onceIncomesData, backgroundColor: 'rgba(59, 130, 246, 0.75)', borderColor: '#3b82f6', borderWidth: 1, borderRadius: 4 }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { labels: { color: '#a1a1aa', font: { family: 'Outfit', size: 11 } } } },
                        scales: {
                            x: { ticks: { color: '#a1a1aa', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                            y: { ticks: { color: '#a1a1aa', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
                        }
                    }
                });
            }

            // Chart 3: Expense Category Breakdown for Selected Year
            const catMap = {};
            let totalYearExpenses = 0;

            expanded.filter(t => t.type === 'expense').forEach(t => {
                if (!t.date) return;
                const parts = t.date.split('-');
                const y = parseInt(parts[0]);
                if (y === finSelectedYear) {
                    const cat = t.category || 'Büro & Sonstiges';
                    const amt = t.brutto || 0;
                    catMap[cat] = (catMap[cat] || 0) + amt;
                    totalYearExpenses += amt;
                }
            });

            // Chart 4: Income Category Breakdown for Selected Year
            const incomeCatMap = {};
            let totalYearIncomes = 0;

            expanded.filter(t => t.type === 'income').forEach(t => {
                if (!t.date) return;
                const parts = t.date.split('-');
                const y = parseInt(parts[0]);
                if (y === finSelectedYear) {
                    const cat = t.category || 'Webdesign & Entwicklung';
                    const amt = t.brutto || 0;
                    incomeCatMap[cat] = (incomeCatMap[cat] || 0) + amt;
                    totalYearIncomes += amt;
                }
            });

            const formatEur = (val) => val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
            const fmtNum = (val) => (val || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

            // Update Big Total Expense KPI & Avg Monthly Expense
            const totalExpEl = document.getElementById('fin-cat-total-expenses');
            if (totalExpEl) totalExpEl.innerText = formatEur(totalYearExpenses);
            const avgExpEl = document.getElementById('fin-cat-avg-expense');
            if (avgExpEl) avgExpEl.innerText = 'Ø ' + formatEur(totalYearExpenses / 12) + ' / Mon.';

            // Update Big Total Income KPI & Avg Monthly Income
            const totalIncEl = document.getElementById('fin-cat-total-incomes');
            if (totalIncEl) totalIncEl.innerText = formatEur(totalYearIncomes);
            const avgIncEl = document.getElementById('fin-cat-avg-income');
            if (avgIncEl) avgIncEl.innerText = 'Ø ' + formatEur(totalYearIncomes / 12) + ' / Mon.';

            // Reusable Category Breakdown Render function with collapsible booking details
            const renderCategoryBreakdown = (containerId, type, catData, totalAmt, colors) => {
                const container = document.getElementById(containerId);
                if (!container) return;
                container.innerHTML = '';

                const entries = Object.entries(catData).sort((a, b) => b[1] - a[1]);
                if (entries.length === 0) {
                    const emptyText = type === 'income' ? 'Keine Einnahmen im Jahr ' : 'Keine Ausgaben im Jahr ';
                    container.innerHTML = '<div style="font-size: 13px; color: var(--text-secondary); padding: 12px; text-align: center;">' + emptyText + finSelectedYear + '</div>';
                    return;
                }

                entries.forEach(([catName, amt], idx) => {
                    const pct = totalAmt > 0 ? Math.round((amt / totalAmt) * 100) : 0;
                    const col = colors[idx % colors.length];

                    const item = document.createElement('div');
                    item.style.cssText = 'display: flex; flex-direction: column; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 4px; overflow: hidden;';

                    const header = document.createElement('div');
                    header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; cursor: pointer; transition: background 0.2s;';
                    header.onmouseover = () => header.style.background = 'rgba(255,255,255,0.02)';
                    header.onmouseout = () => header.style.background = 'transparent';

                    header.innerHTML = '<span style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #fff;">' +
                            '<span style="width: 8px; height: 8px; border-radius: 50%; background: ' + col + '; display: inline-block;"></span> ' + catName +
                            ' <i class="fa-solid fa-chevron-down" style="font-size: 9px; color: var(--text-secondary); transition: transform 0.2s; margin-left: 2px;"></i>' +
                        '</span>' +
                        '<div style="text-align: right;"><strong style="font-size: 12px; color: #fff; font-family: var(--font-heading);">' + formatEur(amt) + '</strong> <span style="font-size: 10px; color: var(--text-secondary); margin-left: 6px;">(' + pct + '%)</span></div>';

                    const details = document.createElement('div');
                    details.style.cssText = 'display: none; border-top: 1px solid rgba(255,255,255,0.03); background: rgba(0,0,0,0.15); padding: 8px 12px; max-height: 180px; overflow-y: auto;';

                    const defaultCat = type === 'income' ? 'Webdesign & Entwicklung' : 'Büro & Sonstiges';
                    const categoryTx = expanded.filter(t => t.type === type && (t.category || defaultCat) === catName && t.date && parseInt(t.date.split('-')[0]) === finSelectedYear);

                    if (categoryTx.length === 0) {
                        details.innerHTML = '<div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 6px;">Keine Buchungen gefunden.</div>';
                    } else {
                        categoryTx.sort((a, b) => b.date.localeCompare(a.date));
                        let txHtml = '<table style="width: 100%; border-collapse: collapse; font-size: 11px; color: var(--text-secondary);">';
                        categoryTx.forEach(tx => {
                            const sign = type === 'income' ? '+' : '-';
                            const amtColor = type === 'income' ? '#10b981' : '#ef4444';
                            const displayAmt = fmtNum(tx.brutto);
                            const recurringLabel = tx.interval === 'monthly' ? ' <i class="fa-solid fa-repeat" style="color: var(--color-cyan); margin-left: 4px;" title="Monatlich wiederkehrend"></i>' : '';
                            txHtml += '<tr style="border-bottom: 1px solid rgba(255,255,255,0.02);">' +
                                '<td style="padding: 6px 4px; color: var(--text-muted); width: 75px;">' + tx.date + '</td>' +
                                '<td style="padding: 6px 4px; font-weight: 500; color: var(--text-primary);">' + tx.description + recurringLabel + '</td>' +
                                '<td style="padding: 6px 4px; text-align: right; font-weight: 600; color: ' + amtColor + '; font-family: var(--font-heading); width: 85px;">' + sign + displayAmt + '</td>' +
                            '</tr>';
                        });
                        txHtml += '</table>';
                        details.innerHTML = txHtml;
                    }

                    item.appendChild(header);
                    item.appendChild(details);

                    header.addEventListener('click', () => {
                        const isShowing = details.style.display === 'block';
                        details.style.display = isShowing ? 'none' : 'block';
                        const chevron = header.querySelector('.fa-chevron-down');
                        if (chevron) {
                            chevron.style.transform = isShowing ? 'rotate(180deg)' : 'rotate(0deg)';
                        }
                    });

                    container.appendChild(item);
                });
            };

            // Render Income breakdown
            const incomeColors = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'];
            renderCategoryBreakdown('fin-category-breakdown-list-income', 'income', incomeCatMap, totalYearIncomes, incomeColors);

            // Render Expense breakdown
            const expenseColors = ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#f43f5e', '#6b7280'];
            renderCategoryBreakdown('fin-category-breakdown-list', 'expense', catMap, totalYearExpenses, expenseColors);

            // Render Expense Doughnut Chart
            const catLabels = Object.keys(catMap);
            const catValues = Object.values(catMap);

            const ctxCat = document.getElementById('fin-chart-categories');
            if (ctxCat) {
                if (finCategoryChartInstance) finCategoryChartInstance.destroy();
                finCategoryChartInstance = new Chart(ctxCat, {
                    type: 'doughnut',
                    data: {
                        labels: catLabels.length > 0 ? catLabels : ['Keine Ausgaben'],
                        datasets: [{
                            data: catValues.length > 0 ? catValues : [1],
                            backgroundColor: expenseColors,
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } }
                    }
                });
            }

            // Render Income Doughnut Chart
            const incomeLabels = Object.keys(incomeCatMap);
            const incomeValues = Object.values(incomeCatMap);

            const ctxIncomeCat = document.getElementById('fin-chart-categories-income');
            if (ctxIncomeCat) {
                if (finIncomesCategoryChartInstance) finIncomesCategoryChartInstance.destroy();
                finIncomesCategoryChartInstance = new Chart(ctxIncomeCat, {
                    type: 'doughnut',
                    data: {
                        labels: incomeLabels.length > 0 ? incomeLabels : ['Keine Einnahmen'],
                        datasets: [{
                            data: incomeValues.length > 0 ? incomeValues : [1],
                            backgroundColor: incomeColors,
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } }
                    }
                });
            }
        }

        function openTransactionModal() {
            document.getElementById('tx-id').value = '';
            document.getElementById('tx-form').reset();
            document.getElementById('tx-date').value = new Date().toISOString().split('T')[0];
            const vatCheck = document.getElementById('tx-vat-included');
            if (vatCheck) vatCheck.checked = true;
            document.getElementById('transaction-modal').style.display = 'flex';
        }

        function closeTransactionModal() {
            document.getElementById('transaction-modal').style.display = 'none';
        }

        async function saveTransaction(event) {
            event.preventDefault();
            const vatCheck = document.getElementById('tx-vat-included');
            const payload = {
                id: document.getElementById('tx-id').value || undefined,
                type: document.getElementById('tx-type').value,
                description: document.getElementById('tx-desc').value.trim(),
                amount: parseFloat(document.getElementById('tx-amount').value),
                date: document.getElementById('tx-date').value,
                category: document.getElementById('tx-category').value,
                interval: document.getElementById('tx-interval').value,
                vatIncluded: vatCheck ? vatCheck.checked : true
            };

            try {
                const res = await fetch('/api/finanzen', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data.success) {
                    closeTransactionModal();
                    await loadFinances();
                } else {
                    alert('Fehler beim Speichern: ' + data.error);
                }
            } catch(e) {
                alert('Netzwerkfehler beim Speichern der Transaktion.');
            }
        }

        async function deleteTransaction(id) {
            if (!confirm('Transaktion wirklich löschen?')) return;
            try {
                const res = await fetch('/api/finanzen/' + id, { method: 'DELETE' });
                const data = await res.json();
                if (data.success) {
                    await loadFinances();
                }
            } catch(e) {
                alert('Fehler beim Löschen der Transaktion.');
            }
        }

        function exportFinancesCSV(typeFilter = 'all') {
            const expanded = getExpandedTransactions();
            let list = expanded;
            if (typeFilter === 'income') list = list.filter(t => t.type === 'income');
            if (typeFilter === 'expense') list = list.filter(t => t.type === 'expense');

            if (list.length === 0) {
                alert('Keine Finanzdaten für diesen Export vorhanden.');
                return;
            }

            // UTF-8 BOM for Microsoft Excel German compatibility
            let csvContent = '\\uFEFF';
            csvContent += 'Typ;Datum;Beschreibung;Kategorie;Intervall;Netto (EUR);19% MwSt (EUR);Brutto (EUR)\\n';

            let sumNetto = 0;
            let sumVat = 0;
            let sumBrutto = 0;

            const fmtCsvNum = (num) => (num || 0).toFixed(2).replace('.', ',');

            list.forEach(t => {
                const typStr = t.type === 'income' ? 'Einnahme' : 'Ausgabe';
                const intervalStr = t.interval === 'monthly' ? 'Monatlich' : 'Einmalig';
                const descStr = '"' + (t.description || '').replace(/"/g, '""') + '"';
                const catStr = '"' + (t.category || '').replace(/"/g, '""') + '"';

                const nettoVal = t.netto || 0;
                const vatVal = t.vat || 0;
                const bruttoVal = t.brutto || 0;

                sumNetto += nettoVal;
                sumVat += vatVal;
                sumBrutto += bruttoVal;

                csvContent += typStr + ';' + t.date + ';' + descStr + ';' + catStr + ';' + intervalStr + ';' + fmtCsvNum(nettoVal) + ';' + fmtCsvNum(vatVal) + ';' + fmtCsvNum(bruttoVal) + '\\n';
            });

            // Add Summenzeile at bottom for Steuerberater
            csvContent += '\\n"GESAMTSUMME (Steuerberater)";"";"";"";"";"' + fmtCsvNum(sumNetto) + '";"' + fmtCsvNum(sumVat) + '";"' + fmtCsvNum(sumBrutto) + '"\\n';

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            const dateSuffix = new Date().toISOString().split('T')[0];
            const filename = 'scholz_friese_finanzen_' + typeFilter + '_' + dateSuffix + '.csv';
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // --- CLOUDFLARE DOMAINS FETCH ---
        async function loadCloudflareDomains() {
            const tbody = document.getElementById('domains-table-body');
            const countBadge = document.getElementById('domains-page-count');
            
            if (!tbody) return;
            tbody.innerHTML = '<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-secondary);">Lade Cloudflare Domains...</td></tr>';
            
            try {
                const res = await fetch('/api/cloudflare/domains');
                const data = await res.json();
                
                if (data.error) {
                    tbody.innerHTML = \`<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--color-red);">Cloudflare API Fehler: \${data.error}</td></tr>\`;
                    return;
                }
                
                const portfolio = data.result || [];
                if (countBadge) countBadge.innerText = \`\${portfolio.length} Zonen\`;
                
                if (portfolio.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-secondary);">Keine Domains gefunden.</td></tr>';
                    return;
                }
                
                window.cfDomainsCache = portfolio;
                renderDomainsTable(portfolio);
            } catch(e) {
                tbody.innerHTML = '<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--color-red);">Fehler bei der Cloudflare-Abfrage.</td></tr>';
            }
        }

        function renderDomainsTable(list) {
            const tbody = document.getElementById('domains-table-body');
            if (!tbody) return;
            tbody.innerHTML = '';
            
            list.forEach(d => {
                const tr = document.createElement('tr');
                tr.className = 'domain-table-row';
                tr.style.borderBottom = '1px solid var(--border-color)';
                
                const statusText = d.status === 'active' ? 'Aktiv' : d.status;
                const statusColor = d.status === 'active' ? 'var(--color-green)' : 'var(--color-red)';
                const statusBg = d.status === 'active' ? 'var(--color-green-glow)' : 'var(--color-red-glow)';
                
                const ns = (d.name_servers || []).slice(0, 2).join(', ') || '-';
                
                tr.innerHTML = \`
                    <td style="padding: 16px 24px; font-weight: 600; color: var(--text-primary);">\${d.name}</td>
                    <td style="padding: 16px 24px;">
                        <span style="font-size: 11px; color: \${statusColor}; background: \${statusBg}; padding: 4px 8px; border-radius: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.02);">\${statusText}</span>
                    </td>
                    <td style="padding: 16px 24px; color: var(--text-secondary); text-transform: uppercase; font-size: 12px; font-weight: 600;">\${d.type}</td>
                    <td style="padding: 16px 24px; color: var(--text-secondary); font-family: monospace; font-size: 12px;">\${ns}</td>
                    <td style="padding: 16px 24px; text-align: right;">
                        <a href="https://\${d.name}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 12px; display: inline-flex; width: auto; background: rgba(243, 128, 32, 0.05); border-color: rgba(243, 128, 32, 0.2); color: #f38020;">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live-Seite
                        </a>
                    </td>
                \`;
                tbody.appendChild(tr);
            });
        }

        function filterDomains() {
            const q = document.getElementById('domain-search').value.toLowerCase();
            if (!window.cfDomainsCache) return;
            const filtered = window.cfDomainsCache.filter(d => d.name.toLowerCase().includes(q));
            renderDomainsTable(filtered);
        }

        // --- GLOBAL STATS ---
        function updateGlobalStats() {
            const okCount = clients.filter(c => c.status === 'green').length;
            const redCount = clients.filter(c => c.status === 'red').length;
            
            const okEl = document.getElementById('stats-ok');
            const redEl = document.getElementById('stats-red');
            if (okEl) okEl.innerText = okCount;
            if (redEl) redEl.innerText = redCount;
            
            const dateEl = document.getElementById('live-date');
            if (dateEl) {
                const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateEl.innerText = new Date().toLocaleDateString('de-DE', dateOptions);
            }

            const ringEl = document.getElementById('status-glow-ring');
            const ringIcon = document.getElementById('status-ring-icon');
            const statusTitle = document.getElementById('status-title-center');
            const statusDesc = document.getElementById('status-desc-center');
            const alertsList = document.getElementById('alerts-center-list');

            if (ringEl && ringIcon && statusTitle && statusDesc) {
                if (redCount > 0) {
                    ringEl.style.borderColor = 'var(--color-red)';
                    ringEl.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
                    ringEl.style.animation = 'pulse-red 2s infinite';
                    ringIcon.className = 'fa-solid fa-triangle-exclamation';
                    ringIcon.style.color = 'var(--color-red)';
                    
                    statusTitle.innerText = \`\${redCount} Aktion(en) ausstehend\`;
                    statusDesc.innerText = 'Es gibt Kunden-E-Mails oder offene Anfragen, auf die wir reagieren müssen.';
                } else {
                    ringEl.style.borderColor = 'var(--color-green)';
                    ringEl.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
                    ringEl.style.animation = 'none';
                    ringIcon.className = 'fa-solid fa-check';
                    ringIcon.style.color = 'var(--color-green)';
                    
                    statusTitle.innerText = 'Alle Systeme nominal';
                    statusDesc.innerText = 'Sämtliche Kunden-Websites laufen stabil. Keine offenen Support-Mails ausstehend.';
                }
            }

            if (alertsList) {
                alertsList.innerHTML = '';
                const redClients = clients.filter(c => c.status === 'red');
                if (redClients.length === 0) {
                    alertsList.innerHTML = \`
                        <div style="font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box;">
                            <i class="fa-solid fa-circle-check" style="color: var(--color-green);"></i>
                            Keine ausstehenden Alarme. Großartige Arbeit!
                        </div>
                    \`;
                } else {
                    redClients.forEach(c => {
                        const alertItem = document.createElement('div');
                        alertItem.className = 'drive-item';
                        alertItem.style.background = 'rgba(239, 68, 68, 0.05)';
                        alertItem.style.borderColor = 'rgba(239, 68, 68, 0.15)';
                        alertItem.style.padding = '12px';
                        alertItem.style.display = 'flex';
                        alertItem.style.alignItems = 'center';
                        alertItem.style.justifyContent = 'space-between';
                        alertItem.style.cursor = 'pointer';
                        alertItem.style.marginBottom = '8px';
                        alertItem.onclick = () => selectClient(c);
                        
                        alertItem.innerHTML = \`
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-red);"></i>
                                <div>
                                    <strong style="color: var(--text-primary); font-size: 13px;">\${c.name}</strong>
                                    <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">\${c.statusReason || 'Aktion nötig'}</div>
                                </div>
                            </div>
                            <span style="font-size: 10px; color: var(--color-red); font-weight: 700; background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Aktion</span>
                        \`;
                        alertsList.appendChild(alertItem);
                    });
                }
            }
        }

        // --- IMAP SETTINGS ---
        function addImapAccountRow(data = { host: 'mail.hostinger.com', port: 993, email: '', password: '' }) {
            const container = document.getElementById('imap-accounts-list');
            const rowId = 'imap-row-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
            
            const card = document.createElement('div');
            card.id = rowId;
            card.className = 'card';
            card.style.padding = '16px';
            card.style.background = 'rgba(255, 255, 255, 0.02)';
            card.style.borderColor = 'var(--border-color)';
            card.style.position = 'relative';
            card.style.gap = '12px';
            card.style.marginBottom = '8px';
            
            card.innerHTML = \`
                <button type="button" onclick="document.getElementById('\${rowId}').remove()" style="position: absolute; right: 12px; top: 12px; background: none; border: none; color: var(--color-red); cursor: pointer; font-size: 16px;" title="Konto löschen">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-right: 24px;">
                    <div class="form-group">
                        <label>IMAP Server *</label>
                        <input type="text" class="imap-host" required value="\${data.host}" placeholder="mail.hostinger.com">
                    </div>
                    <div class="form-group">
                        <label>IMAP Port *</label>
                        <input type="number" class="imap-port" required value="\${data.port}" placeholder="993">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-right: 24px;">
                    <div class="form-group">
                        <label>E-Mail-Adresse *</label>
                        <input type="email" class="imap-email" required value="\${data.email}" placeholder="info@scholz-friese-webdesign.de">
                    </div>
                    <div class="form-group">
                        <label>Passwort *</label>
                        <input type="password" class="imap-pwd" required value="\${data.password}" placeholder="Passwort eingeben">
                    </div>
                </div>
            \`;
            container.appendChild(card);
        }

        async function loadImapSettings() {
            try {
                const res = await fetch('/api/settings/imap');
                const data = await res.json();
                const statusEl = document.getElementById('imap-status-indicator');
                const checkDot = document.getElementById('imap-check-dot');
                
                document.getElementById('imap-accounts-list').innerHTML = '';
                
                if (data.configured) {
                    if (data.accounts && data.accounts.length > 0) {
                        data.accounts.forEach(acc => {
                            addImapAccountRow(acc);
                        });
                        if (statusEl) statusEl.innerHTML = \`<span style="color:var(--color-green); font-weight:600;"><i class="fa-solid fa-circle-check"></i> \${data.accounts.length} E-Mail-Konto(e) eingerichtet</span>\`;
                    } else {
                        addImapAccountRow();
                        if (statusEl) statusEl.innerHTML = \`<span style="color:var(--color-green); font-weight:600;"><i class="fa-solid fa-circle-check"></i> Webhook-Integration aktiv</span>\`;
                    }
                    if (checkDot) {
                        checkDot.className = 'status-dot green';
                        checkDot.style.boxShadow = '0 0 6px var(--color-green)';
                    }
                } else {
                    addImapAccountRow();
                    if (statusEl) statusEl.innerHTML = '<span style="color:var(--color-cyan); font-weight:600;"><i class="fa-solid fa-circle-info"></i> Kein E-Mail-Konto eingerichtet</span>';
                    if (checkDot) {
                        checkDot.className = 'status-dot red';
                        checkDot.style.boxShadow = '0 0 6px var(--color-red)';
                    }
                }
            } catch(e) {
                console.error("Failed to load IMAP settings", e);
            }
        }

        async function updateSystemChecklist() {
            try {
                const res = await fetch('/api/system/status');
                const data = await res.json();
                
                const cfApiDot = document.getElementById('cf-api-check-dot');
                const imapDot = document.getElementById('imap-check-dot');
                const r2Dot = document.getElementById('r2-check-dot');
                const aiDot = document.getElementById('ai-check-dot');
                const statusPageDot = document.getElementById('cf-status-page-dot');

                const setDot = (el, color) => {
                    if (!el) return;
                    el.className = 'status-dot ' + color;
                    el.style.boxShadow = '0 0 6px var(--color-' + color + ')';
                };

                setDot(cfApiDot, data.cloudflare);
                setDot(imapDot, data.imap);
                setDot(r2Dot, data.r2);
                setDot(aiDot, data.ai);

                // Cloudflare status page check
                let statusColor = 'green';
                let tooltipText = data.cfStatusPage.description;
                if (data.cfStatusPage.indicator === 'minor') {
                    statusColor = 'orange';
                } else if (data.cfStatusPage.indicator === 'major' || data.cfStatusPage.indicator === 'critical') {
                    statusColor = 'red';
                }
                setDot(statusPageDot, statusColor);
                if (statusPageDot) {
                    statusPageDot.parentElement.setAttribute('title', tooltipText);
                }
            } catch(e) {
                console.error("Failed to update system checklist", e);
            }
        }

        async function submitImapSettings() {
            const container = document.getElementById('imap-accounts-list');
            const cards = container.children;
            const accounts = [];
            
            for (let card of cards) {
                const hostInput = card.querySelector('.imap-host');
                const portInput = card.querySelector('.imap-port');
                const emailInput = card.querySelector('.imap-email');
                const pwdInput = card.querySelector('.imap-pwd');
                
                if (!hostInput || !portInput || !emailInput || !pwdInput) continue;
                
                const host = hostInput.value.trim();
                const port = parseInt(portInput.value.trim());
                const email = emailInput.value.trim();
                const password = pwdInput.value.trim();
                
                if (!host || !email || !password) {
                    alert('Bitte alle Pflichtfelder (*) für alle Konten ausfüllen!');
                    return;
                }
                
                accounts.push({ host, port, email, password });
            }
            
            // We now allow saving an empty accounts array to switch to Webhook-only mode

            const btn = document.getElementById('imap-save-btn');
            btn.innerText = 'Speichere...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/settings/imap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(accounts)
                });
                const data = await res.json();
                if (data.success) {
                    closeImapModal();
                    await loadImapSettings();
                    alert('IMAP-Einstellungen erfolgreich gespeichert!');
                } else {
                    alert('Fehler beim Speichern: ' + data.error);
                }
            } catch(e) {
                alert('Fehler beim Speichern der Einstellungen.');
            } finally {
                btn.innerText = 'Speichern';
                btn.disabled = false;
            }
        }

        async function syncEmails(silent = false) {
            const syncBtn = document.querySelector('.email-card button');
            const origContent = syncBtn ? syncBtn.innerHTML : '';
            if (syncBtn && !silent) {
                syncBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Synchronisiere...';
                syncBtn.disabled = true;
            }

            try {
                const res = await fetch('/api/emails/sync', { method: 'POST' });
                const data = await res.json();
                if (data.success) {
                    if (!silent) {
                        alert(data.syncedCount + ' neue E-Mail(s) synchronisiert!');
                    }
                    await loadClients();
                } else {
                    if (!silent) {
                        if (data.error && data.error.includes('Stream was cancelled')) {
                            alert('⚠️ Verbindung von Hostinger blockiert\\n\\nDein E-Mail-Provider (Hostinger) blockiert aus Sicherheitsgründen direkte Verbindungen von Cloudflare-Servern.\\n\\nEmpfohlene Lösung:\\nNutze die automatische E-Mail-Weiterleitung über Webhooks. Leite deine Mails einfach an folgende Webhook-URL weiter:\\nhttps://gustav.friese-scholz.workers.dev/api/webhooks/email\\n\\nDieser Webhook läuft absolut stabil, ist voll funktionsfähig und importiert deine E-Mails sofort und ohne Blockade!');
                        } else if (data.error && data.error.includes('No IMAP accounts configured')) {
                            alert('ℹ️ Webhook-Integration aktiv\\n\\nDa du keine IMAP-Konten eingetragen hast, ist Gustav im Webhook-Modus. E-Mails werden vollautomatisch und in Echtzeit empfangen, sobald sie ankommen oder gesendet werden (BCC).\\n\\nEin manuelles Abrufen ist nicht notwendig!');
                        } else {
                            alert('Fehler bei der Synchronisierung: ' + data.error);
                        }
                    }
                }
            } catch(e) {
                if (!silent) {
                    alert('Synchronisierung fehlgeschlagen. Bitte prüfe deine IMAP-Einstellungen.');
                }
            } finally {
                if (syncBtn && !silent) {
                    syncBtn.innerHTML = origContent;
                    syncBtn.disabled = false;
                }
            }
        }

        function openImapModal() {
            document.getElementById('imap-modal').style.display = 'flex';
        }

        function closeImapModal() {
            document.getElementById('imap-modal').style.display = 'none';
        }
    </script>
</body>
</html>`;
