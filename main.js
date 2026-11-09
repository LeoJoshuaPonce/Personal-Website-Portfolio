/**
 * Editorial / Technical-Notebook Portfolio Script
 * Pure vanilla JS, zero external dependencies, under 150 lines.
 */

(function () {
  "use strict";

  // 1. Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-label", `Current theme: ${theme}. Click to switch theme.`);
      const modeText = theme === "dark" ? "light" : "dark";
      themeToggleBtn.innerHTML = `Mode: <span class="active-mode">${theme}</span> → ${modeText}`;
    }
  }

  // Initialize theme button text
  applyTheme(html.getAttribute("data-theme") || getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const siteNav = document.getElementById("site-nav");

  if (mobileToggle && siteNav) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", String(!isExpanded));
      siteNav.classList.toggle("open");
    });

    // Close menu when a navigation anchor is clicked
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Active Nav Link on Scroll (IntersectionObserver)
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const trackedSections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window && trackedSections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    trackedSections.forEach((section) => navObserver.observe(section));
  }

  // 4. Scroll Reveal (Respects prefers-reduced-motion)
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionQuery.matches && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // 5. Auto-Updating Footer Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 6. Header Local Time Display
  // [EDIT: TIMEZONE] Change to your local IANA timezone e.g. "America/New_York", "Europe/London", "Asia/Tokyo"
  const timezoneDisplay = document.getElementById("local-time-clock");
  const targetTimeZone = "[EDIT: TIMEZONE (e.g. America/New_York)]";

  function updateLocalClock() {
    if (!timezoneDisplay) return;
    try {
      const now = new Date();
      // If user replaced the placeholder with a valid timezone, use that; else fall back to local system time
      const tzConfig = targetTimeZone.startsWith("[") ? undefined : targetTimeZone;
      const timeStr = new Intl.DateTimeFormat("en-US", {
        timeZone: tzConfig,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      
      const tzAbbr = tzConfig ? tzConfig.split("/").pop() : "LOCAL";
      timezoneDisplay.textContent = `${timeStr} ${tzAbbr}`;
    } catch (e) {
      // Fallback
      const now = new Date();
      timezoneDisplay.textContent = now.toTimeString().slice(0, 8) + " LOCAL";
    }
  }

  updateLocalClock();
  setInterval(updateLocalClock, 1000);
})();
