/* ==========================================================================
   CTWELD - MAIN JAVASCRIPT LOGIC
   Includes: Manual Hero Slider, Projects Slider, News 4-Card Autoplay Slider,
   Consultation Modal Form, & Mobile Navigation Toggle.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. HERO BANNER MANUAL SLIDER
  const slideTrack = document.querySelector('.hero-slider .slide-track');
  const slideItems = document.querySelectorAll('.hero-slider .slide-item');
  const dots = document.querySelectorAll('.hero-slider .dot-item');
  const prevBtn = document.querySelector('.hero-slider .arrow-prev');
  const nextBtn = document.querySelector('.hero-slider .arrow-next');
  let currentSlide = 0;
  const totalSlides = slideItems.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    if (slideTrack) {
      slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      goToSlide(slideIndex);
    });
  });

  // 2. FEATURED PROJECTS CAROUSEL (MANUAL SLIDER)
  const projTrack = document.querySelector('.projects-track');
  const projPrev = document.querySelector('.proj-prev');
  const projNext = document.querySelector('.proj-next');
  let projIndex = 0;

  if (projTrack && projPrev && projNext) {
    const projCards = projTrack.querySelectorAll('.project-card');
    const maxProjIndex = Math.max(0, projCards.length - 3);

    projNext.addEventListener('click', () => {
      if (projIndex < maxProjIndex) {
        projIndex++;
      } else {
        projIndex = 0;
      }
      updateProjSlider();
    });

    projPrev.addEventListener('click', () => {
      if (projIndex > 0) {
        projIndex--;
      } else {
        projIndex = maxProjIndex;
      }
      updateProjSlider();
    });

    function updateProjSlider() {
      const cardWidth = projCards[0].offsetWidth + 24;
      projTrack.style.transform = `translateX(-${projIndex * cardWidth}px)`;
    }
  }

  // 3. NEWS CAROUSEL (4 CARDS PER VIEW, AUTOMATIC AUTOPLAY SLIDER WITH PREV/NEXT BUTTONS)
  const newsTrack = document.querySelector('.news-track');
  const newsPrev = document.querySelector('.news-prev');
  const newsNext = document.querySelector('.news-next');
  let newsIndex = 0;
  let newsAutoPlayTimer = null;

  if (newsTrack && newsPrev && newsNext) {
    const newsCards = newsTrack.querySelectorAll('.news-card');
    // Show 4 cards per view: max index = newsCards.length - 4
    const maxNewsIndex = Math.max(0, newsCards.length - 4);

    function updateNewsSlider() {
      if (!newsCards.length) return;
      const cardWidth = newsCards[0].offsetWidth + 24;
      newsTrack.style.transform = `translateX(-${newsIndex * cardWidth}px)`;
    }

    function nextNews() {
      if (newsIndex < maxNewsIndex) {
        newsIndex++;
      } else {
        newsIndex = 0; // Loop back to start
      }
      updateNewsSlider();
    }

    function prevNews() {
      if (newsIndex > 0) {
        newsIndex--;
      } else {
        newsIndex = maxNewsIndex;
      }
      updateNewsSlider();
    }

    newsNext.addEventListener('click', () => {
      nextNews();
      resetNewsAutoplay();
    });

    newsPrev.addEventListener('click', () => {
      prevNews();
      resetNewsAutoplay();
    });

    // Start automatic sliding every 4000ms (4 seconds)
    function startNewsAutoplay() {
      stopNewsAutoplay();
      newsAutoPlayTimer = setInterval(nextNews, 4000);
    }

    function stopNewsAutoplay() {
      if (newsAutoPlayTimer) {
        clearInterval(newsAutoPlayTimer);
        newsAutoPlayTimer = null;
      }
    }

    function resetNewsAutoplay() {
      startNewsAutoplay();
    }

    // Pause autoplay when hovering over the news slider
    const newsWrapper = document.querySelector('.news-slider-wrapper');
    if (newsWrapper) {
      newsWrapper.addEventListener('mouseenter', stopNewsAutoplay);
      newsWrapper.addEventListener('mouseleave', startNewsAutoplay);
    }

    startNewsAutoplay();
  }

  // 4. CONSULTATION MODAL FORM LOGIC
  const modalOverlay = document.querySelector('.modal-overlay');
  const triggerBtns = document.querySelectorAll('.trigger-consult-modal');
  const closeBtn = document.querySelector('.modal-close');
  const consultForm = document.getElementById('consultForm');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Cảm ơn Quý khách! Yêu cầu tư vấn kỹ thuật đã được gửi thành công. Kỹ sư CTWELD sẽ liên hệ trong vòng 15 phút.');
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
      }
      consultForm.reset();
    });
  }

  // 5. MOBILE NAVIGATION TOGGLE
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links-list');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

});
