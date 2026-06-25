(function () {
  const heroItems = document.querySelectorAll(".fade-up");
  heroItems.forEach((el) => {
    const delay = parseInt(el.dataset.delay || "0", 10) * 120;
    setTimeout(() => el.classList.add("visible"), 300 + delay);
  });

  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();
