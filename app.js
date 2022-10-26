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

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const colTitle = col.querySelector('.col__title');
    const colBtn = col.querySelector('.col__btn');

    if (isLocked) {
      colors.push(colTitle.textContent);
      return;
    }

    const color = isInitial 
      ? colors[index] 
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    colTitle.textContent = color;
    col.style.background = color;

    setTextColor(colTitle, color);
    setTextColor(colBtn, color);
  })

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? '#000' : '#fff';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(col => {
    return col.toString().slice(1);
  }).join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .slice(1)
      .split('-')
      .map(color => '#' + color);
  } else {
    return [];
  }
}

setRandomColors(true);
