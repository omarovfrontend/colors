const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  if (event.code.toLowerCase() === 'space') {
    setRandomColors();
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

function setRandomColors() {
  cols.forEach((col) => {
    const colTitle = col.querySelector('.col__title');
    const colBtn = col.querySelector('.col__btn');
    const color = generateRandomColor();

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
