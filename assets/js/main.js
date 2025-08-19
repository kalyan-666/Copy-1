/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Add js-enabled class to body for CSS fallbacks
   */
  document.body.classList.add('js-enabled');

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Testimonials Slider
   */
  function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Auto-advance slides every 2 seconds
    setInterval(nextSlide, 2000);
  }

  // Initialize testimonials slider when DOM is loaded
  document.addEventListener('DOMContentLoaded', initTestimonialsSlider);

  /**
   * Initialize reveal text animations
   */
  window.addEventListener('load', initRevealTextAnimations);

  /**
   * Ensure page starts at top on refresh
   */
  function ensureTopOnRefresh() {
    // Force scroll to top on page refresh/reload
    window.scrollTo(0, 0);
    
    // Additional check for navigation type
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      window.scrollTo(0, 0);
    }
    
    // Ensure smooth scroll to hero section
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }
  window.addEventListener('load', ensureTopOnRefresh);
  window.addEventListener('beforeunload', () => {
    // Store a flag to indicate page refresh
    sessionStorage.setItem('pageRefreshed', 'true');
  });
  
  // Additional check on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('pageRefreshed') === 'true') {
      window.scrollTo(0, 0);
      sessionStorage.removeItem('pageRefreshed');
    }
  });

  /**
   * One-time reveal text animation for Medical, Education, Enterprise tabs
   */
  function initRevealTextAnimations() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    const animatedTabs = new Set();

    tabButtons.forEach(button => {
      button.addEventListener('shown.bs.tab', function(event) {
        const targetId = event.target.getAttribute('data-bs-target');
        const tabId = targetId.replace('#', '');
        
        // Only animate if this tab hasn't been animated before
        if (!animatedTabs.has(tabId)) {
          const tabContent = document.querySelector(targetId);
          if (tabContent) {
            // Reset animations
            const elements = tabContent.querySelectorAll('h3, ul li');
            elements.forEach(el => {
              el.style.animation = 'none';
              el.offsetHeight; // Trigger reflow
            });
            
            // Start animations
            setTimeout(() => {
              elements.forEach(el => {
                el.style.animation = '';
              });
            }, 100);
            
            // Mark this tab as animated
            animatedTabs.add(tabId);
          }
        }
      });
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Initialize Vertical Split Effect for Effortless Engagement
   */
  function initVerticalSplitEffect() {
    const effortlessBox = document.querySelector('.effortless-engagement-split');
    if (effortlessBox) {
      // Force animation restart to ensure it works
      effortlessBox.style.animation = 'none';
      effortlessBox.offsetHeight; // Trigger reflow
      effortlessBox.style.animation = 'verticalSplit 2s ease-in-out infinite';
      
      // Add click trigger for testing
      effortlessBox.addEventListener('click', function() {
        this.style.animation = 'none';
        this.offsetHeight; // Trigger reflow
        this.style.animation = 'verticalSplit 1.2s ease-in-out';
      });
    }
  }

  /**
   * Initialize Feature Cards Animation
   */
  function initFeatureCardsAnimation() {
    const featureBoxes = document.querySelectorAll('.features-cards .feature-box');
    const mediaFeatureCards = document.querySelectorAll('.media-feature-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Function to animate feature cards
    function animateFeatureCards() {
      featureBoxes.forEach((box, index) => {
        if (isInViewport(box) && !box.classList.contains('animated')) {
          // Add delay based on index for staggered animation
          setTimeout(() => {
            box.classList.add('animated');
          }, index * 200); // 200ms delay between each card
        }
      });
      
      // Also ensure media feature cards are visible
      mediaFeatureCards.forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
          setTimeout(() => {
            card.classList.add('animated');
          }, index * 150); // 150ms delay between each media card
        }
      });
    }

    // Initial check
    animateFeatureCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateFeatureCards);
    
    // Check on window resize
    window.addEventListener('resize', animateFeatureCards);
  }

  // Initialize vertical split effect
  window.addEventListener('load', initVerticalSplitEffect);
  document.addEventListener('DOMContentLoaded', initVerticalSplitEffect);

  // Initialize feature cards animation
  window.addEventListener('load', initFeatureCardsAnimation);
  document.addEventListener('DOMContentLoaded', initFeatureCardsAnimation);

})();