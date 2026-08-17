/* ==========================================================================
   CTWELD - MAIN JAVASCRIPT LOGIC
   Includes: Hero Slider (autoplay 8s), Projects 3.5-Card Slider, News 3.5-Card Autoplay Slider,
   About Us Media Gallery Thumbnails, Consultation Modal Form, & Mobile Navigation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. HERO BANNER SLIDER (AUTOPLAY 8s PER SPEC + MANUAL ARROWS/DOTS)
  const heroSlider = document.querySelector('.hero-slider');
  const slideTrack = document.querySelector('.hero-slider .slide-track');
  const slideItems = document.querySelectorAll('.hero-slider .slide-item');
  const dots = document.querySelectorAll('.hero-slider .dot-item');
  const prevBtn = document.querySelector('.hero-slider .arrow-prev');
  const nextBtn = document.querySelector('.hero-slider .arrow-next');
  let currentSlide = 0;
  const totalSlides = slideItems.length;
  const HERO_AUTOPLAY_MS = 8000;
  let heroTimer = null;

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

  function startHeroAutoplay() {
    if (totalSlides < 2) return;
    stopHeroAutoplay();
    heroTimer = setInterval(() => goToSlide(currentSlide + 1), HERO_AUTOPLAY_MS);
  }

  function stopHeroAutoplay() {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  }

  // Thao tác thủ công thì đếm lại 8s từ đầu, tránh nhảy slide ngay sau khi bấm
  function restartHeroAutoplay() {
    if (heroTimer) startHeroAutoplay();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); restartHeroAutoplay(); });
    nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); restartHeroAutoplay(); });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      goToSlide(slideIndex);
      restartHeroAutoplay();
    });
  });

  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopHeroAutoplay);
    heroSlider.addEventListener('mouseleave', startHeroAutoplay);
    // Dừng autoplay khi tab bị ẩn để không nhảy dồn slide lúc quay lại
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stopHeroAutoplay() : startHeroAutoplay();
    });
    startHeroAutoplay();
  }

  // 2. FEATURED PROJECTS CAROUSEL (3.5 CARDS PER VIEW)
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

  // 3. NEWS CAROUSEL (3.5 CARDS PER VIEW, MATCHED WITH PROJECTS SLIDER)
  const newsTrack = document.querySelector('.news-track');
  const newsPrev = document.querySelector('.news-prev');
  const newsNext = document.querySelector('.news-next');
  let newsIndex = 0;
  let newsAutoPlayTimer = null;

  if (newsTrack && newsPrev && newsNext) {
    const newsCards = newsTrack.querySelectorAll('.news-card');
    const maxNewsIndex = Math.max(0, newsCards.length - 3);

    function updateNewsSlider() {
      if (!newsCards.length) return;
      const cardWidth = newsCards[0].offsetWidth + 24;
      newsTrack.style.transform = `translateX(-${newsIndex * cardWidth}px)`;
    }

    function nextNews() {
      if (newsIndex < maxNewsIndex) {
        newsIndex++;
      } else {
        newsIndex = 0;
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

    const newsWrapper = document.querySelector('.news-slider-wrapper');
    if (newsWrapper) {
      newsWrapper.addEventListener('mouseenter', stopNewsAutoplay);
      newsWrapper.addEventListener('mouseleave', startNewsAutoplay);
    }

    startNewsAutoplay();
  }

  // 4. ABOUT US INTERACTIVE MEDIA GALLERY (PRODUCT DETAIL STYLE THUMBNAIL GALLERY)
  const aboutThumbs = document.querySelectorAll('.about-thumb');
  const aboutMainImg = document.getElementById('aboutMainImg');

  if (aboutThumbs.length && aboutMainImg) {
    aboutThumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const newImgSrc = this.getAttribute('data-img');
        if (newImgSrc && aboutMainImg.src !== newImgSrc) {
          aboutMainImg.style.opacity = '0.2';
          setTimeout(() => {
            aboutMainImg.src = newImgSrc;
            aboutMainImg.style.opacity = '1';
          }, 150);
        }

        aboutThumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // 5. CONSULTATION MODAL FORM LOGIC
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

  // 6. MOBILE NAVIGATION TOGGLE
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links-list');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

});
