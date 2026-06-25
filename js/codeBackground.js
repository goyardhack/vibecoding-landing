(function () {
  const canvas = document.getElementById("code-bg");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");

  const SNIPPETS = [
    { text: 'async def start_handler(msg):', color: [167, 139, 250] },
    { text: '    await bot.send_message(...)', color: [34, 211, 238] },
    { text: 'from aiogram import Router', color: [74, 222, 128] },
    { text: '@router.message(Command("start"))', color: [251, 191, 36] },
    { text: 'dp.include_router(lessons_router)', color: [34, 211, 238] },
    { text: 'const app = document.querySelector(".hero")', color: [167, 139, 250] },
    { text: 'background: var(--bg-deep);', color: [74, 222, 128] },
    { text: '<section class="hero">', color: [251, 113, 133] },
    { text: 'BOT_TOKEN = os.getenv("TOKEN")', color: [34, 211, 238] },
    { text: 'class LessonCatalog:', color: [167, 139, 250] },
    { text: 'cursor: Agent mode ON', color: [74, 222, 128] },
    { text: '// Практика → Результат', color: [113, 113, 122] },
    { text: 'npm install && npm run dev', color: [34, 211, 238] },
    { text: 'git push -u origin main', color: [74, 222, 128] },
    { text: 'InlineKeyboardButton("Урок 1")', color: [167, 139, 250] },
    { text: 'if lesson.access == "pro":', color: [251, 191, 36] },
    { text: 'ZoneInfo("Europe/Moscow")', color: [34, 211, 238] },
    { text: 'await message.answer(text)', color: [74, 222, 128] },
    { text: 'CREATE TABLE users (...)', color: [251, 113, 133] },
    { text: 'def get_continue_lesson():', color: [167, 139, 250] },
    { text: 'html { scroll-behavior: smooth }', color: [74, 222, 128] },
    { text: 'localhost:3000 refused', color: [251, 113, 133] },
    { text: 'load_dotenv()', color: [34, 211, 238] },
    { text: 'asyncio.run(main())', color: [167, 139, 250] },
  ];

  let width = 0;
  let height = 0;
  let fontSize = 13;
  let lineHeight = 22;
  let columns = [];

  function randSnippet() {
    return SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    fontSize = Math.max(11, Math.min(14, width / 90));
    lineHeight = fontSize * 1.65;

    const colWidth = fontSize * 9;
    const colCount = Math.max(3, Math.floor(width / colWidth));
    const gap = width / colCount;

    columns = [];
    for (let i = 0; i < colCount; i++) {
      const col = {
        x: gap * i + gap * 0.15,
        lines: [],
        nextSpawn: Math.random() * height,
      };
      const initialCount = Math.floor(height / lineHeight) + 2;
      for (let j = 0; j < initialCount; j++) {
        const snip = randSnippet();
        col.lines.push({
          text: snip.text,
          color: snip.color,
          y: height - j * lineHeight * (0.9 + Math.random() * 0.3),
          alpha: 0.15 + Math.random() * 0.25,
          speed: 0.35 + Math.random() * 0.45,
        });
      }
      columns.push(col);
    }
  }

  function spawnLine(col) {
    const snip = randSnippet();
    col.lines.push({
      text: snip.text,
      color: snip.color,
      y: height + lineHeight,
      alpha: 0.2 + Math.random() * 0.3,
      speed: 0.35 + Math.random() * 0.45,
      chars: 0,
      typing: true,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.4, 0,
      width * 0.5, height * 0.4, width * 0.7
    );
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.06)");
    gradient.addColorStop(1, "rgba(5, 5, 8, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.font = `500 ${fontSize}px "JetBrains Mono", Consolas, monospace`;

    columns.forEach((col) => {
      col.nextSpawn -= 1.2;
      if (col.nextSpawn <= 0) {
        spawnLine(col);
        col.nextSpawn = lineHeight * (2 + Math.random() * 3);
      }

      col.lines = col.lines.filter((line) => {
        line.y -= line.speed;

        if (line.typing && line.chars < line.text.length) {
          line.chars += 0.6;
        } else {
          line.typing = false;
        }

        const displayText = line.typing
          ? line.text.slice(0, Math.floor(line.chars)) + "▌"
          : line.text;

        const fadeIn = Math.min(1, (height - line.y) / (lineHeight * 4));
        const fadeOut = Math.min(1, line.y / (lineHeight * 6));
        const alpha = line.alpha * fadeIn * fadeOut;

        if (alpha > 0.02 && line.y > -lineHeight && line.y < height + lineHeight) {
          const [r, g, b] = line.color;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillText(displayText, col.x, line.y);
        }

        return line.y > -lineHeight * 2;
      });
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();
