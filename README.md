# 💀 Decode.BS // Corporate Threat Auditor

**Decode.BS** is a high-performance, minimalist Chrome Extension built on Manifest V3. It acts as a rogue cybersecurity auditor, intercepting corporate Terms of Service and Privacy Policies, and streaming them through an advanced LLM to expose hidden surveillance, legal gags, and data harvesting clauses.

### ⚡ Core Engineering & Tech Stack
* **Architecture:** Chrome Extensions V3 (Asynchronous background scripting & activeTab manipulation).
* **Inference Engine:** Groq Cloud API routing payloads to the **Llama-3.1-8b-instant** model for ultra-low latency execution (< 2 seconds).
* **Data Handling:** Strict Object-Oriented JSON Parsing. The LLM is structurally constrained (Temperature: 0.1) to output deterministic JSON arrays, preventing UI breakdown.
* **UI/UX Design:** Built with raw HTML/CSS. Features a "Cyber-Industrial" Dashboard with Glassmorphism elements, maintaining Golden Ratio (1.618) layout principles. 

### 🚀 How to Install & Run (Developer Mode)
1. Clone this repository: `git clone https://github.com/Whiteroom-daemon/decode-bs-chrome-extension.git`
2. Get your free API key from [Groq Cloud](https://console.groq.com/).
3. Open `popup.js` and replace `"YOUR_API_KEY_HERE"` with your actual API key.
4. Open Chrome and navigate to `chrome://extensions/`.
5. Enable **Developer mode** (top right).
6. Click **Load unpacked** and select the extension directory.
7. Click the extension icon on any corporate policy page and hit **Execute Cyber-Audit**.

### 🛡️ Why I Built This
Most corporate policies are deliberately convoluted. I engineered this tool to bypass the PR nonsense and deliver structured, actionable threat intelligence to the user instantly.
