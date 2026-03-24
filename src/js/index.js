async function enviarCDS() {
  var btn = document.getElementById('cds-btn');
  var status = document.getElementById('cds-status');
  var nombre = document.getElementById('cds-nombre').value.trim();
  var email = document.getElementById('cds-email').value.trim();
  var servicio = document.getElementById('cds-servicio').value;
  var mensaje = document.getElementById('cds-mensaje').value.trim();

  if (!nombre || !email || !servicio) {
    status.style.color = '#ff6b6b';
    status.textContent = 'Por favor completá nombre, email y servicio.';
    return;
  }

  btn.textContent = 'Enviando...';
  btn.disabled = true;
  status.textContent = '';

  try {
    var response = await fetch('https://formspree.io/f/maqpkdog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nombre: nombre, email: email, servicio: servicio, mensaje: mensaje })
    });
    if (response.ok) {
      status.style.color = '#00D4FF';
      status.textContent = 'Mensaje enviado. Te respondemos en menos de 24 horas.';
      document.getElementById('cds-nombre').value = '';
      document.getElementById('cds-email').value = '';
      document.getElementById('cds-servicio').value = '';
      document.getElementById('cds-mensaje').value = '';
    } else {
      throw new Error('Error');
    }
  } catch(err) {
    status.style.color = '#ff6b6b';
    status.textContent = 'Error al enviar. Contactanos por WhatsApp.';
  }

  btn.textContent = 'Enviar consulta';
  btn.disabled = false;
}