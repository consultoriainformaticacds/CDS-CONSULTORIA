document.addEventListener('DOMContentLoaded', () => {
  // ... (Mantén tus animaciones Reveal aquí arriba) ...

  const form = document.getElementById('cdsForm');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('cds-btn');

  if (form) {
      form.addEventListener('submit', async (e) => {
          e.preventDefault(); // Evita que la página se recargue
          
          const data = new FormData(form);
          btn.innerText = "Enviando...";
          btn.disabled = true;

          try {
              const response = await fetch(form.action, {
                  method: 'POST',
                  body: data,
                  headers: { 'Accept': 'application/json' }
              });

              if (response.ok) {
                  status.innerHTML = "¡Consulta enviada con éxito! Te contactaremos pronto.";
                  status.style.color = "#00f2ff"; // Color cian
                  form.reset(); // Limpia los campos
              } else {
                  const result = await response.json();
                  status.innerHTML = "Hubo un error: " + (result.errors ? result.errors[0].message : "Intenta nuevamente");
                  status.style.color = "#ff4444";
              }
          } catch (error) {
              status.innerHTML = "Error de conexión. Por favor, intenta por WhatsApp.";
              status.style.color = "#ff4444";
          } finally {
              btn.innerText = "Enviar consulta →";
              btn.disabled = false;
          }
      });
  }
});