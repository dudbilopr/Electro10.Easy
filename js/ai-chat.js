// ai-chat.js
// Módulo de Inteligencia Artificial Contextual (BYOK - Bring Your Own Key)

(function() {
    let apiKey = window.userApiKey || localStorage.getItem('userApiKey') || localStorage.getItem('electro10_gemini_key') || null;

    // Inyectar HTML del Chatbot al final del body
    function injectChatUI() {
        if(document.getElementById('ai-chat-fab')) return;

        const html = `
            <!-- FAB -->
            <button id="ai-chat-fab" class="chat-fab animate-pulse" title="Asistente IA">
                <span class="material-symbols-outlined">auto_awesome</span>
            </button>

            <!-- Panel de Chat -->
            <div id="ai-chat-panel" class="chat-panel" style="display: none;">
                <!-- Cabecera -->
                <div style="background: var(--accent); color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0;">
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 600;">
                        <span class="material-symbols-outlined">smart_toy</span> Tutor IA
                    </div>
                    <button id="btn-close-chat" class="icon-btn" style="color: #fff; width: 30px; height: 30px;"><span class="material-symbols-outlined">close</span></button>
                </div>
                
                <!-- Área de Mensajes -->
                <div id="ai-chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: var(--bg-main);">
                    <!-- Mensaje Inicial -->
                </div>

                <!-- Input Area / API Key Input -->
                <div style="padding: 15px; border-top: 1px solid var(--border-color); background: var(--bg-surface);">
                    <div id="ai-key-area" style="display: none; flex-direction: column; gap: 10px;">
                        <p style="font-size: 0.8rem; color: var(--text-medium); margin: 0;">Para mantener este servicio 100% gratuito, ingresa tu API Key institucional de Google Gemini.</p>
                        <input type="password" id="input-api-key" placeholder="Pega tu Google Gemini API Key aquí..." style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-high); outline: none;">
                        <button id="btn-save-key" class="btn-primary" style="width: 100%; padding: 10px; font-weight: 600;">Guardar y Conectar</button>
                    </div>

                    <div id="ai-chat-area" style="display: none; flex-direction: row; gap: 8px;">
                        <input type="text" id="input-chat-msg" placeholder="Hazme una pregunta sobre la lección..." style="flex: 1; padding: 10px 15px; border-radius: 20px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-high); outline: none;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border-color)'">
                        <button id="btn-send-chat" class="btn-primary" style="width: 40px; height: 40px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined">send</span></button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);

        // Listeners
        document.getElementById('ai-chat-fab').addEventListener('click', toggleChat);
        document.getElementById('btn-close-chat').addEventListener('click', toggleChat);
        document.getElementById('btn-save-key').addEventListener('click', saveApiKey);
        document.getElementById('btn-send-chat').addEventListener('click', sendMessage);
        document.getElementById('input-chat-msg').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') sendMessage();
        });

        checkApiKey();
    }

    function toggleChat() {
        const panel = document.getElementById('ai-chat-panel');
        if (panel.style.display === 'none' || !panel.style.display) {
            panel.style.display = 'flex';
            panel.classList.add('animate-slide-up');
            // Quitar el pulse glow al abrirlo
            document.getElementById('ai-chat-fab').classList.remove('animate-pulse');
        } else {
            panel.style.display = 'none';
            panel.classList.remove('animate-slide-up');
        }
    }

    function checkApiKey() {
        // Recargar desde memoria global si se guardó en el perfil
        apiKey = window.userApiKey || localStorage.getItem('userApiKey') || localStorage.getItem('electro10_gemini_key') || null;
        
        const keyArea = document.getElementById('ai-key-area');
        const chatArea = document.getElementById('ai-chat-area');
        const msgContainer = document.getElementById('ai-chat-messages');
        
        msgContainer.innerHTML = ''; // Clear

        if (!apiKey) {
            keyArea.style.display = 'flex';
            chatArea.style.display = 'none';
            appendMessage('bot', '¡Hola! Soy tu Tutor IA. Para interactuar conmigo, por favor proporciona tu API Key institucional de Google Gemini. Tu llave se guardará localmente en tu dispositivo.');
        } else {
            keyArea.style.display = 'none';
            chatArea.style.display = 'flex';
            appendMessage('bot', '¡Conexión establecida! Estoy al tanto de la lección que estás viendo. ¿En qué te puedo ayudar hoy?');
        }
    }

    function saveApiKey() {
        const input = document.getElementById('input-api-key').value.trim();
        if(input.length > 20) {
            apiKey = input;
            localStorage.setItem('electro10_gemini_key', apiKey);
            localStorage.setItem('userApiKey', apiKey);
            window.userApiKey = apiKey;
            checkApiKey();
        } else {
            alert("Por favor, ingresa una API Key válida.");
        }
    }

    function appendMessage(sender, text) {
        const msgContainer = document.getElementById('ai-chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.style.maxWidth = '85%';
        msgDiv.style.padding = '12px 16px';
        msgDiv.style.borderRadius = '16px';
        msgDiv.style.fontSize = '0.9rem';
        msgDiv.style.lineHeight = '1.4';
        msgDiv.style.animation = 'fadeIn 0.3s ease';
        
        if (sender === 'user') {
            msgDiv.style.background = 'var(--accent)';
            msgDiv.style.color = '#fff';
            msgDiv.style.alignSelf = 'flex-end';
            msgDiv.style.borderBottomRightRadius = '4px';
        } else {
            msgDiv.style.background = 'var(--bg-surface-hover)';
            msgDiv.style.color = 'var(--text-high)';
            msgDiv.style.border = '1px solid var(--border-color)';
            msgDiv.style.alignSelf = 'flex-start';
            msgDiv.style.borderBottomLeftRadius = '4px';
            // Renderizar Markdown simple o KaTeX si es posible (simplificado)
            text = text.replace(/\\n/g, '<br>').replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>');
        }

        msgDiv.innerHTML = text;
        msgContainer.appendChild(msgDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    async function sendMessage() {
        const inputEl = document.getElementById('input-chat-msg');
        const text = inputEl.value.trim();
        if(!text) return;

        appendMessage('user', text);
        inputEl.value = '';
        inputEl.disabled = true;

        // Mostrar indicador de carga
        const loadingId = 'loading-' + Date.now();
        const msgContainer = document.getElementById('ai-chat-messages');
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.style.alignSelf = 'flex-start';
        loadingDiv.style.color = 'var(--text-medium)';
        loadingDiv.style.fontSize = '0.8rem';
        loadingDiv.innerText = 'Escribiendo...';
        msgContainer.appendChild(loadingDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // Obtener contexto de la página
        let context = "El usuario está en el Dashboard principal.";
        const titleEl = document.getElementById('display-title');
        if (titleEl && titleEl.innerText !== 'Cargando...') {
            context = `El usuario está estudiando la lección titulada: "${titleEl.innerText}". Responde sus dudas orientando la respuesta a esta temática específica de electromagnetismo o física.`;
        }

        const systemPrompt = `Eres un tutor experto en física y electromagnetismo de nivel universitario. Actúas de manera pedagógica y alentadora. No des las respuestas de los exámenes directamente, guía al estudiante para que las encuentre. Contexto actual: ${context}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: systemPrompt },
                            { text: text }
                        ]
                    }]
                })
            });

            if (!response.ok) {
                if(response.status === 400 || response.status === 403) {
                    throw new Error("API Key inválida o sin permisos.");
                }
                throw new Error("Error en la conexión con la IA.");
            }

            const data = await response.json();
            const replyText = data.candidates[0].content.parts[0].text;
            
            document.getElementById(loadingId).remove();
            appendMessage('bot', replyText);

        } catch (error) {
            document.getElementById(loadingId).remove();
            appendMessage('bot', `⚠️ Error: ${error.message}. Si cambiaste tu llave, borra tu localStorage ('electro10_gemini_key') e intenta de nuevo.`);
            if (error.message.includes("API Key")) {
                localStorage.removeItem('electro10_gemini_key');
                apiKey = null;
                setTimeout(checkApiKey, 2000);
            }
        } finally {
            inputEl.disabled = false;
            inputEl.focus();
        }
    }

    // Inicializar cuando el DOM cargue
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectChatUI);
    } else {
        injectChatUI();
    }

    // Exponer para la IA Proactiva (Data Science Skill)
    window.triggerProactiveAI = function(mensajeInicial) {
        const panel = document.getElementById('ai-chat-panel');
        if (panel && (panel.style.display === 'none' || !panel.style.display)) {
            toggleChat();
        }
        setTimeout(() => {
            appendMessage('bot', mensajeInicial);
        }, 500);
    };

})();
