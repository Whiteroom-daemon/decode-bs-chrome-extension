document.getElementById('btn-run').addEventListener('click', async () => {
    const dashboard = document.getElementById('dashboard');
    const statusBadge = document.getElementById('statusBadge');
    const btn = document.getElementById('btn-run');
    
    // UI Loading State
    dashboard.innerHTML = "";
    statusBadge.innerText = "BREACHING...";
    statusBadge.style.color = "#ffb703"; // Cyberpunk yellow warning
    statusBadge.style.borderColor = "rgba(255, 183, 3, 0.3)";
    statusBadge.style.background = "rgba(255, 183, 3, 0.1)";
    btn.disabled = true;
    btn.innerText = "Infiltrating Network...";

    try {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.body.innerText.substring(0, 4000), 
        }, async (res) => {
            try {
                let pageText = res[0].result;
                
                
                const GROQ_API_KEY = "YOUR_API_KEY"; 
                
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: { 
                        "Authorization": `Bearer ${GROQ_API_KEY}`, 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({
                        model: "llama-3.1-8b-instant",
                        temperature: 0.2, // Keeps the AI focused on the facts
                        messages: [{
                            role: "system",
                            content: `You are a rogue cyberpunk AI auditor. Expose hidden corporate traps, data mining, or surveillance in the text.
                            
                            STRICT RULES:
                            1. Output EXACTLY a valid JSON object containing an array called "threats".
                            2. Extract exactly 3 threats.
                            3. Format: { "threats": [ { "tag": "SHORT_THREAT_NAME", "msg": "One brutal sentence exposing the trap." } ] }
                            4. Provide ONLY the JSON. No other text.`
                        }, { 
                            role: "user", 
                            content: pageText 
                        }]
                    })
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(`FIREWALL BLOCKED: ${errData.error?.message || "Unknown routing error"}`);
                }
                
                const data = await response.json();
                
                let findings;
                try {
                    const parsedData = JSON.parse(data.choices[0].message.content);
                    findings = parsedData.threats || parsedData; 
                } catch (parseErr) {
                    throw new Error("Target firewall corrupted the payload (Data scrambled).");
                }
                
                // Success State UI Reset
                statusBadge.innerText = "DATA SECURED";
                statusBadge.style.color = "#00f3ff"; // Neon Cyan
                statusBadge.style.borderColor = "rgba(0, 243, 255, 0.3)";
                statusBadge.style.background = "rgba(0, 243, 255, 0.1)";
                btn.innerText = "Execute Protocol";
                btn.disabled = false;
                
                findings.forEach(item => {
                    dashboard.innerHTML += `
                        <div class="threat-card">
                            <div class="threat-tag">${item.tag || "ANOMALY DETECTED"}</div>
                            <div class="threat-msg">${item.msg || item}</div>
                        </div>
                    `;
                });
                
            } catch (e) {
                // Error State
                statusBadge.innerText = "SYS.ERROR";
                statusBadge.style.color = "#ff003c";
                statusBadge.style.borderColor = "rgba(255, 0, 60, 0.3)";
                statusBadge.style.background = "rgba(255, 0, 60, 0.1)";
                btn.innerText = "Re-Initialize";
                btn.disabled = false;
                dashboard.innerHTML = `
                    <div class="threat-card error-card">
                        <div class="threat-tag">CRITICAL FAILURE</div>
                        <div class="threat-msg">${e.message}</div>
                    </div>
                `;
            }
        });
    } catch (e) {
        statusBadge.innerText = "LOCKED OUT";
        statusBadge.style.color = "#ff003c";
        btn.innerText = "Re-Initialize";
        btn.disabled = false;
        dashboard.innerHTML = `
            <div class="threat-card error-card">
                <div class="threat-tag">ACCESS DENIED</div>
                <div class="threat-msg">Host network restricted. Move to a standard web domain to execute.</div>
            </div>
        `;
    }
});