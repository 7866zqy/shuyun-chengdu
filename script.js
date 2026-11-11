document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "打开导航菜单" : "关闭导航菜单");
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  if (slides.length === 0 || dots.length === 0) return;

  let current = 0;
  let timer;
  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === current);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === current);
      if (dotIndex === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    const counter = document.querySelector(".hero-index strong");
    if (counter) counter.textContent = String(current + 1).padStart(2, "0");
  };
  const startTimer = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(current + 1), 6000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startTimer();
    });
  });
  document.querySelector(".hero-prev")?.addEventListener("click", () => {
    showSlide(current - 1);
    startTimer();
  });
  document.querySelector(".hero-next")?.addEventListener("click", () => {
    showSlide(current + 1);
    startTimer();
  });
  startTimer();
});
