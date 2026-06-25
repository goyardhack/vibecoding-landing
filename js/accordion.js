(function () {
  const accordion = document.getElementById("cards-accordion");
  if (!accordion) return;

  const cards = accordion.querySelectorAll(".card");

  cards.forEach((card) => {
    const header = card.querySelector(".card__header");
    if (!header) return;

    header.addEventListener("click", () => {
      const isOpen = card.classList.contains("card--open");

      cards.forEach((c) => {
        c.classList.remove("card--open");
        const h = c.querySelector(".card__header");
        if (h) h.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        card.classList.add("card--open");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  const modulesAccordion = document.getElementById("modules-accordion");
  if (!modulesAccordion) return;

  const modules = modulesAccordion.querySelectorAll(".module");

  modules.forEach((mod) => {
    const header = mod.querySelector(".module__header");
    if (!header) return;

    header.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mod.classList.contains("module--open");

      modules.forEach((m) => {
        m.classList.remove("module--open");
        const h = m.querySelector(".module__header");
        if (h) h.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        mod.classList.add("module--open");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
