const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const yearEl = document.querySelector("[data-year]");

function setYear() {
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function setScrolledState() {
  if (!header) return;
  header.dataset.scrolled = window.scrollY > 6 ? "true" : "false";
}

function closeMenu() {
  if (!navToggle || !navPanel) return;
  navToggle.setAttribute("aria-expanded", "false");
  navPanel.dataset.open = "false";
}

function toggleMenu() {
  if (!navToggle || !navPanel) return;
  const isOpen = navPanel.dataset.open === "true";
  navPanel.dataset.open = isOpen ? "false" : "true";
  navToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
}

setYear();
setScrolledState();

window.addEventListener("scroll", setScrolledState, { passive: true });

if (navToggle) {
  navToggle.addEventListener("click", toggleMenu);
}

// Close menu on link click (mobile)
if (navPanel) {
  navPanel.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    closeMenu();
  });
}

// Close menu on escape + outside click
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeMenu();
});

document.addEventListener("click", (e) => {
  if (!navPanel || !navToggle) return;
  const clickedToggle = e.target.closest("[data-nav-toggle]");
  const clickedPanel = e.target.closest("[data-nav-panel]");
  if (clickedToggle || clickedPanel) return;
  closeMenu();
});

