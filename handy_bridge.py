#!/usr/bin/env python3
"""
Gustav Handy Bridge Daemon
Bridges mobile voice & text messages between Cloudflare Worker and Antigravity.
Features dynamic Antigravity language_server discovery.
"""

import os
import re
import sys
import time
import json
import signal
import subprocess
import requests

# Configuration
CONVERSATION_ID = "dcb2ae66-12d3-4c1e-ae51-2d65d405bb16"
TRANSCRIPT_PATH = f"/home/gustav/.gemini/antigravity/brain/{CONVERSATION_ID}/.system_generated/logs/transcript.jsonl"
AGENTAPI_PATH = "/home/gustav/.gemini/antigravity/bin/agentapi"
WORKER_URL = "https://gustav.friese-scholz.workers.dev"

# Read bridge secret from .dev.vars if not in env
BRIDGE_SECRET = os.environ.get("HANDY_BRIDGE_SECRET")
if not BRIDGE_SECRET:
    dev_vars_path = os.path.join(os.path.dirname(__file__), ".dev.vars")
    if os.path.exists(dev_vars_path):
        with open(dev_vars_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("HANDY_BRIDGE_SECRET="):
                    BRIDGE_SECRET = line.split("=", 1)[1].strip()
                    break

if not BRIDGE_SECRET:
    print("[ERROR] HANDY_BRIDGE_SECRET not found in environment or .dev.vars!")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {BRIDGE_SECRET}",
    "Content-Type": "application/json"
}

running = True

def handle_signal(sig, frame):
    global running
    print(f"\n[INFO] Received signal {sig}, shutting down bridge daemon...")
    running = False

signal.signal(signal.SIGINT, handle_signal)
signal.signal(signal.SIGTERM, handle_signal)

def get_antigravity_env():
    """Dynamically discover running Antigravity language_server port & CSRF token"""
    env = os.environ.copy()
    if env.get("ANTIGRAVITY_LS_ADDRESS") and env.get("ANTIGRAVITY_CSRF_TOKEN"):
        return env

    try:
        # Find language_server process
        res = subprocess.run(["pgrep", "-f", "language_server.*--csrf_token"], capture_output=True, text=True)
        pids = res.stdout.strip().split()
        if not pids:
            return env

        pid = pids[0]
        with open(f"/proc/{pid}/cmdline", "rb") as f:
            cmdline = f.read().decode("utf-8", errors="ignore").split("\x00")

        csrf_token = None
        for i, arg in enumerate(cmdline):
            if arg == "--csrf_token" and i + 1 < len(cmdline):
                csrf_token = cmdline[i+1]
            elif arg.startswith("--csrf_token="):
                csrf_token = arg.split("=", 1)[1]

        # Find listening port for this pid
        ss_res = subprocess.run(["ss", "-tlpn"], capture_output=True, text=True)
        port = None
        for line in ss_res.stdout.splitlines():
            if f"pid={pid}," in line or f"pid={pid} " in line:
                m = re.search(r"127\.0\.0\.1:(\d+)", line)
                if m:
                    port = m.group(1)
                    break

        if port and csrf_token:
            env["ANTIGRAVITY_LS_ADDRESS"] = f"localhost:{port}"
            env["ANTIGRAVITY_CSRF_TOKEN"] = csrf_token
            env["ANTIGRAVITY_AGENTAPI_EXE"] = "/home/gustav/Downloads/Antigravity/Antigravity-x64/resources/bin/language_server"
            env["ANTIGRAVITY_APP_DATA_DIR"] = "/home/gustav/.gemini/antigravity"
    except Exception as e:
        print(f"[WARN] Error discovering Antigravity env: {e}")

    return env

def get_transcript_lines():
    if not os.path.exists(TRANSCRIPT_PATH):
        return []
    try:
        with open(TRANSCRIPT_PATH, "r", encoding="utf-8") as f:
            return f.readlines()
    except Exception as e:
        print(f"[WARN] Error reading transcript: {e}")
        return []

