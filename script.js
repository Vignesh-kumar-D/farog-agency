// Header scroll functionality - ensures it works in production
import { aboutMeContent } from './constants/about-me.js';
import { testimonials } from './constants/testimonials.js';

(function() {
  'use strict';
  
  function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    if (!header) {
      console.warn('[Header Scroll] Header element not found');
      return;
    }

    function setScrolledState() {
      if (!header) return;
      const scrolled = window.scrollY > 6;
      header.setAttribute('data-scrolled', scrolled ? "true" : "false");
    }

    // Set initial state immediately
    setScrolledState();

    // Update on scroll
    window.addEventListener("scroll", setScrolledState, { passive: true });
    
    // Update on load (handles hash navigation)
    window.addEventListener("load", setScrolledState, { once: true });
    
    // Update on resize (handles mobile browser address bar)
    window.addEventListener("resize", setScrolledState, { passive: true });
  }

  function initMenu() {
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navPanel = document.querySelector("[data-nav-panel]");

    if (!navToggle || !navPanel) return;

    function closeMenu() {
      navToggle.setAttribute("aria-expanded", "false");
      navPanel.setAttribute("data-open", "false");
    }

    function toggleMenu() {
      const isOpen = navPanel.getAttribute("data-open") === "true";
      navPanel.setAttribute("data-open", isOpen ? "false" : "true");
      navToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    }

    navToggle.addEventListener("click", toggleMenu);

    // Close menu on link click (mobile)
    navPanel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      closeMenu();
    });

    // Close menu on escape
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeMenu();
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      const clickedToggle = e.target.closest("[data-nav-toggle]");
      const clickedPanel = e.target.closest("[data-nav-panel]");
      if (clickedToggle || clickedPanel) return;
      closeMenu();
    });
  }

  function initYear() {
    const yearEl = document.querySelector("[data-year]");
    if (!yearEl) return;
    yearEl.textContent = String(new Date().getFullYear());
  }

  function initAboutMe() {
    const titleEl = document.querySelector("[data-about-title]");
    const contentEl = document.querySelector("[data-about-content]");
    const imageEl = document.querySelector("[data-about-image]");

    if (!contentEl) return;

    // Set title
    if (titleEl && aboutMeContent.title) {
      titleEl.textContent = aboutMeContent.title;
    }

    // Populate content - only two paragraphs
    if (aboutMeContent.paragraph1) {
      const p1 = document.createElement('p');
      p1.className = 'about-intro';
      p1.innerHTML = aboutMeContent.paragraph1;
      contentEl.appendChild(p1);
    }

    if (aboutMeContent.paragraph2) {
      const p2 = document.createElement('p');
      p2.className = 'about-cta';
      p2.innerHTML = aboutMeContent.paragraph2;
      contentEl.appendChild(p2);
    }

    // Set image
    if (imageEl && aboutMeContent.image) {
      imageEl.src = aboutMeContent.image.src;
      imageEl.alt = aboutMeContent.image.alt;
    }
  }

  function initTestimonials() {
    const carousel = document.querySelector("[data-carousel]");
    const track = document.querySelector("[data-carousel-track]");
    const prevBtn = document.querySelector("[data-carousel-prev]");
    const nextBtn = document.querySelector("[data-carousel-next]");

    if (!carousel || !track || !prevBtn || !nextBtn || !testimonials || testimonials.length === 0) return;

    // Populate testimonials from constants
    track.innerHTML = '';
    testimonials.forEach((testimonial, index) => {
      const card = document.createElement('article');
      card.className = 'testimonial-card';
      card.setAttribute('data-testimonial-card', '');
      
      card.innerHTML = `
        <div class="testimonial-card-inner">
          <div class="testimonial-card-front">
            <div class="testimonial-photo" style="background-image: ${testimonial.photo};"></div>
            <div class="testimonial-overlay"></div>
            <div class="testimonial-preview">
              <p class="testimonial-preview-text">"${testimonial.preview}"</p>
              <div class="testimonial-author-preview">
                <div class="author-name">${testimonial.name}</div>
                <div class="author-role">${testimonial.role}</div>
              </div>
            </div>
            <button class="testimonial-more-btn" aria-label="Read full testimonial" data-testimonial-flip>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="testimonial-card-back">
            <div class="testimonial-detail">
              <p class="testimonial-detail-text">"${testimonial.full}"</p>
              <div class="testimonial-author-detail">
                <div class="author-name">${testimonial.name}</div>
                <div class="author-role">${testimonial.role}</div>
              </div>
            </div>
            <button class="testimonial-close-btn" aria-label="Close testimonial" data-testimonial-close>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      `;
      
      track.appendChild(card);
    });

    const cards = document.querySelectorAll("[data-testimonial-card]");
    if (cards.length === 0) return;

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24; // card width + gap

    function updateCarousel() {
      const translateX = -currentIndex * cardWidth;
      track.style.transform = `translateX(${translateX}px)`;
      
      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= cards.length - getVisibleCards();
    }

    function getVisibleCards() {
      if (window.innerWidth >= 980) return 3;
      if (window.innerWidth >= 720) return 2;
      return 1;
    }

    function goToNext() {
      const maxIndex = cards.length - getVisibleCards();
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    }

    function goToPrev() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }

    // Carousel navigation
    nextBtn.addEventListener("click", goToNext);
    prevBtn.addEventListener("click", goToPrev);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCarousel();
      }, 250);
    });

    // Flip card functionality
    let flippedCard = null;
    let mouseLeaveTimeout = null;

    function flipCard(card) {
      // Close any other flipped card
      if (flippedCard && flippedCard !== card) {
        flippedCard.classList.remove("flipped");
      }
      card.classList.toggle("flipped");
      flippedCard = card.classList.contains("flipped") ? card : null;
    }

    function closeCard(card) {
      card.classList.remove("flipped");
      if (flippedCard === card) {
        flippedCard = null;
      }
    }

    function closeAllCards() {
      cards.forEach(card => {
        if (card.classList.contains("flipped")) {
          closeCard(card);
        }
      });
    }

    cards.forEach(card => {
      const moreBtn = card.querySelector("[data-testimonial-flip]");
      const closeBtn = card.querySelector("[data-testimonial-close]");
      const cardFront = card.querySelector(".testimonial-card-front");
      const cardBack = card.querySelector(".testimonial-card-back");

      // Flip on more button click
      if (moreBtn) {
        moreBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          flipCard(card);
        });
      }

      // Close on close button click
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeCard(card);
        });
      }

      // Also allow clicking the card front to flip
      if (cardFront) {
        cardFront.addEventListener("click", (e) => {
          // Don't flip if clicking the more button
          if (e.target.closest("[data-testimonial-flip]")) return;
          if (!card.classList.contains("flipped")) {
            flipCard(card);
          }
        });
      }

      // Flip back on mouse leave (blur)
      card.addEventListener("mouseleave", () => {
        if (card.classList.contains("flipped")) {
          // Clear any existing timeout
          if (mouseLeaveTimeout) {
            clearTimeout(mouseLeaveTimeout);
          }
          // Add a small delay to prevent accidental flips
          mouseLeaveTimeout = setTimeout(() => {
            closeCard(card);
          }, 300);
        }
      });

      // Cancel timeout if mouse enters again
      card.addEventListener("mouseenter", () => {
        if (mouseLeaveTimeout) {
          clearTimeout(mouseLeaveTimeout);
          mouseLeaveTimeout = null;
        }
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && flippedCard) {
        closeCard(flippedCard);
      }
    });

    // Close on click outside (blur)
    document.addEventListener("click", (e) => {
      const clickedCard = e.target.closest("[data-testimonial-card]");
      if (!clickedCard && flippedCard) {
        closeCard(flippedCard);
      }
    });

    // Initialize after cards are rendered
    setTimeout(() => {
      updateCarousel();
      
      // Hide arrows if only one card visible
      function checkArrowsVisibility() {
        const visibleCards = getVisibleCards();
        if (cards.length <= visibleCards) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "flex";
        }
      }

      checkArrowsVisibility();
      window.addEventListener("resize", () => {
        updateCarousel();
        checkArrowsVisibility();
      });
    }, 0);
  }

  // Initialize everything
  function init() {
    initHeaderScroll();
    initMenu();
    initYear();
    initAboutMe();
    initTestimonials();
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // DOM already loaded
    init();
  }
  
  // Also run on window load as fallback
  window.addEventListener("load", init, { once: true });
})();
