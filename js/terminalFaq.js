(function () {
  const FAQ_DATA = {
    experience: {
      question: "Нужен ли опыт в программировании?",
      answer: "Нет. Курс рассчитан с нуля. Ты учишься через практику в Cursor — AI пишет код, ты понимаешь результат и постепенно становишься самостоятельнее.",
    },
    time: {
      question: "Сколько времени в день нужно?",
      answer: "15–30 минут достаточно. Один урок = одна практическая задача. Плюс задание дня приходит в 10:00 МСК — можно выполнить за 5–10 минут.",
    },
    pc: {
      question: "Нужен ли компьютер?",
      answer: "Да. Cursor работает на Windows и Mac. Телефон — для бота и уведомлений, но код пишешь на ПК. Браузер и Telegram тоже понадобятся.",
    },
    payment: {
      question: "Как оплатить PRO?",
      answer: "Прямо в боте через Telegram Stars. Нажми «PRO доступ» → оплати 450 Stars → все 20 уроков и 6 промптов открыты навсегда. Промпты отдельно — 250 Stars.",
    },
  };

  const commands = document.getElementById("faq-commands");
  const output = document.getElementById("faq-output");
  const cursorLine = document.getElementById("faq-cursor");

  if (!commands || !output) return;

  let typing = false;

  function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = "";
    function tick() {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
        setTimeout(tick, speed);
      } else if (callback) {
        callback();
      }
    }
    tick();
  }

  commands.addEventListener("click", (e) => {
    const btn = e.target.closest(".terminal__cmd");
    if (!btn || typing) return;

    const key = btn.dataset.cmd;
    const data = FAQ_DATA[key];
    if (!data) return;

    commands.querySelectorAll(".terminal__cmd").forEach((b) => b.classList.remove("terminal__cmd--active"));
    btn.classList.add("terminal__cmd--active");

    typing = true;
    output.innerHTML = "";

    const qLine = document.createElement("p");
    qLine.className = "terminal__line";
    qLine.innerHTML = `<span class="terminal__prompt">vibecoding@faq:~$</span> ${data.question}`;
    output.appendChild(qLine);

    const aLine = document.createElement("p");
    aLine.className = "terminal__line";
    aLine.innerHTML = '<span class="terminal__prompt">system:</span> <span class="terminal__answer"></span>';
    output.appendChild(aLine);

    const answerSpan = aLine.querySelector(".terminal__answer");

    const cursorEl = document.createElement("p");
    cursorEl.className = "terminal__line terminal__cursor-line";
    cursorEl.innerHTML = '<span class="terminal__cursor">_</span>';
    output.appendChild(cursorEl);

    typeText(answerSpan, data.answer, 18, () => {
      typing = false;
    });
  });
})();
