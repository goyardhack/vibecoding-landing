(function () {
  const nav = document.getElementById("nav");
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