def poll_worker():
    url = f"{WORKER_URL}/api/handy/poll"
    try:
        res = requests.get(url, headers=HEADERS, timeout=10)
        if res.status_code == 200:
            return res.json()
        elif res.status_code == 401:
            print("[ERROR] 401 Unauthorized from worker! Check HANDY_BRIDGE_SECRET.")
            time.sleep(5)
        else:
            print(f"[WARN] Poll status {res.status_code}: {res.text}")
    except requests.RequestException as e:
        print(f"[WARN] Worker poll connection error: {e}")
    return None

def send_reply_to_worker(msg_id, response=None, progress=None):
    url = f"{WORKER_URL}/api/handy/reply"
    payload = {"id": msg_id}
    if response is not None:
        payload["response"] = response
    if progress is not None:
        payload["progress"] = progress

    try:
        res = requests.post(url, headers=HEADERS, json=payload, timeout=10)
        return res.status_code == 200
    except Exception as e:
        print(f"[ERROR] Failed to send reply to worker: {e}")
        return False

def switch_handy_conversation_to_claude(prompt, env):
    """
    Switches the active '📱 Handy' conversation directly inside Antigravity
    to Claude (MODEL_CLAUDE_4_5_SONNET) via LanguageServerService/SendUserCascadeMessage
    when Gemini 3.8 Flash is out of usage.
    """
    ls_addr = env.get("ANTIGRAVITY_LS_ADDRESS", "")
    csrf_token = env.get("ANTIGRAVITY_CSRF_TOKEN", "")
    if not ls_addr or not csrf_token:
        return False

    for claude_model in ["MODEL_CLAUDE_4_5_SONNET", "MODEL_CLAUDE_4_SONNET"]:
        try:
            print(f"[AUTO-SWITCH] Gemini 3.8 Flash out of usage -> Switching '📱 Handy' in Antigravity to {claude_model}...")
            url = f"http://{ls_addr}/exa.language_server_pb.LanguageServerService/SendUserCascadeMessage"
            headers = {
                "Content-Type": "application/json",
                "x-codeium-csrf-token": csrf_token,
                "Connect-Protocol-Version": "1"
            }
            payload = {
                "cascadeId": CONVERSATION_ID,
                "items": [{"text": prompt}],
                "cascadeConfig": {
                    "plannerConfig": {
                        "planModel": claude_model,
                        "requestedModel": {
                            "model": claude_model
                        }
                    }
                }
            }
            res = requests.post(url, headers=headers, json=payload, timeout=15)
            if res.status_code == 200:
                print(f"[AUTO-SWITCH SUCCESS] Message re-sent in '📱 Handy' using {claude_model}!")
                return True
            else:
                print(f"[WARN] Claude switch ({claude_model}) status {res.status_code}: {res.text[:160]}")
        except Exception as e:
            print(f"[WARN] Error switching to {claude_model}: {e}")
    return False

