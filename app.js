const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    setRandomColors();
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickBoard(event.target.textContent);
  }
})

function generateRandomColor() {
  // RGB
  // FF0000
  // 00FF00
  // 0000FF

  const hexCodes = '0123456789ABCDEF';
  let color = '';

  for (let i = 0; i < 6; i += 1) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return '#' + color;
}

function copyToClickBoard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors() {
  cols.forEach((col) => {
    const isLocked = col.querySelector('.fa-solid').classList.contains('fa-lock');
    const colTitle = col.querySelector('.col__title');
    const colBtn = col.querySelector('.col__btn');
    const color = generateRandomColor();

    if (isLocked) {
      return;
    }

    colTitle.textContent = color;
    col.style.background = color;

    setTextColor(colTitle, color);
    setTextColor(colBtn, color);
  })
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? '#000' : '#fff';
}

setRandomColors();
