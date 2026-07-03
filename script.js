/* =========================================================
   1) TYPEWRITER EFFECT
   Types the proposal text one character at a time into #typedText
========================================================= */
const message = "Will you marry me?";
const typedEl = document.getElementById('typedText');
let i = 0;

function typeNextChar() {
  if (i < message.length) {
    // insert the next character before the blinking cursor span
    typedEl.insertBefore(document.createTextNode(message[i]), typedEl.lastChild);
    i++;
    setTimeout(typeNextChar, 80); // typing speed in ms
  }
}
typeNextChar();

/* =========================================================
   2) RUNAWAY "NO" BUTTON
   Every time the mouse gets close (or the button is clicked/tapped),
   it jumps to a new random spot inside the card.
========================================================= */
const noBtn = document.getElementById('noBtn');
const btnRow = document.querySelector('.btn-row');

function moveNoButton() {
  const rowBounds = btnRow.getBoundingClientRect();
  const maxX = rowBounds.width - noBtn.offsetWidth;
  const maxY = rowBounds.height - noBtn.offsetHeight;

  const randomX = Math.random() * Math.max(maxX, 0);
  const randomY = Math.random() * Math.max(maxY, 0);

  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
}

// desktop: dodge on hover
noBtn.addEventListener('mouseenter', moveNoButton);
// mobile / fallback: dodge on click too, so it's never actually pressable
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
});

/* =========================================================
   3) "YES" BUTTON -> CELEBRATION + FLOATING HEARTS
========================================================= */
const yesBtn = document.getElementById('yesBtn');
const questionView = document.getElementById('questionView');
const celebrateView = document.getElementById('celebrateView');
const eyebrow = document.getElementById('eyebrow');

yesBtn.addEventListener('click', () => {
  questionView.style.display = 'none';
  celebrateView.classList.add('show');
  eyebrow.textContent = 'the answer';
  startHearts();
});

function startHearts() {
  const heartChars = ['💛', '❤️', '💫'];
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (4 + Math.random() * 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000); // clean up old hearts
  }, 300);
}

/* =========================================================
   4) AMBIENT STAR BACKGROUND
   Generates a handful of small twinkling dots behind the card.
========================================================= */
const starsContainer = document.getElementById('stars');
for (let s = 0; s < 40; s++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.animationDelay = Math.random() * 3 + 's';
  starsContainer.appendChild(star);
}