def process_message(item):
    msg_id = item.get("id")
    text = item.get("message", "").strip()
    user = item.get("user", "Adrian")

    if not msg_id or not text:
        return

    print(f"\n[NEW MESSAGE] [{user}] {text} (ID: {msg_id})")

    # Record starting position in transcript
    initial_lines = get_transcript_lines()
    start_line_count = len(initial_lines)

    # Format message for Antigravity session
    prompt = (
        f"[Handy-Nachricht von {user}]: {text}\n"
        "(Hinweis für Gustav: Antworte bitte direkt als normale Chat-Antwort für das Smartphone-Display/Audio, kein send_message Tool nötig. "
        "Wenn eine Aufgabe/To-do erstellt, geändert oder abgehakt werden soll, hänge ganz am Ende einen ```action Block an: "
        '{"type":"create_task","title":"...","clientName":"...","assignee":"basti|adrian|team","dueDate":"YYYY-MM-DD"} '
        'bzw. {"type":"update_task","search":"...","dueDate":"..."} oder {"type":"complete_task","search":"..."}.)'
    )

    cmd = [
        AGENTAPI_PATH,
        "send-message",
        "--title=Handy-Nachricht",
        CONVERSATION_ID,
        prompt
    ]

    env = get_antigravity_env()
    t0 = time.time()

    try:
        res = subprocess.run(cmd, env=env, capture_output=True, text=True, timeout=15)
        if res.returncode != 0:
            print(f"[ERROR] agentapi send-message failed: {res.stderr or res.stdout} -> Trying Claude switch in Antigravity...")
            if not switch_handy_conversation_to_claude(prompt, env):
                send_reply_to_worker(msg_id, response="Fehler beim Weiterleiten an Antigravity.")
                return
    except Exception as e:
        print(f"[ERROR] Failed to execute agentapi: {e}")
        send_reply_to_worker(msg_id, response="Interner Serverfehler bei der Nachrichtenverarbeitung.")
        return

    # Watch transcript for model response
    timeout_seconds = 120
    stall_without_model_step_seconds = 20
    poll_interval = 0.3
    notified_progress = False
    saw_model_activity = False
    switched_to_claude = False

    while running and (time.time() - t0 < timeout_seconds):
        time.sleep(poll_interval)
        current_lines = get_transcript_lines()
        
        if len(current_lines) > start_line_count:
            for line_str in current_lines[start_line_count:]:
                line_str = line_str.strip()
                if not line_str:
                    continue
                try:
                    entry = json.loads(line_str)
                    
                    if entry.get("source") == "MODEL":
                        saw_model_activity = True

                    # If Gemini 3.8 Flash reports an error / out of usage, switch to Claude in Antigravity
                    if entry.get("source") == "MODEL" and entry.get("type") == "PLANNER_RESPONSE" and entry.get("status") == "ERROR" and not switched_to_claude:
                        err_msg = entry.get("error", "out of usage")
                        print(f"[WARN] Gemini 3.8 Flash error ({err_msg}) -> Switching to Claude inside Antigravity!")
                        switched_to_claude = True
                        start_line_count = len(current_lines)
                        switch_handy_conversation_to_claude(prompt, env)
                        break

                    # Notify progress if model is calling tools
                    if entry.get("source") == "MODEL" and entry.get("tool_calls") and not notified_progress:
                        send_reply_to_worker(msg_id, progress="Gustav führt Aktionen aus...")
                        notified_progress = True
                    
                    # Check for final planner response with content (and no pending tool calls in this step)
                    if entry.get("source") == "MODEL" and entry.get("type") == "PLANNER_RESPONSE" and not entry.get("tool_calls"):
                        content = entry.get("content")
                        if content and content.strip():
                            elapsed = round(time.time() - t0, 1)
                            final_reply = content.strip()
                            print(f"[REPLY READY in {elapsed}s] {final_reply[:80]}...")
                            send_reply_to_worker(msg_id, response=final_reply)
                            return
                except json.JSONDecodeError:
                    continue

        # If Gemini 3.8 Flash has not started a single step after 20s (out of usage / quota limit), switch to Claude!
        if not saw_model_activity and not switched_to_claude and (time.time() - t0 >= stall_without_model_step_seconds):
            print(f"[WARN] No response from Gemini 3.8 Flash after {stall_without_model_step_seconds}s (out of usage) -> Switching to Claude in Antigravity!")
            switched_to_claude = True
            start_line_count = len(current_lines)
            switch_handy_conversation_to_claude(prompt, env)

    if time.time() - t0 >= timeout_seconds:
        print(f"[TIMEOUT] No response within {timeout_seconds}s for {msg_id}")
        send_reply_to_worker(msg_id, response="Die Anfrage in Antigravity hat zu lange gedauert.")

def main():
    print(f"=== Gustav Handy Bridge Daemon Started ===")
    print(f"Conversation ID: {CONVERSATION_ID}")
    print(f"Worker URL:      {WORKER_URL}")
    print(f"Transcript Path: {TRANSCRIPT_PATH}")
    
    env = get_antigravity_env()
    print(f"Antigravity LS:  {env.get('ANTIGRAVITY_LS_ADDRESS', 'Auto-Discover')}")
    print("Bridge is active and listening for mobile requests...")

    while running:
        poll_res = poll_worker()
        if poll_res and poll_res.get("pending") and poll_res.get("item"):
            process_message(poll_res["item"])
        else:
            time.sleep(1.2)

    print("[INFO] Bridge daemon stopped cleanly.")

if __name__ == "__main__":
    main()
