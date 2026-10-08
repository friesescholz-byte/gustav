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

        .mail-header-bar {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto 30px auto;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 20px;
            box-sizing: border-box;
        }
        .mail-form-grid {
            display: grid;
            grid-template-columns: 1.2fr 1.2fr 2fr;
            gap: 20px;
        }
        .mail-form-card {
            background: rgba(17, 24, 39, 0.4);
            border-color: var(--border-color);
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        @media (max-width: 768px) {
            #mail-screen {
                padding: 16px 16px 140px 16px !important;
            }
            .mail-header-bar {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }
            .mail-form-grid {
                grid-template-columns: 1fr !important;
                gap: 15px;
            }
            .mail-form-card {
                padding: 16px 16px 30px 16px !important;
                gap: 15px;
                margin-bottom: 40px !important;
            }
            #mail-body {
                height: 180px !important;
            }
            .mail-send-bar {
                flex-direction: column-reverse !important;
                align-items: stretch !important;
                gap: 12px !important;
            }
            #btn-send-mail {
                width: 100% !important;
                justify-content: center !important;
            }
        }

        .routing-tab-btn {
            background: none;
            border: 1px solid transparent;
            color: var(--text-secondary);
            font-size: 13.5px;
            font-weight: 700;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 8px;
            transition: var(--transition-smooth);
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .routing-tab-btn:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.04);
        }
        .routing-tab-btn.active {
            color: #fff;
            background: rgba(6, 182, 212, 0.12);
            border-color: rgba(6, 182, 212, 0.35);
            box-shadow: 0 0 12px rgba(6, 182, 212, 0.15);
        }
        .routing-frame-container {
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            flex-grow: 1;
            height: calc(100vh - 190px);
            min-height: 560px;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            background: #080A0F;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            position: relative;
        }

        .mail-tab-btn {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 14.5px;
            font-weight: 600;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 8px;
            transition: var(--transition-smooth);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 1px solid transparent;
        }
        .mail-tab-btn:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.03);
        }
        .mail-tab-btn.active {
            color: #fff;
            background: rgba(6, 182, 212, 0.1);
            border-color: rgba(6, 182, 212, 0.3);
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
        }
        .mail-log-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13.5px;
        }
        .mail-log-table th {
            padding: 14px 16px;
            color: var(--text-secondary);
            font-weight: 700;
            border-bottom: 1.5px solid var(--border-color);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .mail-log-table td {
            padding: 14px 16px;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-primary);
        }
        .mail-log-table tr:hover td {
            background: rgba(255, 255, 255, 0.01);
        }
        .mail-log-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 11.5px;
            font-weight: 700;
            padding: 4px 9px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
        }
        .mail-log-badge.delivered {
            background: rgba(16, 185, 129, 0.12);
            color: var(--color-green);
            border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .mail-log-badge.sent {
            background: rgba(56, 189, 248, 0.12);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.25);
        }
        .mail-log-badge.opened {
            background: rgba(192, 132, 252, 0.12);
            color: #c084fc;
            border: 1px solid rgba(192, 132, 252, 0.3);
        }
        .mail-log-badge.clicked {
            background: rgba(251, 191, 36, 0.12);
            color: #fbbf24;
            border: 1px solid rgba(251, 191, 36, 0.3);
        }
        .mail-log-badge.failed, .mail-log-badge.bounced, .mail-log-badge.complained {
            background: rgba(239, 68, 68, 0.12);
            color: var(--color-red);
            border: 1px solid rgba(239, 68, 68, 0.25);
        }
        .mail-log-badge.delayed, .mail-log-badge.delivery_delayed, .mail-log-badge.other {
            background: rgba(245, 158, 11, 0.12);
            color: #f59e0b;
            border: 1px solid rgba(245, 158, 11, 0.25);
        }
        .mail-preview-modal-body {
            display: flex;
            flex-direction: column;
            gap: 16px;
            height: 100%;
        }
        .mail-preview-header-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            background: rgba(0,0,0,0.2);
            padding: 14px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            font-size: 13.5px;
        }
        .mail-preview-iframe-container {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
            flex-grow: 1;
            height: 480px;
        }
        .mail-preview-iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: #fff;
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

        /* ========================================================= */
        /* --- PRO MAX MOBILE & RESPONSIVE DESIGN SYSTEM --- */
        /* ========================================================= */
        
        .mobile-header {
            display: none;
            height: 54px;
            background: rgba(13, 18, 32, 0.95);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-color);
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 900;
        }

        .mobile-toggle-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            width: 38px;
            height: 38px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            cursor: pointer;
            transition: var(--transition-smooth);
        }
        .mobile-toggle-btn:active {
            transform: scale(0.95);
            background: rgba(59, 130, 246, 0.2);
        }

        .mobile-bottom-nav {
            display: none;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            height: 60px;
            padding-bottom: env(safe-area-inset-bottom, 0px);
            background: rgba(13, 18, 32, 0.96);
            border-top: 1px solid var(--border-color);
            z-index: 900;
            align-items: center;
            justify-content: space-around;
            backdrop-filter: blur(20px);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.5);
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
            padding: 6px 8px;
            border-radius: 8px;
            transition: var(--transition-smooth);
            min-width: 48px;
        }

        .mobile-nav-item i {
            font-size: 16px;
        }

        .mobile-nav-item.active {
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.12);
            text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
        }

        .mobile-backdrop {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(5px);
            z-index: 940;
        }
        .mobile-backdrop.active {
            display: block;
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

        @media (max-width: 1080px) {
            html, body {
                flex-direction: column;
                height: 100dvh;
                max-width: 100vw !important;
                width: 100% !important;
                padding-top: 54px;
                padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
                box-sizing: border-box;
                overflow-x: hidden !important;
                overflow-y: hidden !important;
            }

            * {
                box-sizing: border-box !important;
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
                top: 54px;
                bottom: calc(60px + env(safe-area-inset-bottom, 0px));
                left: -330px;
                width: 300px;
                z-index: 950;
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 10px 0 30px rgba(0,0,0,0.6);
            }

            .sidebar.mobile-open {
                transform: translateX(330px);
            }

            /* Main Panel */
            .main-panel {
                width: 100% !important;
                max-width: 100vw !important;
                height: calc(100dvh - 54px - 60px - env(safe-area-inset-bottom, 0px)) !important;
                overflow-x: hidden !important;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch;
                box-sizing: border-box !important;
            }

            /* Chat Panel Drawer */
            .chat-panel {
                position: fixed;
                top: 54px;
                bottom: calc(60px + env(safe-area-inset-bottom, 0px));
                right: -370px;
                width: 340px;
                max-width: 90vw;
                z-index: 950;
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: -10px 0 30px rgba(0,0,0,0.6);
            }

            .chat-panel.mobile-open {
                transform: translateX(-370px);
            }

            /* --- 1. GLOBAL SCREEN WRAPPERS --- */
            .welcome-screen, #routing-screen, #mail-screen, #client-view {
                padding: 12px 10px 40px 10px !important;
                box-sizing: border-box !important;
                width: 100% !important;
                max-width: 100% !important;
                overflow-x: hidden !important;
            }

            .welcome-screen h1, #routing-screen h1, #mail-screen h1 {
                font-size: 19px !important;
                line-height: 1.25 !important;
            }

            /* All cards on mobile */
            .card {
                padding: 16px 14px !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            /* Top Header Bars across all screens */
            .welcome-screen > div:first-child,
            #routing-screen > div:first-child,
            #mail-screen > div:first-child {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 12px !important;
                margin-bottom: 16px !important;
                padding-bottom: 12px !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            .welcome-screen > div:first-child > div:last-child,
            #routing-screen > div:first-child > div:last-child,
            #mail-screen > div:first-child > div:last-child {
                text-align: left !important;
                display: flex !important;
                flex-wrap: wrap !important;
                align-items: center !important;
                justify-content: flex-start !important;
                gap: 10px !important;
                width: 100% !important;
            }

            /* Live clock in dashboard */
            #live-clock {
                font-size: 20px !important;
            }
            #live-date {
                font-size: 11px !important;
            }

            /* --- 2. COMMAND CENTER / DASHBOARD GRID --- */
            #welcome-screen > div[style*="grid-template-columns"] {
                display: flex !important;
                flex-direction: column !important;
                gap: 14px !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            #welcome-screen > div[style*="grid-template-columns"] > div {
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            /* Filter Pill Bar for Tasks */
            #command-center-task-filters {
                flex-wrap: wrap !important;
                gap: 6px !important;
            }
            #command-center-task-filters button {
                flex: 1 !important;
                justify-content: center !important;
                padding: 6px 8px !important;
                font-size: 11px !important;
            }

            /* Alerts center task items */
            #alerts-center-list {
                max-height: 420px !important;
                width: 100% !important;
            }
            #alerts-center-list .drive-item {
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                padding: 12px 10px !important;
                gap: 8px !important;
            }

            /* System Checklist */
            div[style*="grid-template-columns: 1fr 1fr; gap: 12px"] {
                grid-template-columns: 1fr 1fr !important;
                gap: 8px !important;
                font-size: 11px !important;
            }

            /* --- 3. ROUTING & MASTER HUB MOBILE OPTIMIZATION --- */
            .routing-frame-container {
                height: calc(100dvh - 200px) !important;
                min-height: 520px !important;
                width: 100% !important;
            }

            .routing-tab-btn {
                flex: 1 !important;
                font-size: 11.5px !important;
                padding: 8px 8px !important;
                justify-content: center !important;
                text-align: center !important;
            }

            /* --- 4. MAIL SCREEN MOBILE OPTIMIZATION --- */
            .mail-header-bar {
                flex-direction: column !important;
                gap: 12px !important;
                align-items: stretch !important;
            }

            .mail-tab-btn {
                flex: 1 !important;
                font-size: 12px !important;
                padding: 8px 10px !important;
                justify-content: center !important;
            }

            .mail-form-grid {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
            }

            .mail-form-card {
                padding: 16px !important;
                gap: 14px !important;
            }

            #mail-body {
                height: 180px !important;
            }

            .mail-send-bar {
                flex-direction: column !important;
                gap: 10px !important;
            }

            #btn-send-mail {
                width: 100% !important;
                justify-content: center !important;
            }

            /* --- 7. CLIENT VIEW MOBILE OPTIMIZATION (100% FULL-WIDTH STACK) --- */
            #client-view {
                padding: 0 !important;
                width: 100% !important;
                max-width: 100vw !important;
                overflow-x: hidden !important;
                box-sizing: border-box !important;
            }

            .client-header {
                padding: 12px 10px !important;
                gap: 10px !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }

            .client-title-area {
                width: 100% !important;
                justify-content: space-between !important;
                align-items: center !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
            }

            .client-title {
                font-size: 18px !important;
                line-height: 1.2 !important;
                word-break: break-word !important;
            }

            .header-actions {
                width: 100% !important;
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 6px !important;
                box-sizing: border-box !important;
            }

            .header-actions button {
                width: 100% !important;
                justify-content: center !important;
                padding: 8px 6px !important;
                font-size: 11.5px !important;
                box-sizing: border-box !important;
            }

            #active-client-contact-bar {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 6px !important;
                padding: 8px 10px !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }

            #active-client-contact-bar span {
                width: 100% !important;
                word-break: break-word !important;
                overflow-wrap: anywhere !important;
            }

            /* FORCE 1-COLUMN FULL WIDTH ON MOBILE */
            .client-content {
                display: flex !important;
                flex-direction: column !important;
                grid-template-columns: 1fr !important;
                padding: 12px 10px 40px 10px !important;
                gap: 14px !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            .client-content > div {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 14px !important;
                box-sizing: border-box !important;
            }

            /* Todo Input in Client View */
            .todo-input-area {
                flex-wrap: wrap !important;
                gap: 8px !important;
                width: 100% !important;
            }
            #new-todo-input {
                width: 100% !important;
                min-width: 0 !important;
                flex: none !important;
            }
            #new-todo-assignee {
                flex: 1 !important;
                min-width: 100px !important;
            }

            /* --- 5. MODALS MOBILE OPTIMIZATION --- */
            .modal-content {
                width: 94vw !important;
                max-width: 480px !important;
                max-height: 85dvh !important;
                padding: 18px !important;
                border-radius: 14px !important;
                margin: auto !important;
                box-sizing: border-box !important;
            }

            .modal-actions {
                flex-direction: column-reverse !important;
                gap: 8px !important;
            }

            .modal-actions button {
                width: 100% !important;
                justify-content: center !important;
            }
        }

        @media (max-width: 480px) {
            div[style*="grid-template-columns: repeat(4, 1fr)"] {
                grid-template-columns: 1fr !important;
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
            <button class="nav-item" id="nav-btn-routing" onclick="showView('routing')">
                <i class="fa-solid fa-route" style="color: var(--color-cyan);"></i> E-Mail Verteiler & Hub
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
                </div>

                <!-- Rechts: Activity & Alarm-Zentrale (nimmt die volle Höhe ein für bessere Symmetrie) -->
                <div style="display: flex; flex-direction: column; gap: 30px; box-sizing: border-box;">
                    <!-- Card: Active alerts / Mail Action Center -->
                    <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 24px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                            <h3 class="card-title" style="margin: 0;"><i class="fa-solid fa-bell" style="color: var(--color-red);"></i> Aktivitäts- & Alarm-Zentrale</h3>
                            <button type="button" class="btn btn-primary" style="padding: 6px 12px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px;" onclick="openCustomTaskModal()">
                                <i class="fa-solid fa-plus"></i> Aufgabe hinzufügen
                            </button>
                        </div>

                        <!-- Filter Pill Bar for Tasks: Alle | Adrian | Basti -->
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 14px; flex-wrap: wrap;" id="command-center-task-filters">
                            <button type="button" class="btn" id="task-filter-all" onclick="setCommandCenterTaskFilter('all')" style="padding: 5px 11px; font-size: 11.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; background: rgba(59, 130, 246, 0.18); border: 1px solid rgba(59, 130, 246, 0.4); color: #fff;">
                                <i class="fa-solid fa-layer-group" style="font-size: 10.5px; color: #60a5fa;"></i> Alle <span id="task-count-all" style="opacity: 0.85; font-size: 10.5px;">(0)</span>
                            </button>
                            <button type="button" class="btn" id="task-filter-adrian" onclick="setCommandCenterTaskFilter('adrian')" style="padding: 5px 11px; font-size: 11.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-secondary);">
                                <i class="fa-regular fa-user" style="font-size: 10.5px; color: #60a5fa;"></i> Adrian <span id="task-count-adrian" style="opacity: 0.85; font-size: 10.5px;">(0)</span>
                            </button>
                            <button type="button" class="btn" id="task-filter-basti" onclick="setCommandCenterTaskFilter('basti')" style="padding: 5px 11px; font-size: 11.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-secondary);">
                                <i class="fa-regular fa-user" style="font-size: 10.5px; color: #f472b6;"></i> Basti <span id="task-count-basti" style="opacity: 0.85; font-size: 10.5px;">(0)</span>
                            </button>
                        </div>

                        <div id="alerts-center-list" style="display: flex; flex-direction: column; gap: 10px; overflow-y: auto; flex-grow: 1; max-height: 380px; padding-right: 4px;">
                            <!-- Dynamische Liste von Kunden-Alarms & Aufgaben -->
                        </div>
                    </div>

                    <!-- Card: Wichtige Unternehmens-Dateien -->
                    <div class="card" style="background: rgba(17, 24, 39, 0.4); border-color: var(--border-color); padding: 24px; box-sizing: border-box; display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                            <h3 class="card-title" style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-folder-open" style="color: var(--color-cyan);"></i> Wichtige Unternehmens-Dateien
                            </h3>
                            <div>
                                <label for="company-file-input" class="btn btn-primary" style="padding: 6px 12px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; cursor: pointer;">
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Datei hochladen
                                </label>
                                <input type="file" id="company-file-input" style="display: none;" multiple onchange="uploadCompanyFile(event)">
                            </div>
                        </div>

                        <!-- Company Files List -->
                        <div id="company-files-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 260px; overflow-y: auto; padding-right: 4px;">
                            <!-- Dynamische Liste von Unternehmens-Dateien -->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- E-MAIL VERTEILER & MASTER HUB SCREEN -->
        <div class="welcome-screen" id="routing-screen" style="display: none; overflow-y: auto; flex-direction: column; justify-content: flex-start; padding: 32px; box-sizing: border-box; width: 100%; height: 100%;">
            <!-- Header-Leiste -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; max-width: 1300px; margin: 0 auto 20px auto; border-bottom: 1px solid var(--border-color); padding-bottom: 18px; box-sizing: border-box; flex-wrap: wrap; gap: 16px;">
                <div style="text-align: left;">
                    <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--color-cyan); text-shadow: 0 0 10px rgba(6,182,212,0.3); display: block; margin-bottom: 6px;">
                        <i class="fa-solid fa-route"></i> Scholz & Friese Routing Network
                    </span>
                    <h1 style="margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 28px; background: linear-gradient(135deg, #fff 30%, var(--color-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        E-Mail Verteiler & Master Hub
                    </h1>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <!-- Tab Switcher -->
                    <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-color); padding: 4px; border-radius: 10px; display: flex; gap: 4px;">
                        <button class="routing-tab-btn active" id="tab-btn-verteiler" onclick="switchRoutingTab('verteiler')">
                            <i class="fa-solid fa-envelope-circle-check" style="color: var(--color-cyan);"></i> E-Mail Verteiler
                        </button>
                        <button class="routing-tab-btn" id="tab-btn-masterhub" onclick="switchRoutingTab('masterhub')">
                            <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> Master Hub & Routen
                        </button>
                    </div>

                    <!-- Action Controls -->
                    <button class="btn btn-secondary" onclick="reloadCurrentRoutingIframe()" style="padding: 9px 13px; font-size: 13px;" title="Aktuelle Ansicht neu laden">
                        <i class="fa-solid fa-rotate"></i>
                    </button>
                    <button class="btn btn-primary" onclick="openCurrentRoutingInNewTab()" style="padding: 9px 14px; font-size: 13px; display: flex; align-items: center; gap: 6px;" title="In neuem Tab öffnen">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        <span>Tab öffnen</span>
                    </button>
                </div>
            </div>

            <!-- Iframe Container -->
            <div class="routing-frame-container">
                <iframe id="routing-iframe-verteiler" src="about:blank" style="width: 100%; height: 100%; border: none; background: #080A0F; display: block;" allow="clipboard-read; clipboard-write"></iframe>
                <iframe id="routing-iframe-masterhub" src="about:blank" style="width: 100%; height: 100%; border: none; background: #080A0F; display: none;" allow="clipboard-read; clipboard-write"></iframe>
            </div>
        </div>

        <!-- MAIL COMPOSER SCREEN -->
        <div class="welcome-screen" id="mail-screen" style="display: none; overflow-y: auto; flex-direction: column; justify-content: flex-start; padding: 40px; box-sizing: border-box; width: 100%; height: 100%;">
            <!-- Header-Leiste -->
            <div class="mail-header-bar">
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
                <div class="card mail-form-card">
                    <!-- Tab-Leiste -->
                    <div style="display: flex; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 15px; margin-bottom: 15px;">
                        <button class="mail-tab-btn active" id="mail-tab-compose" onclick="switchMailTab('compose')">
                            <i class="fa-solid fa-pen-to-square"></i> E-Mail verfassen
                        </button>
                        <button class="mail-tab-btn" id="mail-tab-log" onclick="switchMailTab('log')">
                            <i class="fa-solid fa-clock-rotate-left"></i> Gesendete E-Mails
                        </button>
                    </div>

                    <!-- COMPOSE VIEW -->
                    <div id="mail-compose-view" style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
                        <!-- Absender, Unterschrift und Empfänger in einem 3-Spalten Layout -->
                        <div class="mail-form-grid">
                            <!-- Absender -->
                            <div class="form-group" style="margin: 0;">
                                <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Absender (Sender)</label>
                                <select id="mail-sender" onchange="autoSelectSignature()" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 14px; outline: none; transition: var(--transition-smooth); cursor: pointer;">
                                    <option value="info@scholz-friese-webdesign.de">info@scholz-friese-webdesign.de</option>
                                    <option value="bastianscholz@scholz-friese-webdesign.de">bastianscholz@scholz-friese-webdesign.de</option>
                                </select>
                            </div>

                            <!-- Unterschrift -->
                            <div class="form-group" style="margin: 0;">
                                <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; display: block;">Unterschrift (Signature)</label>
                                <select id="mail-signature" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 14px; outline: none; transition: var(--transition-smooth); cursor: pointer;">
                                    <option value="bastian">Bastian Scholz</option>
                                    <option value="adrian">Adrian Friese</option>
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

                        <!-- Dateianhänge (Attachments) Container -->
                        <div class="form-group" style="margin: 0;">
                            <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <span><i class="fa-solid fa-paperclip" style="color: var(--color-cyan); margin-right: 4px;"></i> Dateianhänge</span>
                                <span style="font-size: 11px; text-transform: none; font-weight: normal; color: var(--text-secondary);" id="mail-attachments-count">0 Dateien</span>
                            </label>
                            
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                                    <label for="mail-attachment-input" class="btn" style="padding: 9px 16px; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; background: rgba(6, 182, 212, 0.1); border: 1px dashed var(--color-cyan); color: #fff;">
                                        <i class="fa-solid fa-cloud-arrow-up" style="color: var(--color-cyan);"></i> Datei(en) auswählen
                                    </label>
                                    <input type="file" id="mail-attachment-input" multiple style="display: none;" onchange="handleMailAttachmentSelection(event)">
                                    <span style="font-size: 12px; color: var(--text-secondary);">PDF, Bilder, ZIP, DOCX usw. (Max. 10MB gesamt)</span>
                                </div>

                                <div id="mail-attachments-list" style="display: flex; flex-wrap: wrap; gap: 8px; min-height: 10px;"></div>
                            </div>
                        </div>

                        <!-- Signatur-Hinweis -->
                        <div style="font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.02); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                            <i class="fa-solid fa-signature" style="color: var(--color-cyan);"></i>
                            <span>Die Standard-Signatur von **Scholz & Friese Webdesign** wird automatisch an die gesendete Mail angehängt.</span>
                        </div>
                        
                        <!-- Senden-Bereich -->
                        <div class="mail-send-bar" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 10px;">
                            <div id="mail-status-message" style="font-size: 13.5px; font-weight: 500;"></div>
                            <button type="button" class="btn btn-primary" id="btn-send-mail" style="padding: 12px 30px; font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 10px;" onclick="sendMail()">
                                <i class="fa-solid fa-paper-plane" id="mail-send-icon"></i> <span id="mail-send-btn-text">E-Mail senden</span>
                            </button>
                        </div>
                    </div>

                    <!-- LOG VIEW -->
                    <div id="mail-log-view" style="display: none; flex-direction: column; gap: 20px; width: 100%;">
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px; flex-wrap: wrap;">
                            <div style="position: relative; flex-grow: 1; min-width: 250px;">
                                <input type="text" id="mail-log-search" placeholder="Empfänger, Betreff oder Absender filtern..." oninput="filterMailLog()" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px 14px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 13.5px; outline: none; transition: var(--transition-smooth);">
                            </div>
                            <button class="btn" style="padding: 10px 16px; display: inline-flex; align-items: center; gap: 8px;" onclick="loadResendMailLog()">
                                <i class="fa-solid fa-rotate"></i> Aktualisieren
                            </button>
                        </div>

                        <div style="overflow-x: auto; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; min-height: 200px; box-sizing: border-box; width: 100%;">
                            <table class="mail-log-table">
                                <thead>
                                    <tr>
                                        <th>Datum</th>
                                        <th>Von</th>
                                        <th>An</th>
                                        <th>Betreff</th>
                                        <th>Status</th>
                                        <th style="text-align: right;">Aktion</th>
                                    </tr>
                                </thead>
                                <tbody id="mail-log-table-body">
                                    <!-- Dynamic rows -->
                                </tbody>
                            </table>
                            <div id="mail-log-loader" style="display: none; padding: 40px; text-align: center; color: var(--text-secondary);">
                                <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 24px; color: var(--color-cyan); margin-bottom: 10px;"></i>
                                <p style="margin: 0; font-size: 13px;">E-Mail Verlauf wird geladen...</p>
                            </div>
                            <div id="mail-log-empty" style="display: none; padding: 60px 40px; text-align: center; color: var(--text-secondary);">
                                <i class="fa-solid fa-envelope-open" style="font-size: 32px; opacity: 0.3; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto;"></i>
                                <p style="margin: 0; font-size: 14px; font-weight: 500;">Keine gesendeten E-Mails gefunden.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Client Active Details -->
        <div id="client-view" style="display: none; height: 100%; flex-direction: column;">
            <div class="client-header" style="padding: 22px 36px 18px 36px; border-bottom: 1px solid var(--border-color); background: rgba(13, 18, 32, 0.6); backdrop-filter: blur(12px); display: flex; flex-direction: column; gap: 14px;">
                <!-- Top Row: Title + Status Pill + Actions -->
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <div class="client-title-area" style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                        <h2 class="client-title" id="active-client-name" style="font-size: 24px; font-weight: 800; color: #fff; letter-spacing: -0.4px; margin: 0;">Kundenname</h2>
                        <div class="status-pill" id="active-client-status" style="margin-left: 2px;">
                            <span class="status-dot"></span>
                            <span class="status-text">Status</span>
                        </div>
                    </div>
                    
                    <div class="header-actions" style="display: flex; align-items: center; gap: 9px; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="openMailWithClient()" style="padding: 9px 15px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 7px; border-radius: 8px;">
                            <i class="fa-solid fa-paper-plane" style="font-size: 12px;"></i> E-Mail schreiben
                        </button>
                        <button class="btn" onclick="toggleManualStatus()" style="padding: 9px 13px; font-size: 12.5px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px;">
                            <i class="fa-solid fa-rotate" style="font-size: 12px; color: var(--color-cyan);"></i> Status umstellen
                        </button>
                        <button class="btn" onclick="openEditClientModal()" style="padding: 9px 13px; font-size: 12.5px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px;">
                            <i class="fa-solid fa-pen-to-square" style="font-size: 12px; color: var(--color-purple);"></i> Bearbeiten
                        </button>
                        <button class="btn btn-danger" onclick="deleteClient()" style="padding: 9px 12px; font-size: 12.5px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px;" title="Kunde löschen">
                            <i class="fa-solid fa-trash-can" style="font-size: 13px;"></i>
                        </button>
                    </div>
                </div>

                <!-- Bottom Row: Sleek Glass Contact Bar -->
                <div id="active-client-contact-bar" style="background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 8px 14px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12.5px; color: var(--text-secondary);">
                    <span id="header-contact-email-wrapper" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fa-regular fa-envelope" style="color: var(--color-cyan); font-size: 13px;"></i>
                        <a href="#" id="header-email-link" style="color: #e2e8f0; text-decoration: none; font-weight: 500;">-</a>
                    </span>
                    <span id="header-contact-person-wrapper" style="display: inline-flex; align-items: center; gap: 6px;">
                        <span style="opacity: 0.35; color: var(--text-secondary);">•</span>
                        <i class="fa-regular fa-user" style="color: #c084fc; font-size: 13px;"></i>
                        <span id="header-contact-person-text" style="color: #e2e8f0; font-weight: 600;">-</span>
                    </span>
                    <span id="header-contact-phone-wrapper" style="display: inline-flex; align-items: center; gap: 6px;">
                        <span style="opacity: 0.35; color: var(--text-secondary);">•</span>
                        <i class="fa-solid fa-phone" style="color: #34d399; font-size: 12px;"></i>
                        <a href="#" id="header-phone-link" style="color: #e2e8f0; text-decoration: none; font-weight: 500;">-</a>
                    </span>
                </div>
            </div>
            
            <!-- Warning / Action Banner -->
            <div id="client-action-banner" style="display: none;"></div>

            <div class="client-content">
                <!-- COL 1 -->
                <div style="display: flex; flex-direction: column; gap: 30px;">
                    <!-- Cloudflare Card -->
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <h3 class="card-title" style="margin: 0;">
                                <i class="fa-solid fa-cloud"></i> Cloudflare & Website Status
                            </h3>
                            <button class="btn" onclick="openEditClientModal()" style="padding: 4px 8px; font-size: 11px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;" title="Website & Zugangsdaten bearbeiten">
                                <i class="fa-solid fa-pen-to-square"></i> Bearbeiten
                            </button>
                        </div>
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

                        <!-- Admin-Bereich (/admin) & Passwort Box -->
                        <div id="cf-admin-box" style="margin-top: 14px; padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 12px; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-shield-halved" style="color: var(--color-cyan);"></i> Admin-Bereich (/admin)
                                </span>
                                <a href="#" id="cf-admin-url" target="_blank" class="btn" style="padding: 4px 9px; font-size: 11px; font-weight: 600; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); color: #60a5fa; text-decoration: none; border-radius: 6px; display: inline-flex; align-items: center; gap: 5px;">
                                    <span>Öffnen</span> <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 9px;"></i>
                                </a>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); padding: 7px 10px; border-radius: 6px;">
                                <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
                                    <span style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; flex-shrink: 0;">Passwort:</span>
                                    <span id="client-admin-password-display" style="font-family: monospace; font-size: 13px; color: #34d399; font-weight: 600; letter-spacing: 1px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">-</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                                    <button type="button" id="btn-toggle-client-password" onclick="toggleClientPasswordDisplay()" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px 6px; font-size: 12px; border-radius: 4px;" title="Passwort anzeigen/verbergen">
                                        <i class="fa-solid fa-eye" id="client-password-eye-icon"></i>
                                    </button>
                                    <button type="button" id="btn-copy-client-password" onclick="copyClientAdminPassword()" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; cursor: pointer; padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 5px; display: inline-flex; align-items: center; gap: 4px;" title="Passwort kopieren">
                                        <i class="fa-solid fa-copy"></i> <span id="copy-password-btn-text">Kopieren</span>
                                    </button>
                                </div>
                            </div>
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
                        <div class="todo-input-area" style="display:flex; gap:8px; align-items:center;">
                            <input type="text" id="new-todo-input" placeholder="Neue Aufgabe / Notiz hinzufügen..." style="flex:1; background:rgba(0,0,0,0.2); border:1px solid var(--border-color); border-radius:6px; color:#fff; padding:8px 12px; font-size:13px; outline:none;" onkeydown="if(event.key === 'Enter') addTodo()">
                            <select id="new-todo-assignee" style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:6px; color:#fff; padding:8px 10px; font-size:12px; outline:none; cursor:pointer; min-width:90px;">
                                <option value="">Keiner</option>
                                <option value="adrian">Adrian</option>
                                <option value="basti">Basti</option>
                            </select>
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

    <!-- TASK EMAIL MODAL -->
    <div class="modal" id="task-email-modal" style="display: none;">
        <div class="modal-content" style="max-width: 440px; background: rgba(17, 24, 39, 0.95); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; backdrop-filter: blur(16px); padding: 24px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <h3 class="modal-title" id="task-email-modal-title" style="margin: 0; font-size: 17px; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-paper-plane" style="color: var(--color-cyan);"></i> <span>Aufgabe per E-Mail senden</span>
                </h3>
                <button type="button" onclick="closeTaskEmailModal()" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 16px;" title="Schließen">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <!-- Task Info Preview Box -->
            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-color); border-radius: 10px; padding: 12px 14px; margin-bottom: 18px;">
                <div id="task-email-modal-task-title" style="font-size: 13.5px; font-weight: 700; color: #fff; line-height: 1.4; word-break: break-word;">-</div>
                <div id="task-email-modal-task-sub" style="font-size: 11.5px; color: var(--text-secondary); margin-top: 4px;">-</div>
            </div>

            <label style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 10px;">
                Empfänger auswählen:
            </label>

            <!-- Recipient Selection Pills (Adrian / Basti) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <label id="label-recipient-adrian" style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 10px; cursor: pointer; transition: all 0.2s;">
                    <input type="checkbox" id="chk-recipient-adrian" style="accent-color: #3b82f6; width: 16px; height: 16px; cursor: pointer;">
                    <div>
                        <div style="font-size: 13px; font-weight: 700; color: #60a5fa;">Adrian</div>
                        <div style="font-size: 10px; color: #94a3b8; font-weight: 500;">info@...</div>
                    </div>
                </label>

                <label id="label-recipient-basti" style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(236, 72, 153, 0.1); border: 1px solid rgba(244, 114, 182, 0.3); border-radius: 10px; cursor: pointer; transition: all 0.2s;">
                    <input type="checkbox" id="chk-recipient-basti" style="accent-color: #ec4899; width: 16px; height: 16px; cursor: pointer;">
                    <div>
                        <div style="font-size: 13px; font-weight: 700; color: #f472b6;">Basti</div>
                        <div style="font-size: 10px; color: #94a3b8; font-weight: 500;">bastianscholz@...</div>
                    </div>
                </label>
            </div>

            <!-- Modal Action Buttons -->
            <div style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;" id="task-email-modal-actions">
                <button type="button" class="btn" id="btn-no-task-email" onclick="skipEmailAndCompleteTask()" style="padding: 9px 12px; font-size: 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; display: none;">
                    Nein (Nur erledigen)
                </button>
                <button type="button" class="btn" onclick="closeTaskEmailModal()" style="padding: 9px 12px; font-size: 12.5px;">Abbrechen</button>
                <button type="button" class="btn btn-primary" id="btn-submit-task-email" onclick="submitTaskEmailModal()" style="padding: 9px 16px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-paper-plane"></i> <span>E-Mail versenden</span>
                </button>
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

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div class="form-group">
                        <label>Ansprechpartner (optional)</label>
                        <input type="text" id="modal-client-contact" placeholder="Z.B. Max Mustermann">
                    </div>
                    <div class="form-group">
                        <label>Telefonnummer (optional)</label>
                        <input type="text" id="modal-client-phone" placeholder="Z.B. 0511 1234567">
                    </div>
                </div>

                <div class="form-group">
                    <label>Verknüpftes Cloudflare Pages Projekt</label>
                    <input type="text" id="modal-client-cf" placeholder="Z.B. weymann-gebaeudetechnik">
                </div>

                <div class="form-group">
                    <label>Echte Domain (Custom Domain)</label>
                    <input type="text" id="modal-client-domain" placeholder="Z.B. weymann-gebaeudetechnik.de">
                </div>

                <div class="form-group">
                    <label style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-key" style="color: var(--color-cyan);"></i> Admin-Passwort (Website /admin)</span>
                        <span style="font-size: 11px; color: var(--text-secondary); font-weight: normal;">Optional</span>
                    </label>
                    <div style="position: relative; display: flex; align-items: center;">
                        <input type="password" id="modal-client-admin-password" placeholder="Z.B. Start.123# oder Kundenpasswort" style="padding-right: 75px; width: 100%; box-sizing: border-box;">
                        <div style="position: absolute; right: 8px; display: flex; align-items: center; gap: 6px;">
                            <button type="button" onclick="toggleModalPasswordVisibility()" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px; font-size: 13px;" title="Passwort anzeigen/verbergen">
                                <i class="fa-solid fa-eye" id="modal-password-eye-icon"></i>
                            </button>
                            <button type="button" onclick="generateRandomAdminPassword()" style="background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); color: var(--color-cyan); cursor: pointer; padding: 3px 6px; border-radius: 4px; font-size: 11px; font-weight: 600;" title="Sicheres Passwort generieren">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                            </button>
                        </div>
                    </div>
                    <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">Login-Passwort für die Admin-Seite unter <code>/admin</code>.</span>
                </div>

                
                <div class="modal-actions">
                    <button type="button" class="btn" onclick="closeClientModal()">Abbrechen</button>
                    <button type="submit" class="btn btn-primary">Speichern</button>
                </div>
            </form>
        </div>
    </div>

    <!-- TRANSACTION MODAL -->
    <!-- E-MAIL DETAILS PREVIEW MODAL -->
    <div class="modal" id="mail-preview-modal">
        <div class="modal-content" style="max-width: 700px; width: 90%; max-height: 85vh; display: flex; flex-direction: column; box-sizing: border-box; background: #0c0f17; border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
            <h3 class="modal-title" style="margin-top: 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 15px;">
                <span>E-Mail Details</span>
                <span class="mail-log-badge sent" id="mail-preview-badge">Status</span>
            </h3>
            
            <div class="mail-preview-modal-body">
                <div class="mail-preview-header-meta">
                    <div>
                        <strong style="color: var(--text-secondary);">Von:</strong> 
                        <span id="mail-preview-from" style="color: var(--text-primary);"></span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary);">Datum:</strong> 
                        <span id="mail-preview-date" style="color: var(--text-primary);"></span>
                    </div>
                    <div style="grid-column: span 2;">
                        <strong style="color: var(--text-secondary);">An:</strong> 
                        <span id="mail-preview-to" style="color: var(--text-primary);"></span>
                    </div>
                    <div style="grid-column: span 2;">
                        <strong style="color: var(--text-secondary);">Betreff:</strong> 
                        <span id="mail-preview-subject" style="color: var(--text-primary); font-weight: 600;"></span>
                    </div>
                </div>

                <div class="mail-preview-iframe-container">
                    <iframe id="mail-preview-frame" class="mail-preview-iframe" title="E-Mail Vorschau"></iframe>
                </div>
            </div>

            <div class="modal-actions" style="margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;">
                <button type="button" class="btn btn-primary" onclick="closeMailPreviewModal()">Schließen</button>
            </div>
        </div>
    </div>

    <!-- CUSTOM TASK MODAL (Aktivitäts- & Alarm-Zentrale) -->
    <div class="modal" id="custom-task-modal">
        <div class="modal-content" style="max-width: 520px; width: 90%; background: #0c0f17; border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; box-sizing: border-box;">
            <h3 class="modal-title" style="margin-top: 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 20px;">
                <span><i class="fa-solid fa-list-check" style="color: var(--color-cyan); margin-right: 8px;"></i> Neue Aufgabe hinzufügen</span>
                <i class="fa-solid fa-xmark" style="cursor: pointer; color: var(--text-secondary);" onclick="closeCustomTaskModal()"></i>
            </h3>
            
            <form onsubmit="handleSaveCustomTask(event)" style="display: flex; flex-direction: column; gap: 16px;">
                <div class="form-group" style="margin: 0;">
                    <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; display: block;">Aufgaben-Titel *</label>
                    <input type="text" id="task-title-input" required placeholder="z. B. Neues Banner für Startseite hochladen..." style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 14px; outline: none;">
                </div>

                <div class="form-group" style="margin: 0;">
                    <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; display: block;">Kunde zuweisen (Optional)</label>
                    <select id="task-client-select" onchange="handleTaskClientSelectChange()" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 13.5px; outline: none;">
                        <option value="">Kein Kunde (Allgemeine Aufgabe)</option>
                    </select>
                </div>

                <div class="form-group" style="margin: 0;">
                    <label style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; display: block;">Bearbeiter zuweisen (Optional)</label>
                    <select id="task-assignee-select" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px 12px; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 13.5px; outline: none;">
                        <option value="">Kein Bearbeiter</option>
                        <option value="adrian">👤 Adrian (Blau)</option>
                        <option value="basti">👤 Basti (Pink)</option>
                    </select>
                </div>

                <!-- Checkbox: Kunde auf rot setzen -->
                <div id="task-set-red-container" style="display: none; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); padding: 12px 14px; border-radius: 8px; transition: var(--transition-smooth);">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin: 0;">
                        <input type="checkbox" id="task-set-red-checkbox" checked style="width: 16px; height: 16px; accent-color: var(--color-red); cursor: pointer;">
                        <span style="font-size: 13px; color: #fca5a5; font-weight: 600;">
                            <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-red); margin-right: 4px;"></i> Kunde auf ROT (Aktion erforderlich) setzen
                        </span>
                    </label>
                </div>



                <div class="modal-actions" style="margin-top: 10px; display: flex; justify-content: flex-end; gap: 10px;">
                    <button type="button" class="btn" onclick="closeCustomTaskModal()">Abbrechen</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-check"></i> Aufgabe speichern</button>
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
        <button class="mobile-nav-item" id="mob-nav-routing" onclick="showView('routing'); updateMobileBottomNav('routing');">
            <i class="fa-solid fa-route"></i>
            <span>Verteiler</span>
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

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        // --- OUTBOUND MAIL SYSTEM STATE & LOGIC ---
        let selectedMailRecipients = [];
        let resendMailLogData = [];

        function switchMailTab(tabName) {
            document.querySelectorAll('.mail-tab-btn').forEach(btn => btn.classList.remove('active'));
            
            const composeTabBtn = document.getElementById('mail-tab-compose');
            const logTabBtn = document.getElementById('mail-tab-log');
            const composeView = document.getElementById('mail-compose-view');
            const logView = document.getElementById('mail-log-view');

            if (tabName === 'compose') {
                if (composeTabBtn) composeTabBtn.classList.add('active');
                if (composeView) composeView.style.display = 'flex';
                if (logView) logView.style.display = 'none';
            } else if (tabName === 'log') {
                if (logTabBtn) logTabBtn.classList.add('active');
                if (composeView) composeView.style.display = 'none';
                if (logView) logView.style.display = 'flex';
                loadResendMailLog();
            }
        }

        async function loadResendMailLog() {
            const tableBody = document.getElementById('mail-log-table-body');
            const loader = document.getElementById('mail-log-loader');
            const emptyState = document.getElementById('mail-log-empty');

            tableBody.innerHTML = '';
            loader.style.display = 'block';
            emptyState.style.display = 'none';

            try {
                const response = await fetch('/api/emails/log');
                if (!response.ok) {
                    throw new Error('E-Mail Log konnte nicht geladen werden.');
                }
                const result = await response.json();
                resendMailLogData = result.data || [];
                
                loader.style.display = 'none';
                renderMailLogTable(resendMailLogData);
            } catch (e) {
                console.error('Error fetching Resend mail log:', e);
                loader.style.display = 'none';
                tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--color-red); padding: 30px;"><i class="fa-solid fa-triangle-exclamation"></i> Fehler beim Laden des E-Mail Verlaufs: ' + e.message + '</td></tr>';
            }
        }

        function getResendStatusInfo(rawEvent) {
            const ev = String(rawEvent || '').toLowerCase().trim();
            if (ev === 'delivered') {
                return { label: 'Zugestellt', cls: 'delivered', icon: 'fa-circle-check' };
            }
            if (ev === 'sent') {
                return { label: 'Gesendet', cls: 'sent', icon: 'fa-paper-plane' };
            }
            if (ev === 'opened') {
                return { label: 'Geöffnet', cls: 'opened', icon: 'fa-envelope-open' };
            }
            if (ev === 'clicked') {
                return { label: 'Geklickt', cls: 'clicked', icon: 'fa-arrow-pointer' };
            }
            if (ev === 'bounced') {
                return { label: 'Bounced', cls: 'bounced', icon: 'fa-circle-exclamation' };
            }
            if (ev === 'complained') {
                return { label: 'Spam-Meldung', cls: 'complained', icon: 'fa-ban' };
            }
            if (ev === 'delivery_delayed' || ev === 'delayed') {
                return { label: 'Verzögert', cls: 'delayed', icon: 'fa-clock' };
            }
            if (ev === 'failed') {
                return { label: 'Fehlgeschlagen', cls: 'failed', icon: 'fa-triangle-exclamation' };
            }
            if (!ev || ev === 'undefined') {
                return { label: 'Gesendet', cls: 'sent', icon: 'fa-paper-plane' };
            }
            return { label: rawEvent, cls: 'other', icon: 'fa-circle-info' };
        }

        function renderMailLogTable(emails) {
            const tableBody = document.getElementById('mail-log-table-body');
            const emptyState = document.getElementById('mail-log-empty');

            if (emails.length === 0) {
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';
            tableBody.innerHTML = emails.map(item => {
                const dateStr = new Date(item.created_at).toLocaleString('de-DE');
                const toStr = Array.isArray(item.to) ? item.to.join(', ') : (item.to || '');
                const rawEvent = item.last_event || item.status;
                const statusInfo = getResendStatusInfo(rawEvent);
                
                return \`
                    <tr>
                        <td style="white-space: nowrap;">\${dateStr}</td>
                        <td style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="\${item.from}">\${item.from}</td>
                        <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="\${toStr}">\${toStr}</td>
                        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500;" title="\${item.subject || '(Kein Betreff)'}">\${item.subject || '(Kein Betreff)'}</td>
                        <td>
                            <span class="mail-log-badge \${statusInfo.cls}">
                                <i class="fa-solid \${statusInfo.icon}" style="font-size: 10px;"></i>
                                \${statusInfo.label}
                            </span>
                        </td>
                        <td style="text-align: right; white-space: nowrap;">
                            <button type="button" class="btn" style="padding: 6px 10px; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;" onclick="viewResendEmailDetails('\${item.id}')">
                                <i class="fa-solid fa-eye"></i> Details
                            </button>
                        </td>
                    </tr>
                \`;
            }).join('');
        }

        function filterMailLog() {
            const query = document.getElementById('mail-log-search').value.toLowerCase().trim();
            if (!query) {
                renderMailLogTable(resendMailLogData);
                return;
            }

            const filtered = resendMailLogData.filter(item => {
                const toStr = (Array.isArray(item.to) ? item.to.join(', ') : item.to || '').toLowerCase();
                const fromStr = (item.from || '').toLowerCase();
                const subjectStr = (item.subject || '').toLowerCase();
                return toStr.includes(query) || fromStr.includes(query) || subjectStr.includes(query);
            });

            renderMailLogTable(filtered);
        }

        async function viewResendEmailDetails(emailId) {
            const modal = document.getElementById('mail-preview-modal');
            const badge = document.getElementById('mail-preview-badge');
            const fromSpan = document.getElementById('mail-preview-from');
            const toSpan = document.getElementById('mail-preview-to');
            const dateSpan = document.getElementById('mail-preview-date');
            const subjectSpan = document.getElementById('mail-preview-subject');
            const previewFrame = document.getElementById('mail-preview-frame');

            // Reset modal fields and show loading inside iframe
            fromSpan.innerText = 'Laden...';
            toSpan.innerText = 'Laden...';
            dateSpan.innerText = 'Laden...';
            subjectSpan.innerText = 'Laden...';
            previewFrame.srcdoc = '<div style="font-family: sans-serif; padding: 20px; text-align: center; color: #666;"><i class="fa-solid fa-circle-notch fa-spin" style="font-size: 20px; margin-bottom: 8px;"></i> E-Mail Inhalt wird geladen...</div>';
            
            modal.style.display = 'flex';

            try {
                const response = await fetch('/api/emails/log?id=' + emailId);
                if (!response.ok) {
                    throw new Error('E-Mail Details konnten nicht geladen werden.');
                }
                const data = await response.json();
                
                // Set metadata
                fromSpan.innerText = data.from || '';
                toSpan.innerText = Array.isArray(data.to) ? data.to.join(', ') : data.to || '';
                dateSpan.innerText = new Date(data.created_at).toLocaleString('de-DE');
                subjectSpan.innerText = data.subject || '(Kein Betreff)';
                
                const rawEvent = data.last_event || data.status;
                const statusInfo = getResendStatusInfo(rawEvent);
                badge.className = 'mail-log-badge ' + statusInfo.cls;
                badge.innerHTML = '<i class="fa-solid ' + statusInfo.icon + '" style="font-size: 10px;"></i> ' + statusInfo.label;

                // Set HTML content inside safe iframe
                const htmlContent = data.html || ('<div style="font-family: sans-serif; padding: 20px; white-space: pre-wrap;">' + (data.text || '') + '</div>');
                previewFrame.srcdoc = htmlContent;
            } catch (e) {
                console.error('Error fetching email details:', e);
                previewFrame.srcdoc = '<div style="font-family: sans-serif; padding: 20px; color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Fehler beim Laden: ' + e.message + '</div>';
            }
        }

        function closeMailPreviewModal() {
            document.getElementById('mail-preview-modal').style.display = 'none';
        }

        function initMailScreen() {
            switchMailTab('compose');
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

        function autoSelectSignature() {
            const sender = document.getElementById('mail-sender').value;
            const sigSelect = document.getElementById('mail-signature');
            if (sender === 'bastianscholz@scholz-friese-webdesign.de') {
                sigSelect.value = 'bastian';
            } else if (sender === 'info@scholz-friese-webdesign.de') {
                sigSelect.value = 'bastian';
            }
        }

        // --- MAIL ATTACHMENTS & CUSTOM TASKS LOGIC ---
        let mailAttachments = [];
        let customTasksData = [];

        function handleMailAttachmentSelection(e) {
            const files = Array.from(e.target.files);
            if (!files.length) return;

            files.forEach(file => {
                if (file.size > 10 * 1024 * 1024) {
                    alert('Datei "' + file.name + '" überschreitet das Limit von 10 MB.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const base64Data = evt.target.result.split(',')[1];
                    mailAttachments.push({
                        filename: file.name,
                        size: file.size,
                        type: file.type,
                        content: base64Data
                    });
                    renderMailAttachmentsList();
                };
                reader.readAsDataURL(file);
            });
            e.target.value = '';
        }

        function removeMailAttachment(index) {
            mailAttachments.splice(index, 1);
            renderMailAttachmentsList();
        }

        function renderMailAttachmentsList() {
            const container = document.getElementById('mail-attachments-list');
            const countEl = document.getElementById('mail-attachments-count');
            if (countEl) countEl.innerText = mailAttachments.length + ' Datei(en)';
            if (!container) return;

            if (mailAttachments.length === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = mailAttachments.map((att, idx) => {
                const sizeKb = (att.size / 1024).toFixed(1);
                const sizeStr = att.size > 1024 * 1024 ? (att.size / (1024 * 1024)).toFixed(1) + ' MB' : sizeKb + ' KB';
                let iconClass = 'fa-file';
                if (att.type.includes('pdf')) iconClass = 'fa-file-pdf';
                else if (att.type.includes('image')) iconClass = 'fa-file-image';
                else if (att.type.includes('zip') || att.type.includes('compressed')) iconClass = 'fa-file-zipper';
                else if (att.type.includes('word') || att.type.includes('document')) iconClass = 'fa-file-word';

                return '<div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 6px; font-size: 12px; color: var(--text-primary);">' +
                    '<i class="fa-solid ' + iconClass + '" style="color: var(--color-cyan);"></i>' +
                    '<span style="font-weight: 500; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + att.filename + '</span>' +
                    '<span style="color: var(--text-secondary); font-size: 11px;">(' + sizeStr + ')</span>' +
                    '<i class="fa-solid fa-xmark" onclick="removeMailAttachment(' + idx + ')" style="cursor: pointer; color: var(--color-red); margin-left: 4px;" title="Entfernen"></i>' +
                '</div>';
            }).join('');
        }

        async function fetchCustomTasks() {
            try {
                const res = await fetch('/api/tasks');
                if (res.status === 401) {
                    window.location.reload();
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    customTasksData = Array.isArray(data) ? data : [];
                } else {
                    customTasksData = [];
                }
            } catch(e) {
                console.error('Error fetching custom tasks:', e);
                customTasksData = [];
            }
        }

        function openCustomTaskModal() {
            const select = document.getElementById('task-client-select');
            if (select) {
                select.innerHTML = '<option value="">Kein Kunde (Allgemeine Aufgabe)</option>' +
                    (Array.isArray(clients) ? clients : []).map(c => '<option value="' + c.id + '">' + c.name + '</option>').join('');
            }
            const titleEl = document.getElementById('task-title-input');
            if (titleEl) titleEl.value = '';
            const assigneeEl = document.getElementById('task-assignee-select');
            if (assigneeEl) assigneeEl.value = '';
            const redCb = document.getElementById('task-set-red-checkbox');
            if (redCb) redCb.checked = true;
            handleTaskClientSelectChange();
            const modal = document.getElementById('custom-task-modal');
            if (modal) modal.style.display = 'flex';
        }

        function closeCustomTaskModal() {
            const modal = document.getElementById('custom-task-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleTaskClientSelectChange() {
            const select = document.getElementById('task-client-select');
            const redContainer = document.getElementById('task-set-red-container');
            if (select && redContainer) {
                if (select.value) {
                    redContainer.style.display = 'block';
                } else {
                    redContainer.style.display = 'none';
                }
            }
        }

        async function handleSaveCustomTask(e) {
            e.preventDefault();
            const titleInput = document.getElementById('task-title-input');
            const title = titleInput ? titleInput.value.trim() : '';
            const clientSelect = document.getElementById('task-client-select');
            const clientId = clientSelect ? clientSelect.value : '';
            const assigneeSelect = document.getElementById('task-assignee-select');
            const assignee = assigneeSelect ? assigneeSelect.value : null;
            const redCb = document.getElementById('task-set-red-checkbox');
            const setRed = (clientId && redCb) ? redCb.checked : false;

            if (!title) return;

            try {
                const clientObj = Array.isArray(clients) ? clients.find(c => c.id === clientId) : null;
                const payload = {
                    title,
                    clientId: clientId || null,
                    clientName: clientObj ? clientObj.name : null,
                    assignee: assignee || null,
                    setRed
                };

                const res = await fetch('/api/tasks/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.tasks)) {
                        customTasksData = data.tasks;
                    }
                    closeCustomTaskModal();
                    if (typeof loadClients === 'function') await loadClients();
                    updateGlobalStats();
                }
            } catch(err) {
                console.error('Error saving custom task:', err);
            }
        }

        async function toggleCustomTask(taskId) {
            try {
                const res = await fetch('/api/tasks/toggle', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: taskId })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.tasks)) {
                        customTasksData = data.tasks;
                    }
                    updateGlobalStats();
                }
            } catch(e) {
                console.error('Error toggling custom task:', e);
            }
        }

        async function deleteCustomTask(taskId) {
            try {
                const res = await fetch('/api/tasks/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: taskId })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.tasks)) {
                        customTasksData = data.tasks;
                    }
                    updateGlobalStats();
                }
            } catch(e) {
                console.error('Error deleting custom task:', e);
            }
        }

        // --- TASK EMAIL NOTIFICATION & COMPLETION HANDLERS ---
        let currentTaskEmailData = null;

        function openTaskEmailModal(title, clientName, assignee, options = {}) {
            currentTaskEmailData = {
                title: title,
                clientName: clientName || null,
                assignee: assignee || null,
                isCompletion: !!options.isCompletion,
                taskId: options.taskId || null,
                todoId: options.todoId || null,
                clientId: options.clientId || null
            };

            const modal = document.getElementById('task-email-modal');
            const titleEl = document.getElementById('task-email-modal-title');
            const taskTitleEl = document.getElementById('task-email-modal-task-title');
            const taskSubEl = document.getElementById('task-email-modal-task-sub');
            const btnSubmit = document.getElementById('btn-submit-task-email');
            const noMailBtn = document.getElementById('btn-no-task-email');

            if (taskTitleEl) taskTitleEl.innerText = title;
            if (taskSubEl) {
                let sub = clientName ? 'Kunde: ' + clientName : 'Allgemeine Aufgabe';
                if (assignee) sub += ' • Bearbeiter: ' + (assignee === 'adrian' ? 'Adrian' : (assignee === 'basti' ? 'Basti' : assignee));
                taskSubEl.innerText = sub;
            }

            // Preselect Adrian / Basti based on assignee
            const chkAdrian = document.getElementById('chk-recipient-adrian');
            const chkBasti = document.getElementById('chk-recipient-basti');
            if (chkAdrian) chkAdrian.checked = (assignee === 'adrian' || !assignee);
            if (chkBasti) chkBasti.checked = (assignee === 'basti' || !assignee);

            if (options.isCompletion) {
                if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--color-green);"></i> <span>Aufgabe erledigt! E-Mail senden?</span>';
                if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Erledigen & E-Mail senden</span>';
                if (noMailBtn) noMailBtn.style.display = 'inline-flex';
            } else {
                if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-paper-plane" style="color: var(--color-cyan);"></i> <span>Aufgabe per E-Mail senden</span>';
                if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>E-Mail versenden</span>';
                if (noMailBtn) noMailBtn.style.display = 'none';
            }

            if (modal) modal.style.display = 'flex';
        }

        function openTaskCompleteEmailModal(taskIdOrTodoId, title, clientName, assignee, clientId, todoId) {
            let options = { isCompletion: true };
            if (clientId && todoId) {
                options.clientId = clientId;
                options.todoId = todoId;
            } else {
                options.taskId = taskIdOrTodoId;
            }
            openTaskEmailModal(title, clientName, assignee, options);
        }

        function closeTaskEmailModal() {
            const modal = document.getElementById('task-email-modal');
            if (modal) modal.style.display = 'none';
            currentTaskEmailData = null;
        }

        async function skipEmailAndCompleteTask() {
            if (!currentTaskEmailData) return;
            const data = { ...currentTaskEmailData };
            closeTaskEmailModal();

            if (data.taskId) {
                await toggleCustomTask(data.taskId);
            } else if (data.todoId && data.clientId) {
                await toggleTodo(data.clientId, data.todoId, true);
            }
        }

        async function submitTaskEmailModal() {
            if (!currentTaskEmailData) return;
            const chkAdrian = document.getElementById('chk-recipient-adrian');
            const chkBasti = document.getElementById('chk-recipient-basti');
            
            const recipients = [];
            if (chkAdrian && chkAdrian.checked) recipients.push('adrian');
            if (chkBasti && chkBasti.checked) recipients.push('basti');

            if (recipients.length === 0) {
                alert('Bitte wähle mindestens einen Empfänger (Adrian oder Basti) aus.');
                return;
            }

            const data = { ...currentTaskEmailData };
            const btnSubmit = document.getElementById('btn-submit-task-email');
            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Senden...';
            }

            try {
                const res = await fetch('/api/tasks/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        recipients: recipients,
                        taskTitle: data.title,
                        clientName: data.clientName,
                        assignee: data.assignee,
                        type: data.isCompletion ? 'completion' : 'notification'
                    })
                });

                const result = await res.json();
                if (!res.ok || !result.success) {
                    alert('Fehler beim Senden der E-Mail: ' + (result.error || 'Unbekannter Fehler'));
                }
            } catch(e) {
                console.error('Task email error:', e);
                alert('Fehler beim Senden der E-Mail.');
            } finally {
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>E-Mail versenden</span>';
                }
                closeTaskEmailModal();

                if (data.isCompletion) {
                    if (data.taskId) {
                        await toggleCustomTask(data.taskId);
                    } else if (data.todoId && data.clientId) {
                        await toggleTodo(data.clientId, data.todoId, true);
                    }
                }
            }
        }

        // --- COMPANY FILES HANDLERS ---
        let companyFilesData = [];

        async function loadCompanyFiles() {
            try {
                const res = await fetch('/api/company-files');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.files)) {
                        companyFilesData = data.files;
                        renderCompanyFiles();
                    }
                }
            } catch(e) {
                console.error('Error loading company files:', e);
            }
        }

        function renderCompanyFiles() {
            const container = document.getElementById('company-files-list');
            if (!container) return;
            container.innerHTML = '';

            if (!companyFilesData || companyFilesData.length === 0) {
                container.innerHTML = '<div style="font-size: 12.5px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-color); padding: 14px; border-radius: 8px; width: 100%; box-sizing: border-box;">' +
                    '<i class="fa-solid fa-info-circle" style="color: var(--color-cyan);"></i>' +
                    'Keine Unternehmens-Dateien hochgeladen. Klicke oben auf <strong>Datei hochladen</strong>, um Verträge, Vorlagen oder Dokumente abzulegen.' +
                '</div>';
                return;
            }

            companyFilesData.forEach(file => {
                const item = document.createElement('div');
                item.className = 'drive-item';
                item.style.background = 'rgba(255, 255, 255, 0.03)';
                item.style.borderColor = 'var(--border-color)';
                item.style.padding = '10px 14px';
                item.style.borderRadius = '8px';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'space-between';
                item.style.marginBottom = '6px';

                const sizeKb = file.size ? (file.size / 1024).toFixed(0) : 0;
                const sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';
                const dateStr = file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString('de-DE') : '';

                let iconClass = 'fa-file';
                let iconColor = 'var(--text-secondary)';
                const nameLower = (file.name || '').toLowerCase();
                if (nameLower.endsWith('.pdf')) {
                    iconClass = 'fa-file-pdf';
                    iconColor = '#ef4444';
                } else if (nameLower.endsWith('.png') || nameLower.endsWith('.jpg') || nameLower.endsWith('.jpeg') || nameLower.endsWith('.webp')) {
                    iconClass = 'fa-file-image';
                    iconColor = '#3b82f6';
                } else if (nameLower.endsWith('.zip') || nameLower.endsWith('.rar')) {
                    iconClass = 'fa-file-zipper';
                    iconColor = '#f59e0b';
                } else if (nameLower.endsWith('.doc') || nameLower.endsWith('.docx')) {
                    iconClass = 'fa-file-word';
                    iconColor = '#2563eb';
                }

                item.innerHTML = '<div style="display: flex; align-items: center; gap: 10px; min-width: 0; flex-grow: 1; margin-right: 8px;">' +
                    '<i class="fa-solid ' + iconClass + '" style="color: ' + iconColor + '; font-size: 16px; flex-shrink: 0;"></i>' +
                    '<div style="min-width: 0; flex-grow: 1; overflow: hidden;">' +
                        '<strong style="color: var(--text-primary); font-size: 13px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + file.name + '</strong>' +
                        '<div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">' + sizeStr + ' &bull; ' + dateStr + '</div>' +
                    '</div>' +
                '</div>' +
                '<div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">' +
                    '<a href="' + file.url + '" target="_blank" class="btn" title="Ansehen / Öffnen" style="padding: 5px 8px; font-size: 11px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">' +
                        '<i class="fa-solid fa-arrow-up-right-from-square"></i>' +
                    '</a>' +
                    '<button type="button" class="btn" onclick="deleteCompanyFile(&quot;' + file.id + '&quot;, &quot;' + file.r2Path.replace(/'/g, "\\'") + '&quot;)" title="Löschen" style="padding: 5px 8px; font-size: 11px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: var(--color-red);">' +
                        '<i class="fa-solid fa-trash"></i>' +
                    '</button>' +
                '</div>';
                container.appendChild(item);
            });
        }

        async function uploadCompanyFile(event) {
            const files = event.target.files;
            if (!files || files.length === 0) return;

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);

                try {
                    const res = await fetch('/api/company-files/upload', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();
                    if (data.success && Array.isArray(data.files)) {
                        companyFilesData = data.files;
                        renderCompanyFiles();
                    } else {
                        alert('Fehler beim Upload von ' + files[i].name + ': ' + (data.error || 'Unbekannter Fehler'));
                    }
                } catch(e) {
                    console.error('Company file upload error:', e);
                    alert('Fehler beim Upload von ' + files[i].name);
                }
            }
            event.target.value = '';
        }

        async function deleteCompanyFile(id, r2Path) {
            if (!confirm('Möchtest du diese Unternehmens-Datei wirklich löschen?')) return;
            try {
                const res = await fetch('/api/company-files/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, r2Path })
                });
                const data = await res.json();
                if (data.success && Array.isArray(data.files)) {
                    companyFilesData = data.files;
                    renderCompanyFiles();
                }
            } catch(e) {
                console.error('Error deleting company file:', e);
            }
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
            const signature = document.getElementById('mail-signature').value;
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
                        body,
                        signature,
                        attachments: mailAttachments
                    })
                });

                const data = await res.json();

                if (res.ok || res.status === 207) {
                    if (data.success) {
                        statusMsg.innerHTML = '<span style="color: var(--color-green); font-weight: 600;"><i class="fa-solid fa-circle-check"></i> E-Mail erfolgreich gesendet!</span>';
                        document.getElementById('mail-subject').value = '';
                        document.getElementById('mail-body').value = '';
                        selectedMailRecipients = [];
                        mailAttachments = [];
                        renderMailAttachmentsList();
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
                console.error('Mail sending error:', e);
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
            // Live-Uhrzeit & Datum sofort starten
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

            // Restore chat collapse state
            const chatCollapsed = localStorage.getItem('chat_collapsed') === '1';
            if (chatCollapsed) {
                const cp = document.querySelector('.chat-panel');
                const chevron = document.getElementById('chat-toggle-chevron');
                if (cp) cp.classList.add('collapsed');
                if (chevron) chevron.className = 'fa-solid fa-chevron-left';
            }

            try { await loadCloudflareProjects(); } catch(e) { console.error('CF projects init error:', e); }
            try { await loadClients(); } catch(e) { console.error('Clients init error:', e); }
            try { await loadCompanyFiles(); } catch(e) { console.error('Company files init error:', e); }
            try { updateGlobalStats(); } catch(e) { console.error('Global stats init error:', e); }
            try { initDragAndDrop(); } catch(e) { console.error('Drag drop init error:', e); }
            try { await loadImapSettings(); } catch(e) { console.error('IMAP settings init error:', e); }
            try { await updateSystemChecklist(); } catch(e) { console.error('System checklist init error:', e); }
            
            // Sync emails on load and every 5 minutes silently
            try { syncEmails(true); } catch(e) {}
            setInterval(() => { try { syncEmails(true); } catch(e) {} }, 5 * 60 * 1000);
            setInterval(() => { try { updateSystemChecklist(); } catch(e) {} }, 60 * 1000);
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
                if (res.status === 401) {
                    window.location.reload();
                    return;
                }
                const loaded = await res.json();
                if (loaded && loaded.error === 'Unauthorized') {
                    window.location.reload();
                    return;
                }
                clients = Array.isArray(loaded) ? loaded : [];
                renderClientList();
                if (activeClient) {
                    // Refresh current active client data
                    const refreshed = clients.find(c => c.id === activeClient.id);
                    if (refreshed) {
                        activeClient = refreshed;
                        // Only refresh client view UI if client view is currently active
                        const clientView = document.getElementById('client-view');
                        if (clientView && clientView.style.display !== 'none') {
                            selectClient(refreshed);
                        }
                    }
                }
            } catch(e) {
                console.error("Fehler beim Laden der Kunden:", e);
            }

            try {
                await fetchCustomTasks();
            } catch(e) {
                console.error("Fehler beim Laden der Aufgaben:", e);
            }



            try {
                if (typeof updateGlobalStats === 'function') updateGlobalStats();
            } catch(e) {
                console.error("Fehler beim Aktualisieren der Dashboard-Stats:", e);
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
            if (typeof client === 'string') {
                const found = clients.find(c => c.id === client);
                if (found) client = found;
                else client = { id: client, name: 'Kunde' };
            }
            activeClient = client;
            closeMobileDrawers();

            document.querySelectorAll('.client-item').forEach(el => el.classList.remove('active'));
            const activeEl = document.getElementById('client-item-' + client.id);
            if (activeEl) {
                activeEl.classList.add('active');
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('client-view').style.display = 'flex';
            const routingS = document.getElementById('routing-screen');
            if (routingS) routingS.style.display = 'none';
            document.getElementById('mail-screen').style.display = 'none';

            document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

            // Update title & status
            document.getElementById('active-client-name').innerHTML = client.name + (client.isDraft ? ' <span class="draft-badge" style="font-size: 11px; color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.25); background: rgba(245, 158, 11, 0.05); padding: 3px 8px; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 10px; vertical-align: middle; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-pen-ruler" style="font-size:9px;"></i> Entwurf</span>' : '');
            const statusPill = document.getElementById('active-client-status');
            statusPill.className = 'status-pill ' + client.status;
            statusPill.querySelector('.status-text').innerText = client.status === 'green' ? 'Alles OK' : 'Aktion erforderlich';

            // Populate contact info bar in header
            const emailLink = document.getElementById('header-email-link');
            if (emailLink) {
                emailLink.innerText = client.email || 'Keine E-Mail';
                emailLink.href = client.email ? 'mailto:' + client.email : '#';
            }

            const personText = document.getElementById('header-contact-person-text');
            const personWrapper = document.getElementById('header-contact-person-wrapper');
            if (personText && personWrapper) {
                if (client.contactPerson && client.contactPerson.trim()) {
                    personText.innerText = client.contactPerson.trim();
                    personWrapper.style.display = 'inline-flex';
                } else {
                    personWrapper.style.display = 'none';
                }
            }

            const phoneLink = document.getElementById('header-phone-link');
            const phoneWrapper = document.getElementById('header-contact-phone-wrapper');
            if (phoneLink && phoneWrapper) {
                if (client.phone && client.phone.trim()) {
                    phoneLink.innerText = client.phone.trim();
                    phoneLink.href = 'tel:' + client.phone.trim().replace(/\s+/g, '');
                    phoneWrapper.style.display = 'inline-flex';
                } else {
                    phoneWrapper.style.display = 'none';
                }
            }

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
            try { renderTodos(client); } catch(e) { console.error("renderTodos error:", e); }

            // Render Cloudflare info
            try { renderCloudflareStatus(client); } catch(e) { console.error("renderCloudflareStatus error:", e); }



            // Render Contracts
            try { renderContracts(client); } catch(e) { console.error("renderContracts error:", e); }

            // Fetch E-Mail logs
            try { loadEmailLogs(client.id); } catch(e) { console.error("loadEmailLogs error:", e); }

            // Update suggested chat button
            const suggestBtn = document.getElementById('suggest-client-btn');
            if (suggestBtn) {
                suggestBtn.style.display = 'block';
                suggestBtn.innerText = 'Info zu ' + client.name;
            }

            // Highlight in list
            renderClientList();
        }

        let isClientPasswordRevealed = false;

        // Render Admin Area Link and Admin Password Display
        function renderClientAdminAuth(client, baseUrl) {
            const adminBox = document.getElementById('cf-admin-box');
            const adminUrlEl = document.getElementById('cf-admin-url');
            const passDisplay = document.getElementById('client-admin-password-display');
            const toggleBtn = document.getElementById('btn-toggle-client-password');
            const copyBtn = document.getElementById('btn-copy-client-password');
            const eyeIcon = document.getElementById('client-password-eye-icon');

            if (!adminBox) return;

            // Determine Admin URL
            let adminUrl = null;
            if (client && client.customDomain && client.customDomain.trim()) {
                let clean = client.customDomain.trim();
                if (clean.toLowerCase().startsWith('https://')) clean = clean.substring(8);
                else if (clean.toLowerCase().startsWith('http://')) clean = clean.substring(7);
                while (clean.endsWith('/')) clean = clean.substring(0, clean.length - 1);
                adminUrl = 'https://' + clean + '/admin';
            } else if (baseUrl && baseUrl !== '#' && baseUrl !== '-') {
                let clean = baseUrl.trim();
                while (clean.endsWith('/')) clean = clean.substring(0, clean.length - 1);
                adminUrl = clean.startsWith('http') ? clean + '/admin' : 'https://' + clean + '/admin';
            }

            if (adminUrlEl) {
                if (adminUrl) {
                    adminUrlEl.href = adminUrl;
                    adminUrlEl.style.opacity = '1';
                    adminUrlEl.style.pointerEvents = 'auto';
                    adminUrlEl.title = 'Öffne ' + adminUrl;
                } else {
                    adminUrlEl.href = '#';
                    adminUrlEl.style.opacity = '0.5';
                    adminUrlEl.style.pointerEvents = 'none';
                    adminUrlEl.title = 'Keine Website-URL hinterlegt';
                }
            }

            // Display Admin Password
            const rawPass = (client && client.adminPassword) ? String(client.adminPassword).trim() : '';
            if (passDisplay) {
                if (rawPass) {
                    if (isClientPasswordRevealed) {
                        passDisplay.innerText = rawPass;
                        passDisplay.style.color = '#34d399';
                        passDisplay.style.fontStyle = 'normal';
                    } else {
                        passDisplay.innerText = '••••••••••••';
                        passDisplay.style.color = '#34d399';
                        passDisplay.style.fontStyle = 'normal';
                    }
                    if (eyeIcon) {
                        eyeIcon.className = isClientPasswordRevealed ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
                    }
                    if (toggleBtn) toggleBtn.style.display = 'inline-flex';
                    if (copyBtn) copyBtn.style.display = 'inline-flex';
                } else {
                    passDisplay.innerHTML = '<span style="color: var(--text-secondary); font-style: italic; font-size: 11px;">Kein Passwort hinterlegt</span>';
                    if (toggleBtn) toggleBtn.style.display = 'none';
                    if (copyBtn) copyBtn.style.display = 'none';
                }
            }
        }

        function toggleClientPasswordDisplay() {
            isClientPasswordRevealed = !isClientPasswordRevealed;
            if (activeClient) {
                const projectUrlEl = document.getElementById('cf-project-url');
                const baseUrl = projectUrlEl ? projectUrlEl.href : null;
                renderClientAdminAuth(activeClient, baseUrl);
            }
        }

        async function copyClientAdminPassword() {
            if (!activeClient || !activeClient.adminPassword) return;
            try {
                await navigator.clipboard.writeText(activeClient.adminPassword);
                const btnText = document.getElementById('copy-password-btn-text');
                const copyBtn = document.getElementById('btn-copy-client-password');
                if (btnText && copyBtn) {
                    const originalHtml = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #34d399;"></i> <span style="color: #34d399;">Kopiert!</span>';
                    copyBtn.style.background = 'rgba(16, 185, 129, 0.3)';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHtml;
                        copyBtn.style.background = 'rgba(16, 185, 129, 0.15)';
                    }, 2000);
                }
            } catch(e) {
                console.error("Fehler beim Kopieren:", e);
            }
        }

        function toggleModalPasswordVisibility() {
            const input = document.getElementById('modal-client-admin-password');
            const icon = document.getElementById('modal-password-eye-icon');
            if (input && icon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fa-solid fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fa-solid fa-eye';
                }
            }
        }

        function generateRandomAdminPassword() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!#%&*+';
            let pass = 'SF.';
            for (let i = 0; i < 8; i++) {
                pass += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            pass += '#';
            const input = document.getElementById('modal-client-admin-password');
            const icon = document.getElementById('modal-password-eye-icon');
            if (input) {
                input.type = 'text';
                input.value = pass;
                if (icon) icon.className = 'fa-solid fa-eye-slash';
            }
        }

        // Render Cloudflare details from cache
        function renderCloudflareStatus(client) {
            const cfName = client.linkedCloudflareProject;
            const projectNameEl = document.getElementById('cf-project-name');
            const projectStatusEl = document.getElementById('cf-project-status');
            const projectUrlEl = document.getElementById('cf-project-url');
            const projectModEl = document.getElementById('cf-project-modified');

            let determinedBaseUrl = null;

            if (!cfName) {
                projectNameEl.innerText = '-';
                projectStatusEl.innerText = 'Keine Website verknüpft';
                projectStatusEl.style.color = 'var(--text-secondary)';
                projectUrlEl.innerText = '-';
                projectUrlEl.href = '#';
                projectModEl.innerText = '-';
                renderClientAdminAuth(client, null);
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
                determinedBaseUrl = 'https://' + pageProj.subdomain;
                projectModEl.innerText = new Date(pageProj.created_on).toLocaleDateString('de-DE');
                renderClientAdminAuth(client, determinedBaseUrl);
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
                if (customDomain && customDomain.hostname && !customDomain.hostname.includes('workers.dev') && !customDomain.hostname.includes('pages.dev')) {
                    projectUrlEl.innerText = customDomain.hostname;
                    projectUrlEl.href = 'https://' + customDomain.hostname;
                    determinedBaseUrl = 'https://' + customDomain.hostname;
                    // If a real custom domain is active, customer is no longer a draft!
                    if (client.isDraft) {
                        client.isDraft = false;
                        const nameEl = document.getElementById('active-client-name');
                        if (nameEl) nameEl.innerHTML = client.name;
                    }
                } else if (cfProjects.workersSubdomain) {
                    // Fallback to default workers.dev subdomain link
                    const devUrl = workerProj.id + '.' + cfProjects.workersSubdomain + '.workers.dev';
                    projectUrlEl.innerText = devUrl;
                    projectUrlEl.href = 'https://' + devUrl;
                    determinedBaseUrl = 'https://' + devUrl;
                } else {
                    projectUrlEl.innerText = 'Worker (Keine Custom Domain)';
                    projectUrlEl.href = '#';
                }
                
                projectModEl.innerText = new Date(workerProj.modified_on).toLocaleDateString('de-DE');
                renderClientAdminAuth(client, determinedBaseUrl);
                return;
            }

            // Not found
            projectNameEl.innerText = cfName;
            projectStatusEl.innerText = 'Projekt unauffindbar';
            projectStatusEl.style.color = 'var(--color-red)';
            projectUrlEl.innerText = '-';
            projectUrlEl.href = '#';
            projectModEl.innerText = '-';
            renderClientAdminAuth(client, null);
        }

        // Render Contracts (R2)
        function renderContracts(client) {
            const list = document.getElementById('contracts-list');
            if (!list) return;
            list.innerHTML = '';
            const contracts = (client && Array.isArray(client.contracts)) ? client.contracts : [];
            
            if (contracts.length === 0) {
                list.innerHTML = '<li style="font-size: 13px; color: var(--text-secondary); padding: 8px 0;">Noch keine Verträge hochgeladen.</li>';
                return;
            }

            contracts.forEach((c, idx) => {
                const item = document.createElement('li');
                item.className = 'file-item';
                const sizeKb = c.size ? Math.max(1, Math.round(c.size / 1024)) : 1;

                // Determine file icon
                const fileName = c.name || 'Dokument';
                const isPdf = fileName.toLowerCase().endsWith('.pdf');
                const isDoc = fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx');
                const iconClass = isPdf ? 'fa-solid fa-file-pdf' : (isDoc ? 'fa-solid fa-file-word' : 'fa-solid fa-file-lines');
                const iconColor = isPdf ? '#ef4444' : (isDoc ? '#3b82f6' : '#94a3b8');

                // Rewrite direct R2 links to the download proxy
                let downloadUrl = c.url || '#';
                if (c.r2Path) {
                    downloadUrl = \`/api/contracts/download?path=\${encodeURIComponent(c.r2Path)}\`;
                } else if (c.url && c.url.includes('.r2.dev/')) {
                    const parts = c.url.split('.r2.dev/');
                    if (parts.length > 1) {
                        downloadUrl = \`/api/contracts/download?path=\${encodeURIComponent(parts[1])}\`;
                    }
                }

                const uploadDate = c.uploadedAt ? new Date(c.uploadedAt).toLocaleDateString('de-DE') : '-';

                item.innerHTML = \`
                    <a href="\${downloadUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text-primary); font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 65%;">
                        <i class="\${iconClass}" style="color: \${iconColor}; font-size: 15px; flex-shrink: 0;"></i>
                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${escapeHtml(fileName)}</span>
                        <span style="font-size: 11px; color: var(--text-secondary); opacity: 0.7; flex-shrink: 0;">(\${sizeKb} KB)</span>
                    </a>
                    <div style="display: flex; align-items: center; gap: 12px; flex-shrink: 0;">
                        <span style="font-size: 11px; color: var(--text-secondary); opacity: 0.8;">\${uploadDate}</span>
                        <button class="btn-delete-contract" data-client-id="\${client.id}" data-r2-path="\${escapeHtml(c.r2Path || '')}" data-name="\${escapeHtml(fileName)}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Vertrag löschen">
                            <i class="fa-solid fa-trash-can" style="font-size: 13px;"></i>
                        </button>
                    </div>
                \`;

                // Add delete event listener cleanly
                const delBtn = item.querySelector('.btn-delete-contract');
                if (delBtn) {
                    delBtn.onclick = (e) => {
                        e.stopPropagation();
                        deleteContract(client.id, c.r2Path || '', fileName);
                    };
                }

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
                        if (data.customer && data.customer.contracts) {
                            activeClient.contracts = data.customer.contracts;
                        } else {
                            activeClient.contracts = (activeClient.contracts || []).filter(c => c.r2Path !== r2Path);
                        }
                        renderContracts(activeClient);
                    }
                    // Reload clients cache
                    await loadClients();
                } else {
                    alert('Fehler beim Löschen des Vertrags: ' + (data.error || 'Unbekannter Fehler'));
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
                
                const assigneeBadge = t.assignee === 'adrian' 
                    ? '<span style="font-size:10px; background:rgba(59, 130, 246, 0.15); border:1px solid rgba(59, 130, 246, 0.3); color:#60a5fa; padding:2px 6px; border-radius:4px; font-weight:700; margin-left:6px;">Adrian</span>'
                    : (t.assignee === 'basti'
                        ? '<span style="font-size:10px; background:rgba(236, 72, 153, 0.15); border:1px solid rgba(244, 114, 182, 0.3); color:#f472b6; padding:2px 6px; border-radius:4px; font-weight:700; margin-left:6px;">Basti</span>'
                        : '');

                const escapedText = (t.text || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                const escapedClientName = (client.name || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');

                item.innerHTML = \`
                    <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                        <div style="display:flex; align-items:center; gap:12px; flex:1; text-align: left; min-width: 0;">
                            \${t.done 
                                ? \`<button onclick="toggleTodo('\${client.id}', '\${t.id}', false)" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 10px; padding: 2px 8px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight:600;" title="Aufgabe wiedereröffnen"><i class="fa-solid fa-circle-check"></i> Erledigt</button>\`
                                : \`<button onclick="openTaskCompleteEmailModal('\${t.id}', '\${escapedText}', '\${escapedClientName}', '\${t.assignee || ''}', '\${client.id}', '\${t.id}')" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 10px; padding: 2px 8px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight:700;" title="Als erledigt markieren"><i class="fa-solid fa-circle-exclamation"></i> Offen</button>\`
                            }
                            <span style="\${t.done ? 'text-decoration:line-through; color:var(--text-secondary);' : 'color:#fff;'}">\${t.text}</span>
                            \${assigneeBadge}
                        </div>
                        <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
                            <button onclick="openTaskEmailModal('\${escapedText}', '\${escapedClientName}', '\${t.assignee || ''}')" style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; cursor: pointer; padding: 3px 6px; border-radius: 4px; font-size: 10px; display: inline-flex; align-items: center;" title="Per E-Mail senden">
                                <i class="fa-solid fa-paper-plane"></i>
                            </button>
                            <button onclick="deleteTodo('\${client.id}', '\${t.id}')" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:2px; opacity:0.8; display:inline-flex; align-items:center; margin-left:4px;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'" title="Löschen">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
\`;
                list.appendChild(item);
            });
        }

        async function addTodo() {
            if (!activeClient) return;
            const input = document.getElementById('new-todo-input');
            const text = input ? input.value.trim() : '';
            if (!text) return;

            const assigneeSelect = document.getElementById('new-todo-assignee');
            const assignee = assigneeSelect ? assigneeSelect.value : '';

            activeClient.todos = activeClient.todos || [];
            activeClient.todos.push({
                id: 'todo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
                text: text,
                assignee: assignee || null,
                done: false
            });

            if (input) input.value = '';
            if (assigneeSelect) assigneeSelect.value = '';
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

                    // Sync local customTasksData so completed tasks disappear from Dashboard
                    if (Array.isArray(customTasksData)) {
                        (data.customer.todos || []).forEach(td => {
                            customTasksData.forEach(ct => {
                                if (ct.clientId === client.id && (ct.id === td.id || ct.title === td.text)) {
                                    ct.completed = td.done;
                                }
                            });
                        });
                    }

                    if (activeClient && activeClient.id === client.id) {
                        activeClient.status = data.customer.status;
                        activeClient.statusReason = data.customer.statusReason;
                        activeClient.todos = data.customer.todos;
                    }

                    updateGlobalStats();
                    renderClientList();
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
            const input = document.getElementById('contract-file-input');
            if (input) {
                input.value = '';
                input.click();
            }
        }

        function uploadContract(event) {
            const files = event.target.files;
            if (files && files.length > 0) {
                performUpload(files[0]);
            }
        }

        async function performUpload(file) {
            if (!activeClient) {
                alert('Bitte wähle zuerst einen Kunden aus.');
                return;
            }
            
            const uploaderZone = document.getElementById('uploader-zone');
            const uploaderText = uploaderZone ? uploaderZone.querySelector('p') : null;
            if (uploaderText) uploaderText.innerText = "Lade hoch... " + file.name;

            const fd = new FormData();
            fd.append('clientId', activeClient.id);
            fd.append('file', file);

            try {
                const res = await fetch('/api/contracts', {
                    method: 'POST',
                    body: fd
                });
                const data = await res.json();
                if (data.success && data.contract) {
                    if (uploaderText) uploaderText.innerText = "Vertrag hochladen (PDF, Word...)";
                    
                    // Immediately update local activeClient contracts and UI
                    activeClient.contracts = activeClient.contracts || [];
                    activeClient.contracts.unshift(data.contract);
                    renderContracts(activeClient);

                    // Clear file input
                    const fileInput = document.getElementById('contract-file-input');
                    if (fileInput) fileInput.value = '';

                    // Synchronize clients in background
                    await loadClients();
                } else {
                    alert("Fehler beim Upload: " + (data.error || "Unbekannter Fehler"));
                    if (uploaderText) uploaderText.innerText = "Vertrag hochladen (PDF, Word...)";
                }
            } catch (e) {
                console.error("Upload error:", e);
                alert("Upload fehlgeschlagen. Bitte prüfe die Internetverbindung.");
                if (uploaderText) uploaderText.innerText = "Vertrag hochladen (PDF, Word...)";
            } finally {
                const fileInput = document.getElementById('contract-file-input');
                if (fileInput) fileInput.value = '';
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

        function openAddClientModal() {
            document.getElementById('modal-title').innerText = "Kunde hinzufügen";
            document.getElementById('modal-client-id').value = "";
            document.getElementById('client-form').reset();
            const contactInput = document.getElementById('modal-client-contact');
            if (contactInput) contactInput.value = "";
            const phoneInput = document.getElementById('modal-client-phone');
            if (phoneInput) phoneInput.value = "";
            const passInput = document.getElementById('modal-client-admin-password');
            if (passInput) {
                passInput.value = "";
                passInput.type = "password";
            }
            const passIcon = document.getElementById('modal-password-eye-icon');
            if (passIcon) passIcon.className = "fa-solid fa-eye";
            document.getElementById('client-modal').style.display = 'flex';
        }

        function openEditClientModal() {
            if (!activeClient) return;
            document.getElementById('modal-title').innerText = "Kunde bearbeiten";
            document.getElementById('modal-client-id').value = activeClient.id;
            document.getElementById('modal-client-name').value = activeClient.name;
            document.getElementById('modal-client-email').value = activeClient.email || '';
            const contactInput = document.getElementById('modal-client-contact');
            if (contactInput) contactInput.value = activeClient.contactPerson || '';
            const phoneInput = document.getElementById('modal-client-phone');
            if (phoneInput) phoneInput.value = activeClient.phone || '';
            document.getElementById('modal-client-cf').value = activeClient.linkedCloudflareProject || '';
            document.getElementById('modal-client-domain').value = activeClient.customDomain || '';

            const passInput = document.getElementById('modal-client-admin-password');
            if (passInput) {
                passInput.value = activeClient.adminPassword || '';
                passInput.type = "password";
            }
            const passIcon = document.getElementById('modal-password-eye-icon');
            if (passIcon) passIcon.className = "fa-solid fa-eye";

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
            const contactInput = document.getElementById('modal-client-contact');
            const contactPerson = contactInput ? contactInput.value.trim() : '';
            const phoneInput = document.getElementById('modal-client-phone');
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const linkedCloudflareProject = document.getElementById('modal-client-cf').value;
            const customDomain = document.getElementById('modal-client-domain').value.trim();
            const passInput = document.getElementById('modal-client-admin-password');
            const adminPassword = passInput ? passInput.value.trim() : '';

            const payload = { 
                name, 
                email, 
                contactPerson, 
                phone, 
                linkedCloudflareProject, 
                customDomain,
                adminPassword
            };
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
                    if (data.customer) {
                        selectClient(data.customer); // Autoselect and update UI instantly
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
            const routingScreen = document.getElementById('routing-screen');
            if (routingScreen) routingScreen.style.display = 'none';
            document.getElementById('mail-screen').style.display = 'none';
            
            document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
            
            if (viewName === 'hub') {
                document.getElementById('welcome-screen').style.display = 'flex';
                document.getElementById('nav-btn-hub').classList.add('active');
            } else if (viewName === 'routing') {
                if (routingScreen) routingScreen.style.display = 'flex';
                const routingBtn = document.getElementById('nav-btn-routing');
                if (routingBtn) routingBtn.classList.add('active');
                loadRoutingView();
            } else if (viewName === 'mail') {
                document.getElementById('mail-screen').style.display = 'flex';
                const mailBtn = document.getElementById('nav-btn-mail');
                if (mailBtn) mailBtn.classList.add('active');
                initMailScreen();
            }
        }

        // --- E-MAIL VERTEILER & MASTER HUB LOGIC ---
        let currentRoutingTab = 'verteiler';
        const ROUTING_URLS = {
            verteiler: 'https://friesescholzwebdesign.pages.dev/admin',
            masterhub: 'https://dashboard.friese-scholz.workers.dev/'
        };

        function switchRoutingTab(tabName) {
            currentRoutingTab = tabName;
            document.querySelectorAll('.routing-tab-btn').forEach(btn => btn.classList.remove('active'));
            
            const activeBtn = document.getElementById('tab-btn-' + tabName);
            if (activeBtn) activeBtn.classList.add('active');

            const iframeVerteiler = document.getElementById('routing-iframe-verteiler');
            const iframeMasterhub = document.getElementById('routing-iframe-masterhub');

            if (tabName === 'verteiler') {
                if (iframeVerteiler) {
                    if (iframeVerteiler.src === 'about:blank' || !iframeVerteiler.src) {
                        iframeVerteiler.src = ROUTING_URLS.verteiler;
                    }
                    iframeVerteiler.style.display = 'block';
                }
                if (iframeMasterhub) iframeMasterhub.style.display = 'none';
            } else if (tabName === 'masterhub') {
                if (iframeMasterhub) {
                    if (iframeMasterhub.src === 'about:blank' || !iframeMasterhub.src) {
                        iframeMasterhub.src = ROUTING_URLS.masterhub;
                    }
                    iframeMasterhub.style.display = 'block';
                }
                if (iframeVerteiler) iframeVerteiler.style.display = 'none';
            }
        }

        function reloadCurrentRoutingIframe() {
            const iframeId = currentRoutingTab === 'verteiler' ? 'routing-iframe-verteiler' : 'routing-iframe-masterhub';
            const iframe = document.getElementById(iframeId);
            if (iframe) {
                iframe.src = ROUTING_URLS[currentRoutingTab];
            }
        }

        function openCurrentRoutingInNewTab() {
            const targetUrl = ROUTING_URLS[currentRoutingTab] || ROUTING_URLS.verteiler;
            window.open(targetUrl, '_blank');
        }

        function loadRoutingView() {
            switchRoutingTab(currentRoutingTab);
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
        let commandCenterTaskFilter = 'all';

        function taskMatchesFilter(text, assignee, filter) {
            if (!filter || filter === 'all') return true;
            const str = ((text || '') + ' ' + (assignee || '')).toLowerCase();
            if (filter === 'adrian') {
                return str.includes('adrian');
            }
            if (filter === 'basti') {
                return str.includes('basti') || str.includes('bastian');
            }
            return true;
        }

        function setCommandCenterTaskFilter(filter) {
            commandCenterTaskFilter = filter;
            
            const btnAll = document.getElementById('task-filter-all');
            const btnAdrian = document.getElementById('task-filter-adrian');
            const btnBasti = document.getElementById('task-filter-basti');

            [btnAll, btnAdrian, btnBasti].forEach(btn => {
                if (btn) {
                    btn.style.background = 'rgba(255, 255, 255, 0.05)';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    btn.style.boxShadow = 'none';
                    btn.style.color = 'var(--text-secondary)';
                }
            });

            if (filter === 'all' && btnAll) {
                btnAll.style.background = 'rgba(59, 130, 246, 0.18)';
                btnAll.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                btnAll.style.color = '#fff';
            } else if (filter === 'adrian' && btnAdrian) {
                btnAdrian.style.background = 'rgba(59, 130, 246, 0.25)';
                btnAdrian.style.borderColor = '#3b82f6';
                btnAdrian.style.color = '#60a5fa';
                btnAdrian.style.boxShadow = '0 0 12px rgba(59, 130, 246, 0.3)';
            } else if (filter === 'basti' && btnBasti) {
                btnBasti.style.background = 'rgba(236, 72, 153, 0.25)';
                btnBasti.style.borderColor = '#ec4899';
                btnBasti.style.color = '#f472b6';
                btnBasti.style.boxShadow = '0 0 12px rgba(236, 72, 153, 0.3)';
            }

            updateGlobalStats();
        }

        function updateGlobalStats() {
            const okCount = (Array.isArray(clients) ? clients : []).filter(c => c && c.status === 'green').length;
            const redCount = (Array.isArray(clients) ? clients : []).filter(c => c && c.status === 'red').length;
            
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

            const openCustomTasks = (Array.isArray(customTasksData) ? customTasksData : []).filter(t => t && !t.completed);
            const redClients = (Array.isArray(clients) ? clients : []).filter(c => c && c.status === 'red');
            const totalAlertsCount = redClients.length + openCustomTasks.length;

            // Calculate Task Counts per Filter for Pills (All, Adrian, Basti)
            let countAll = 0;
            let countAdrian = 0;
            let countBasti = 0;

            const generalTasks = openCustomTasks.filter(t => !t.clientId);
            generalTasks.forEach(t => {
                countAll++;
                if (taskMatchesFilter(t.title, t.assignee, 'adrian')) countAdrian++;
                if (taskMatchesFilter(t.title, t.assignee, 'basti')) countBasti++;
            });

            redClients.forEach(c => {
                const openClientTodos = (c.todos || []).filter(td => !td.done);
                const openClientCustom = (customTasksData || []).filter(t => t.clientId === c.id && !t.completed);
                let allOpenTasks = [...openClientTodos.map(td => ({ text: td.text, assignee: td.assignee }))];
                openClientCustom.forEach(ct => {
                    if (!allOpenTasks.some(ot => ot.text === ct.title)) {
                        allOpenTasks.push({ text: ct.title, assignee: ct.assignee });
                    }
                });

                if (allOpenTasks.length > 0) {
                    allOpenTasks.forEach(ot => {
                        countAll++;
                        if (taskMatchesFilter(ot.text, ot.assignee, 'adrian')) countAdrian++;
                        if (taskMatchesFilter(ot.text, ot.assignee, 'basti')) countBasti++;
                    });
                } else {
                    countAll++;
                    if (taskMatchesFilter(c.statusReason || '', '', 'adrian')) countAdrian++;
                    if (taskMatchesFilter(c.statusReason || '', '', 'basti')) countBasti++;
                }
            });

            const cntAllEl = document.getElementById('task-count-all');
            const cntAdrianEl = document.getElementById('task-count-adrian');
            const cntBastiEl = document.getElementById('task-count-basti');
            if (cntAllEl) cntAllEl.innerText = '(' + countAll + ')';
            if (cntAdrianEl) cntAdrianEl.innerText = '(' + countAdrian + ')';
            if (cntBastiEl) cntBastiEl.innerText = '(' + countBasti + ')';

            if (ringEl && ringIcon && statusTitle && statusDesc) {
                if (totalAlertsCount > 0) {
                    ringEl.style.borderColor = 'var(--color-red)';
                    ringEl.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
                    ringEl.style.animation = 'pulse-red 2s infinite';
                    ringIcon.className = 'fa-solid fa-triangle-exclamation';
                    ringIcon.style.color = 'var(--color-red)';
                    
                    statusTitle.innerText = totalAlertsCount + ' Aktion(en) ausstehend';
                    statusDesc.innerText = 'Es gibt Kunden-Alarme oder offene Aufgaben in der Zentrale.';
                } else {
                    ringEl.style.borderColor = 'var(--color-green)';
                    ringEl.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
                    ringEl.style.animation = 'none';
                    ringIcon.className = 'fa-solid fa-check';
                    ringIcon.style.color = 'var(--color-green)';
                    
                    statusTitle.innerText = 'Alle Systeme nominal';
                    statusDesc.innerText = 'Sämtliche Kunden-Websites laufen stabil. Keine offenen Support-Mails oder Aufgaben ausstehend.';
                }
            }

            if (alertsList) {
                alertsList.innerHTML = '';
                
                // Filter general custom tasks
                const filteredGeneralTasks = generalTasks.filter(t => taskMatchesFilter(t.title, t.assignee, commandCenterTaskFilter));

                // Filter red clients
                const filteredRedClients = redClients.filter(c => {
                    if (commandCenterTaskFilter === 'all') return true;
                    const openClientTodos = (c.todos || []).filter(td => !td.done);
                    const openClientCustom = (customTasksData || []).filter(t => t.clientId === c.id && !t.completed);
                    let allOpenTasks = [...openClientTodos.map(td => ({ text: td.text, assignee: td.assignee }))];
                    openClientCustom.forEach(ct => {
                        if (!allOpenTasks.some(ot => ot.text === ct.title)) {
                            allOpenTasks.push({ text: ct.title, assignee: ct.assignee });
                        }
                    });

                    if (allOpenTasks.length > 0) {
                        return allOpenTasks.some(ot => taskMatchesFilter(ot.text, ot.assignee, commandCenterTaskFilter));
                    }
                    return taskMatchesFilter(c.statusReason || '', '', commandCenterTaskFilter);
                });

                if (filteredRedClients.length === 0 && filteredGeneralTasks.length === 0) {
                    const noTasksMsg = commandCenterTaskFilter === 'all' 
                        ? 'Keine ausstehenden Alarme oder Aufgaben. Großartige Arbeit!' 
                        : 'Keine ausstehenden Aufgaben für ' + (commandCenterTaskFilter === 'adrian' ? 'Adrian' : 'Basti') + '.';
                    alertsList.innerHTML = '<div style="font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box;">' +
                        '<i class="fa-solid fa-circle-check" style="color: var(--color-green);"></i>' +
                        noTasksMsg +
                    '</div>';
                } else {
                    // Render filtered general custom tasks
                    filteredGeneralTasks.forEach(t => {
                        const taskItem = document.createElement('div');
                        taskItem.className = 'drive-item';
                        
                        let bgColor = 'rgba(59, 130, 246, 0.08)';
                        let borderColor = 'rgba(59, 130, 246, 0.25)';
                        let iconHtml = '<i class="fa-solid fa-list-check" style="color: #60a5fa;"></i>';
                        let assigneeText = t.assignee === 'adrian' ? 'Adrian' : (t.assignee === 'basti' ? 'Basti' : null);

                        if (t.assignee === 'basti') {
                            bgColor = 'rgba(236, 72, 153, 0.08)';
                            borderColor = 'rgba(244, 114, 182, 0.3)';
                            iconHtml = '<i class="fa-solid fa-list-check" style="color: #f472b6;"></i>';
                        } else if (t.assignee === 'adrian') {
                            bgColor = 'rgba(59, 130, 246, 0.08)';
                            borderColor = 'rgba(59, 130, 246, 0.25)';
                            iconHtml = '<i class="fa-solid fa-list-check" style="color: #60a5fa;"></i>';
                        }

                        taskItem.style.background = bgColor;
                        taskItem.style.borderColor = borderColor;
                        taskItem.style.padding = '12px';
                        taskItem.style.display = 'flex';
                        taskItem.style.alignItems = 'center';
                        taskItem.style.justifyContent = 'space-between';
                        taskItem.style.marginBottom = '8px';

                        let metaText = 'Allgemeine Aufgabe';
                        if (assigneeText) metaText += ' &bull; Bearbeiter: ' + assigneeText;

                        const escapedTaskTitle = (t.title || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                        const taskClientName = t.clientName || '';
                        const escapedTaskClientName = taskClientName.replace(/'/g, "\\'").replace(/"/g, '&quot;');

                        taskItem.innerHTML = '<div style="display: flex; align-items: flex-start; gap: 10px; flex-grow: 1; min-width: 0; margin-right: 8px;">' +
                            '<div style="margin-top: 2px; flex-shrink: 0;">' + iconHtml + '</div>' +
                            '<div style="min-width: 0; flex-grow: 1; flex-shrink: 1; overflow: hidden;">' +
                                '<strong style="color: var(--text-primary); font-size: 13px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; overflow-wrap: anywhere; line-height: 1.35;">' + t.title + '</strong>' +
                                '<div style="font-size: 11px; color: var(--text-secondary); margin-top: 3px;">' + metaText + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0; align-self: center;">' +
                            '<button type="button" class="btn" onclick="openTaskCompleteEmailModal(&quot;' + t.id + '&quot;, &quot;' + escapedTaskTitle + '&quot;, &quot;' + escapedTaskClientName + '&quot;, &quot;' + (t.assignee || '') + '&quot;)" title="Erledigt" style="padding: 5px 8px; font-size: 11px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--color-green);">' +
                                '<i class="fa-solid fa-check"></i>' +
                            '</button>' +
                            '<button type="button" class="btn" onclick="openTaskEmailModal(&quot;' + escapedTaskTitle + '&quot;, &quot;' + escapedTaskClientName + '&quot;, &quot;' + (t.assignee || '') + '&quot;)" title="Per E-Mail senden" style="padding: 5px 8px; font-size: 11px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa;">' +
                                '<i class="fa-solid fa-paper-plane"></i>' +
                            '</button>' +
                            '<button type="button" class="btn" onclick="deleteCustomTask(&quot;' + t.id + '&quot;)" title="Löschen" style="padding: 5px 8px; font-size: 11px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: var(--color-red);">' +
                                '<i class="fa-solid fa-trash"></i>' +
                            '</button>' +
                        '</div>';
                        alertsList.appendChild(taskItem);
                    });

                    // Render filtered red clients
                    filteredRedClients.forEach(c => {
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
                        
                        // Gather all open tasks for this client that match the filter
                        const openClientTodos = (c.todos || []).filter(td => !td.done);
                        const openClientCustom = (customTasksData || []).filter(t => t.clientId === c.id && !t.completed);
                        
                        let allOpenTasks = [...openClientTodos.map(td => ({ text: td.text, assignee: td.assignee }))];
                        openClientCustom.forEach(ct => {
                            if (!allOpenTasks.some(ot => ot.text === ct.title)) {
                                allOpenTasks.push({ text: ct.title, assignee: ct.assignee });
                            }
                        });

                        const matchingTasks = allOpenTasks.filter(ot => taskMatchesFilter(ot.text, ot.assignee, commandCenterTaskFilter));

                        let reasonHtml = '';
                        if (matchingTasks.length > 0) {
                            reasonHtml = matchingTasks.map(ot => {
                                const assigneeTag = ot.assignee === 'adrian' 
                                    ? ' <span style="color: #60a5fa; font-weight: 600;">(Adrian)</span>' 
                                    : (ot.assignee === 'basti' 
                                        ? ' <span style="color: #f472b6; font-weight: 600;">(Basti)</span>' 
                                        : '');
                                return '<div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 3px; word-break: break-word; overflow-wrap: anywhere; display: flex; align-items: flex-start; gap: 6px;">' +
                                    '<span style="color: var(--color-red); font-weight: bold; line-height: 1;">&bull;</span>' +
                                    '<span style="line-height: 1.35;">Offene Aufgabe: ' + ot.text + assigneeTag + '</span>' +
                                '</div>';
                            }).join('');
                        } else {
                            reasonHtml = '<div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px; word-break: break-word; overflow-wrap: anywhere;">' + (c.statusReason || 'Aktion nötig') + '</div>';
                        }

                        alertItem.innerHTML = '<div style="display: flex; align-items: flex-start; gap: 10px; min-width: 0; flex-grow: 1; margin-right: 8px;">' +
                            '<div style="margin-top: 2px; flex-shrink: 0;"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-red);"></i></div>' +
                            '<div style="min-width: 0; flex-grow: 1; flex-shrink: 1; overflow: hidden;">' +
                                '<strong style="color: var(--text-primary); font-size: 13px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + c.name + '</strong>' +
                                reasonHtml +
                            '</div>' +
                        '</div>' +
                        '<span style="font-size: 10px; color: var(--color-red); font-weight: 700; background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px; text-transform: uppercase; flex-shrink: 0; align-self: center;">Aktion</span>';
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
