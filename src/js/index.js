// Efecto de aparición suave
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
      }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.8s ease-out";
  observer.observe(section);
});

// Manejo del formulario
document.getElementById('cdsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Gracias! Recibimos tu consulta. Te contactaremos pronto.');
  this.reset();
});