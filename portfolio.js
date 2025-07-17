// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll reveal animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(255, 255, 255, 0.98)'
      : 'rgba(255, 255, 255, 0.95)';
  });

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = form.name;
      const email = form.email;
      const message = form.message;

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      [nameError, emailError, messageError].forEach(el => el.textContent = '');
      [name, email, message].forEach(el => el.style.borderColor = '#e5e7eb');

      let valid = true;

      if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        name.style.borderColor = '#ef4444';
        valid = false;
      }

      if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        email.style.borderColor = '#ef4444';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Enter a valid email';
        email.style.borderColor = '#ef4444';
        valid = false;
      }

      if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        message.style.borderColor = '#ef4444';
        valid = false;
      }

      if (valid) {
        showSuccessMessage(form);
        form.reset();
      }
    });
  }
});

// Scroll-to-section function (for external use)
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Show success message
function showSuccessMessage(form) {
  const msg = document.createElement('div');
  msg.className = 'success-message';
  msg.innerHTML = '✓ Thank you for your message! I\'ll get back to you soon.';
  msg.style.cssText = `
    background: #10b981;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    animation: fadeInUp 0.5s ease;
  `;
  form.insertBefore(msg, form.firstChild);
  setTimeout(() => msg.remove(), 5000);
}

// Lightbox
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  if (lightbox && img) {
    img.src = src;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close lightbox on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
