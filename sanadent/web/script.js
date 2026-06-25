// ==========================================================================
// SanaDent — Script principal (vanilla JS, sin dependencias)
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Scroll reveal (fade-up) vía Intersection Observer ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: si no hay soporte, mostrar todo directamente
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Efecto de "llenado" de estrellas en la barra de confianza ---------- */
  var starsContainer = document.querySelector('[data-stars]');
  if (starsContainer) {
    // Generamos 5 spans para animar el llenado individualmente
    var starsHTML = '';
    for (var i = 0; i < 5; i++) {
      starsHTML += '<span>★</span>';
    }
    starsContainer.innerHTML = starsHTML;
    var starSpans = starsContainer.querySelectorAll('span');

    if ('IntersectionObserver' in window) {
      var starsObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            starSpans.forEach(function (span, idx) {
              setTimeout(function () {
                span.classList.add('filled');
              }, idx * 120);
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });

      starsObserver.observe(starsContainer.closest('.trustbar'));
    } else {
      starSpans.forEach(function (span) { span.classList.add('filled'); });
    }
  }

  /* ---------- Formulario de contacto (sin backend real) ---------- */
  // TODO: integrar con Formspree (https://formspree.io) o similar para envío real de emails.
  // Reemplazar este handler por un fetch/POST al endpoint correspondiente, manteniendo
  // el mismo comportamiento de mostrar el mensaje de confirmación al usuario.
  var contactForm = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validación nativa HTML5 (required) ya cubre los campos obligatorios.
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Simulación de envío exitoso: ocultamos el form y mostramos confirmación.
      contactForm.hidden = true;
      formSuccess.hidden = false;
      formSuccess.setAttribute('tabindex', '-1');
      formSuccess.focus();
    });
  }

});
