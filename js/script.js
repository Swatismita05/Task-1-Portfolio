document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeToggle = document.querySelector(".theme-toggle");
  const currentYear = document.querySelector("#current-year");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu?.classList.toggle("open", !isOpen);
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("open");
    });
  });

  // Theme preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") body.classList.add("dark");

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  });

  // Reveal-on-scroll
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === "all" || category === filter;
        card.hidden = !show;
      });
    });
  });

  // Demo contact form validation
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = "Please complete the required fields with valid information.";
      return;
    }

    if (status) {
      status.textContent = "Thanks! The form is valid. Connect this form to your email/backend service to send messages.";
      status.className = "form-status success";
    }

    form.reset();
  });
});
