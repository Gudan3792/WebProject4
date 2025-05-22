const box = document.getElementById('box');
const closedImg = box.querySelector('.box-img:not(.open-img)');
const openImg = box.querySelector('.open-img');
const subb = document.querySelector('.hidden_sub_button');
const subt = document.querySelector('.hidden_sub_title');
const spark = document.querySelector('.sparkle');
const card = document.getElementById('card');

let tiltEnabled = true; // tilt 활성화 상태

// sparkle 초기 비활성화
spark.style.display = 'none';

// 박스 쉐이크 애니메이션 초기화
box.classList.add('shake');

box.addEventListener('click', function() {
  if (box.classList.contains('closed')) {
    // 쉐이크 중지
    box.classList.remove('shake');
    box.classList.add('bouncing');

    box.addEventListener('animationend', function handler() {
      box.classList.remove('bouncing');
      box.classList.remove('closed');
      closedImg.style.display = 'none';
      openImg.style.display = 'block';
      box.removeEventListener('animationend', handler);

      // sparkle 활성화
      spark.style.display = 'block';

      // tilt 비활성화
      tiltEnabled = false;

      subb.style.display = 'flex';
      subt.style.display = 'block';
    });
  }
});

// 카드 tilt (마우스 따라 움직임) 활성화/비활성화
card.addEventListener('mouseenter', () => {
  if (tiltEnabled) {
    card.style.transition = 'transform 0.2s cubic-bezier(.25,.8,.25,1), box-shadow 0.2s';
  }
});
card.addEventListener('mousemove', (e) => {
  if (!tiltEnabled) return;
  card.style.transition = 'none';
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;
  const maxRotate = 18;
  const rotateY = percentX * maxRotate;
  const rotateX = -percentY * maxRotate;
  card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

  // box-shadow 등 추가 효과도 여기서만 적용
});
card.addEventListener('mouseleave', () => {
  if (!tiltEnabled) return;
  card.style.transition = 'transform 0.5s cubic-bezier(.25,.8,.25,1), box-shadow 0.4s';
  card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  card.style.boxShadow = '0 0 40px 10px #ffd70066, 0 8px 40px rgba(0,0,0,0.5)';
});


document.addEventListener('keydown', function(e) {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67 || e.keyCode === 74)) {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (소스 보기)
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    return false;
  }
});
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});


const icons = ['🎁','💎','🎫','🧸','🍀','🎮','🎧','📦','🕹️','🛍️','💲','🎰','🎲','💵'];

function shuffle(array) {
  // Fisher-Yates 알고리즘으로 배열 섞기
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

document.querySelectorAll('.slot-bg').forEach((bg, idx) => {
  let line = '';
  // 각 줄마다 아이콘을 랜덤하게 섞음
  const shuffled = shuffle(icons);
  for(let i=0; i<30; i++) {
    // 30개를 뽑을 때마다 랜덤하게 섞인 배열에서 순환
    line += `<span class="slot-item">${shuffled[i % shuffled.length]}</span>`;
  }
  bg.innerHTML = line;
});
