// cursor, only works in slide1 for some reason

const cursorCircle = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', e => {
  cursorCircle.style.left = `${e.clientX}px`;
  cursorCircle.style.top  = `${e.clientY}px`;});