// Inisialisasi icon Lucide
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set current year di footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  let isDrawerOpen = false;

  function toggleMobileMenu() {
    isDrawerOpen = !isDrawerOpen;
    if (isDrawerOpen) {
      mobileDrawer.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
      mobileDrawer.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      mobileDrawer.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
      mobileDrawer.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isDrawerOpen) toggleMobileMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (isDrawerOpen && !mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu();
      }
    });
  }

  // Active Nav Link Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 180;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation, { passive: true });

  // Copy Email Functionality
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailTextEl = document.getElementById('emailText');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailTextEl.innerText.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email (radityategar1518@gmail.com) berhasil disalin! 📋');
      } catch (err) {
        // Fallback jika browser memblokir clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email berhasil disalin! 📋');
      }
    });
  }

  // Contact Form Submission (Mailto Trigger to radityategar1518@gmail.com + Toast)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent(`Peluang Kerja / Kontak dari ${name}`);
      const body = encodeURIComponent(`Halo Tegar,\n\nNama/Perusahaan: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);

      // Buka aplikasi email default ke radityategar1518@gmail.com
      window.location.href = `mailto:radityategar1518@gmail.com?subject=${subject}&body=${body}`;

      showToast('Membuka aplikasi email... Terima kasih!');
      contactForm.reset();
    });
  }

  // Toast Notification Helper
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 3500);
  }
});
