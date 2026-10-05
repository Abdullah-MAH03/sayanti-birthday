const canvas = document.querySelector("#magicCursor");
const context = canvas.getContext("2d");
const candle = document.querySelector(".candle");
const balloons = document.querySelector(".balloons");
const particles = [];
const confettiColors = ["#d4af37", "#c0c0c0", "#ffffff", "#ffb6c1", "#87ceeb"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let animationFrame = 0;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * pixelRatio);
  canvas.height = Math.round(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function addBurst(x, y, colors, count = 36) {
  for (let index = 0; index < count; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      size: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 45 + Math.random() * 35,
    });
  }
}

function drawParticles() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.055;
    particle.vx *= 0.99;
    particle.life -= 1;

    context.globalAlpha = Math.min(1, particle.life / 18);
    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();

    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  }

  context.globalAlpha = 1;
  if (particles.length > 0) {
    animationFrame = window.requestAnimationFrame(drawParticles);
  } else {
    animationFrame = 0;
  }
}

function startParticleAnimation() {
  if (!animationFrame) {
    animationFrame = window.requestAnimationFrame(drawParticles);
  }
}

function handleCandleClick() {
  const bounds = candle.getBoundingClientRect();
  const alreadyBlown = candle.classList.toggle("candle-blown");

  if (alreadyBlown) {
    addBurst(bounds.left + bounds.width / 2, bounds.top, confettiColors, 90);
    startParticleAnimation();
  }
}

function handleBalloonClick(event) {
  const balloon = event.target.closest(".balloon");
  if (!balloon) {
    return;
  }

  const bounds = balloon.getBoundingClientRect();
  const balloonColor = window.getComputedStyle(balloon).backgroundColor;
  addBurst(
    bounds.left + bounds.width / 2,
    bounds.top + bounds.height / 2,
    [balloonColor, ...confettiColors],
    40,
  );
  balloon.remove();
  startParticleAnimation();
}

window.addEventListener("resize", resizeCanvas);
candle.addEventListener("click", handleCandleClick);
balloons.addEventListener("click", handleBalloonClick);
resizeCanvas();

if (!reducedMotion.matches) {
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || Math.random() < 0.55) {
      return;
    }

    particles.push({
      x: event.clientX,
      y: event.clientY,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: 1 + Math.random() * 1.5,
      color: "rgba(255, 250, 205, 0.7)",
      life: 24,
    });
    if (particles.length > 180) {
      particles.shift();
    }
    startParticleAnimation();
  });
}
