document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cdsForm');
    const btn = document.getElementById('cds-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            // Esto evita que la página te lleve a otra web (UX Premium)
            e.preventDefault(); 
            
            const originalText = btn.innerText;
            btn.innerText = "Procesando...";
            btn.disabled = true;
            btn.style.opacity = '0.7';

            try {
                // Enviamos los datos a Formspree "por detrás"
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Éxito: Animación Premium del botón
                    btn.innerText = "¡Consulta Enviada con Éxito!";
                    btn.style.background = "var(--accent-cyan)";
                    btn.style.color = "var(--bg-primary)";
                    btn.style.opacity = '1';
                    form.reset(); // Limpiamos el formulario
                    
                    // El botón vuelve a la normalidad después de 5 segundos
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = "transparent";
                        btn.style.color = "white";
                        btn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error('Error de servidor');
                }
            } catch (error) {
                // Si hay un error de red
                btn.innerText = "Error. Intenta nuevamente.";
                btn.style.borderColor = "red";
                btn.style.color = "red";
                btn.style.opacity = '1';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.borderColor = "var(--card-border)";
                    btn.style.color = "white";
                    btn.disabled = false;
                }, 4000);
            }
        });
    }
});