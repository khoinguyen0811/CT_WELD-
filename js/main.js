/* ==========================================================================
   CTWELD - MAIN JAVASCRIPT LOGIC
   Includes: Hero Slider (autoplay 8s), Featured-Products Carousel, Projects 3.5-Card Slider
   + Tab Switcher, Partner Marquee Arrows, Consultation Modal Form, Image Lightbox,
   & Mobile Drawer Menu (accordion).
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

  // 2. FEATURED PROJECTS CAROUSEL (3.5 thẻ/khung desktop — mockup home-D-6.0)
  const projTrack = document.querySelector('.projects-track');
  const projPrev = document.querySelector('.proj-prev');
  const projNext = document.querySelector('.proj-next');
  let projIndex = 0;

  if (projTrack && projPrev && projNext) {
    const projCards = projTrack.querySelectorAll('.proj-card');

    function projPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateProjSlider() {
      if (!projCards.length) return;
      const maxIdx = Math.max(0, projCards.length - projPerView());
      if (projIndex > maxIdx) projIndex = maxIdx;
      if (projIndex < 0) projIndex = 0;

      const gap = parseFloat(getComputedStyle(projTrack).gap) || 0;
      const cardW = projCards[0].getBoundingClientRect().width;
      projTrack.style.transform = `translateX(-${projIndex * (cardW + gap)}px)`;

      projPrev.disabled = projIndex === 0;
      projNext.disabled = projIndex === maxIdx;
    }

    projNext.addEventListener('click', () => {
      const maxIdx = Math.max(0, projCards.length - projPerView());
      projIndex = projIndex < maxIdx ? projIndex + 1 : 0;
      updateProjSlider();
    });

    projPrev.addEventListener('click', () => {
      const maxIdx = Math.max(0, projCards.length - projPerView());
      projIndex = projIndex > 0 ? projIndex - 1 : maxIdx;
      updateProjSlider();
    });

    window.addEventListener('resize', updateProjSlider);
    updateProjSlider();
  }

  // (Đã bỏ) News carousel + About thumbnail gallery:
  // Mục 8.0 trang chủ chuyển sang grid 3 thẻ và mục 3.0 dùng 1 ảnh đơn theo mockup,
  // nên không còn phần tử .news-track / .about-thumb trên bất kỳ trang nào.

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

  // 6. MOBILE DRAWER MENU (drawer trượt từ trái + accordion danh mục con)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerClose = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.classList.remove('drawer-open');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Accordion: mở/đóng danh mục con, mỗi lần chỉ mở 1 mục
  document.querySelectorAll('.mobile-sub-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const li = this.closest('li');
      const wasOpen = li.classList.contains('open');
      li.parentElement.querySelectorAll(':scope > li.open').forEach(o => o.classList.remove('open'));
      if (!wasOpen) li.classList.add('open');
    });
  });

  // 7. CAROUSEL DÒNG MÁY NỔI BẬT (3 thẻ/khung desktop, tự tính lại khi resize)
  const prodTrack = document.querySelector('.prod-carousel-track');
  const prodPrev = document.querySelector('.carousel-prev');
  const prodNext = document.querySelector('.carousel-next');
  const prodDots = document.getElementById('prodDots');

  if (prodTrack && prodPrev && prodNext) {
    const cards = prodTrack.querySelectorAll('.prod-card');
    let prodPage = 0;

    function perView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function pageCount() {
      return Math.max(1, Math.ceil(cards.length / perView()));
    }

    function renderDots() {
      if (!prodDots) return;
      prodDots.innerHTML = '';
      for (let i = 0; i < pageCount(); i++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Trang ' + (i + 1));
        if (i === prodPage) b.classList.add('active');
        b.addEventListener('click', () => { prodPage = i; updateProd(); });
        prodDots.appendChild(b);
      }
    }

    function updateProd() {
      const n = perView();
      const max = pageCount() - 1;
      if (prodPage > max) prodPage = max;
      if (prodPage < 0) prodPage = 0;

      // dịch chuyển theo số thẻ đã đi qua, tính cả gap
      const gap = parseFloat(getComputedStyle(prodTrack).gap) || 0;
      const cardW = cards[0].getBoundingClientRect().width;
      prodTrack.style.transform = `translateX(-${prodPage * n * (cardW + gap)}px)`;

      prodPrev.disabled = prodPage === 0;
      prodNext.disabled = prodPage === max;
      renderDots();
    }

    prodPrev.addEventListener('click', () => { prodPage--; updateProd(); });
    prodNext.addEventListener('click', () => { prodPage++; updateProd(); });
    window.addEventListener('resize', updateProd);
    updateProd();
  }

  // 8. TAB DỰ ÁN / KHUYẾN MẠI
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const key = this.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-panel') === key);
      });
    });
  });

  // 9. MŨI TÊN BĂNG LOGO NHÀ CUNG CẤP (tạm dừng chạy tự động khi bấm)
  const marqueeViewport = document.querySelector('.marquee-viewport');
  if (marqueeViewport) {
    const contents = marqueeViewport.querySelectorAll('.marquee-content');
    document.querySelectorAll('.marquee-arrow').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.classList.contains('marquee-next') ? 1 : -1;
        contents.forEach(c => { c.style.animationPlayState = 'paused'; });
        marqueeViewport.scrollBy({ left: dir * 240, behavior: 'smooth' });
      });
    });
  }

  // 10. LIGHTBOX XEM ẢNH LỚN (ảnh sản phẩm cấp 2)
  const lightbox = document.querySelector('.img-lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.img-lightbox-close');

    document.querySelectorAll('.prod-zoom-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const main = this.closest('.prod-gallery-main').querySelector('img');
        if (!main) return;
        lbImg.src = main.src;
        lbImg.alt = main.alt || '';
        lightbox.classList.add('open');
        document.body.classList.add('drawer-open');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

});
