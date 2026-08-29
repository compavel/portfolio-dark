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

  // Project Modal Data
  const projectData = {
    komore: {
      title: 'Komore Coffee - Cafe Website',
      titleBar: 'komore-coffee',
      badge: 'Web Development',
      category: 'Static Website & Responsive Design',
      description: 'Website promosi untuk cafe fiktif dengan desain warm & earthy. Fitur meliputi menu interaktif dengan filter kategori, galeri suasana cafe, section About, lokasi, dan contact. Responsive design untuk mobile & desktop.',
      techStack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Lucide Icons', 'Netlify'],
      features: [
        'Menu interaktif dengan filter kategori',
        'Galeri suasana cafe',
        'Section About & Lokasi',
        'Contact form',
        'Fully responsive design'
      ],
      screenshots: [
        { src: 'https://placehold.co/600x400/1a1a1a/amber?text=Komore+Home', alt: 'Komore Home' },
        { src: 'https://placehold.co/600x400/1a1a1a/amber?text=Menu+Section', alt: 'Menu Section' },
        { src: 'https://placehold.co/600x400/1a1a1a/amber?text=Gallery', alt: 'Gallery' },
        { src: 'https://placehold.co/600x400/1a1a1a/amber?text=Contact', alt: 'Contact' }
      ],
      links: [
        { type: 'github', url: 'https://github.com/compavel/komore-coffee', label: 'Repository' },
        { type: 'live', url: 'https://kocoffee.netlify.app', label: 'Live Demo' }
      ]
    },
    screentime: {
      title: 'ScreenTime - Movie & Anime Watchlist',
      titleBar: 'screentime',
      badge: 'Full-Stack Web App',
      category: 'Laravel + TMDB API + MySQL',
      description: 'Aplikasi web full-stack untuk menemukan, menjelajahi, dan mengelola watchlist film & anime. Mengintegrasikan TMDB API untuk data real-time. Fitur: autentikasi user, search, browse by genre, detail movie, dan watchlist management dengan status tracking.',
      techStack: ['Laravel 10', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS', 'TMDB API', 'Docker'],
      features: [
        'Home page dengan trending movies & horizontal scroll',
        'Browse film berdasarkan genre',
        'Search real-time dengan debounce',
        'Detail film lengkap (cast, similar, rating)',
        'Watchlist management dengan status tracking',
        'Autentikasi user (login/register)',
        'Dark theme UI'
      ],
      screenshots: [
        { src: 'img/projects/home.png', alt: 'ScreenTime Home' },
        { src: 'img/projects/search.png', alt: 'ScreenTime Search' },
        { src: 'img/projects/detail.png', alt: 'ScreenTime Detail' },
        { src: 'img/projects/watchlist.png', alt: 'ScreenTime Watchlist' }
      ],
      links: [
        { type: 'github', url: 'https://github.com/compavel/screentime', label: 'Repository' }
      ]
    }
  };

  // Open Project Modal
  window.openProjectModal = function(projectId) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    const data = projectData[projectId];
    if (!data || !modal || !content) return;

    // Fill data
    document.getElementById('modalTitleBar').textContent = data.titleBar;
    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;

    // Screenshots
    const screenshotsEl = document.getElementById('modalScreenshots');
    screenshotsEl.innerHTML = data.screenshots.map(s => 
      `<img src="${s.src}" alt="${s.alt}" class="rounded-xl object-cover w-full h-40 sm:h-48 border border-white/10">`
    ).join('');

    // Tech Stack
    const techEl = document.getElementById('modalTechStack');
    techEl.innerHTML = data.techStack.map(t => 
      `<span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-xs">${t}</span>`
    ).join('');

    // Features
    const featuresEl = document.getElementById('modalFeatures');
    featuresEl.innerHTML = data.features.map(f => 
      `<li class="flex items-start gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"></i><span>${f}</span></li>`
    ).join('');

    // Links
    const linksEl = document.getElementById('modalLinks');
    linksEl.innerHTML = data.links.map(l => {
      if (l.type === 'github') {
        return `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"><i data-lucide="github" class="w-4 h-4 text-zinc-400"></i><span>${l.label}</span></a>`;
      }
      return `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2.5 px-4 rounded-xl bg-white text-black text-xs font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"><span>${l.label}</span><i data-lucide="external-link" class="w-4 h-4"></i></a>`;
    }).join('');

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(() => {
      content.classList.remove('scale-95', 'opacity-0');
      content.classList.add('scale-100', 'opacity-100');
    });

    // Re-init lucide icons
    if (window.lucide) lucide.createIcons();
  };

  // Close Project Modal
  window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    content.classList.add('scale-95', 'opacity-0');
    content.classList.remove('scale-100', 'opacity-100');

    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 200);
  };

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeProjectModal();
  });
});
