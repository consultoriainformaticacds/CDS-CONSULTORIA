document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantén tus animaciones Reveal aquí arriba si las tienes) ...

    const form = document.getElementById('cdsForm');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('cds-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se recargue
            
            const originalText = btn.innerText;
            const data = new FormData(form);
            
            // UX Visual: Botón procesando
            btn.innerText = "Procesando...";
            btn.disabled = true;
            btn.style.opacity = '0.7';
            if (status) status.innerHTML = ""; // Limpia mensajes anteriores

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Magia Visual (Mi código)
                    btn.innerText = "¡Enviado!";
                    btn.style.background = "var(--accent-cyan)";
                    btn.style.color = "var(--bg-primary)";
                    btn.style.opacity = '1';
                    
                    // Lógica de texto (Tu código)
                    if (status) {
                        status.innerHTML = "¡Consulta enviada con éxito! Un especialista te contactará pronto.";
                        status.style.color = "var(--accent-cyan)";
                    }
                    form.reset(); // Limpia los campos

                    // Volver a la normalidad en 5 seg
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = "transparent";
                        btn.style.color = "white";
                        btn.disabled = false;
                        if (status) status.innerHTML = "";
                    }, 5000);

                } else {
                    // Lógica de Errores Formspree (Tu código)
                    const result = await response.json();
                    if (status) {
                        status.innerHTML = "Hubo un error: " + (result.errors ? result.errors[0].message : "Intenta nuevamente");
                        status.style.color = "#ff4444"; // Rojo error
                    }
                    throw new Error('Error de Formspree');
                }
            } catch (error) {
                // Plan B: Falla de red (Tu código)
                if (status && !status.innerHTML) {
                    status.innerHTML = "Error de conexión. Por favor, intenta por WhatsApp.";
                    status.style.color = "#ff4444";
                }
                btn.style.borderColor = "#ff4444";
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.borderColor = "var(--card-border)";
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 5000);
            }
        });
    }
});