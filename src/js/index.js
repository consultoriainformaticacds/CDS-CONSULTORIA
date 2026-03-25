document.addEventListener('DOMContentLoaded', () => {
  // 1. Animación Reveal al hacer Scroll
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);

  document.querySelectorAll('section, .servicio-card, .nexo-demo-card').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
  });

  // 2. Efecto de luz siguiendo al mouse en tarjetas
  document.querySelectorAll('.servicio-card').forEach(card => {
      card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
      });
  });

  // 3. Manejo del Formulario
  const form = document.getElementById('cdsForm');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.innerText = "Enviando...";
      setTimeout(() => {
          alert("¡Consulta enviada! Nos pondremos en contacto pronto.");
          form.reset();
          btn.innerText = "Enviar consulta →";
      }, 1500);
  });
});