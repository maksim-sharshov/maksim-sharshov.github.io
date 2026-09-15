// ---------- Language toggle ----------
const htmlEl = document.documentElement;
const langButtons = document.querySelectorAll('#lang-toggle button');
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-set-lang');
    htmlEl.setAttribute('data-lang', lang);
    langButtons.forEach(b => b.classList.toggle('active', b === btn));
  });
});

// ---------- Stage 1: count 1 -> 100 ----------
const counterEl = document.getElementById('counter');
const stageCount = document.getElementById('stage-count');
const stageName = document.getElementById('stage-name');
const stageMain = document.getElementById('stage-main');
const topbar = document.getElementById('topbar');

let n = 1;
const stepMs = 22;
const fillEl = document.getElementById('loadbar-fill');
const countInterval = setInterval(() => {
  counterEl.textContent = n + '%';
  fillEl.style.width = n + '%';
  if (n >= 100) {
    clearInterval(countInterval);
    setTimeout(onCountFinished, 500);
  }
  n++;
}, stepMs);

function onCountFinished() {
  const nameText = document.getElementById('stage-name-text');

  stageCount.style.display = 'none';

  requestAnimationFrame(() => {
    nameText.classList.add('appear');
  });

  setTimeout(() => {
    stageMain.style.opacity = '1';
    stageMain.classList.add('active');
    startTerminal();

    stageName.classList.add('slide-up');
    nameText.classList.remove('appear');
    nameText.classList.add('fade-out');

    setTimeout(() => {
      stageName.style.display = 'none';
      nameText.style.display = 'none';
      htmlEl.classList.add('unlocked');
      topbar.classList.add('show');
    }, 800);
  }, 2000);
}
