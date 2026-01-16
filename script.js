// Header scroll functionality - ensures it works in production
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

  // Initialize everything
  function init() {
    initHeaderScroll();
    initMenu();
    initYear();
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
