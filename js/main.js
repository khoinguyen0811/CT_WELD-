/* ==========================================================================
   CTWELD - INDUSTRIAL ENGINEERING WEBSITE INTERACTION LOGIC
   Pure Vanilla JavaScript - Fast, Light, No Third-party Dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initHeroSlider();
  initProjectSlider();
  initFilters();
  initLanguageSwitcher();
  initModalConsultation();
  initFormSubmissions();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER OBSERVER
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const navbar = document.querySelector('.main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE MENU DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links-list');
  
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. HERO SLIDER CAROUSEL (MANUAL CONTROL ONLY - NO AUTO SLIDE)
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const slideTrack = document.querySelector('.slide-track');
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.dot-item');
  const prevBtn = document.querySelector('.arrow-prev');
  const nextBtn = document.querySelector('.arrow-next');

  if (!slideTrack || slides.length === 0) return;

  let currentSlide = 0;
  const slideCount = slides.length;

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    currentSlide = index;
    slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  const heroSection = document.querySelector('.hero-slider');
  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      goToSlide(currentSlide + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      goToSlide(currentSlide - 1);
    }
  }

  goToSlide(0);
}

/* --------------------------------------------------------------------------
   4. FEATURED PROJECTS SLIDER
   -------------------------------------------------------------------------- */
function initProjectSlider() {
  const track = document.querySelector('.projects-track');
  const prevBtn = document.querySelector('.proj-prev');
  const nextBtn = document.querySelector('.proj-next');

  if (!track) return;

  let slideIndex = 0;
  const cards = track.querySelectorAll('.project-card');
  const cardCount = cards.length;

  function updateProjectSlide() {
    const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 340;
    track.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (slideIndex < cardCount - 3) {
        slideIndex++;
        updateProjectSlide();
      } else {
        slideIndex = 0;
        updateProjectSlide();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (slideIndex > 0) {
        slideIndex--;
        updateProjectSlide();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. FILTER TABS (PRODUCTS PAGE)
   -------------------------------------------------------------------------- */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-card[data-category]');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      productItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. LANGUAGE SWITCHER (FLAGS)
   -------------------------------------------------------------------------- */
function initLanguageSwitcher() {
  const flagBtns = document.querySelectorAll('.flag-btn');
  if (flagBtns.length === 0) return;

  flagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      flagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const title = btn.getAttribute('title');
      showToast(`Đã chuyển sang giao diện ${title}`);
    });
  });
}

/* --------------------------------------------------------------------------
   7. MODAL CONSULTATION FORM
   -------------------------------------------------------------------------- */
function initModalConsultation() {
  const modal = document.querySelector('.modal-overlay');
  const triggerBtns = document.querySelectorAll('.trigger-consult-modal, .qc-form');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   8. FORM SUBMISSIONS & NOTIFICATIONS
   -------------------------------------------------------------------------- */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const modal = form.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');

      form.reset();
      showToast('Yêu cầu tư vấn đã được gửi thành công! Kỹ sư CTWELD sẽ liên hệ quý khách trong vòng 2h.');
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.ctweld-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'ctweld-toast';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #FFFFFF;
      color: #111112;
      border-left: 4px solid #F37021;
      padding: 14px 20px;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      z-index: 9999;
      transition: all 0.3s ease;
      transform: translateY(-20px);
      opacity: 0;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
  }, 4000);
}
