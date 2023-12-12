import '../style.css';
import '../img/goblin.png';

document.addEventListener('DOMContentLoaded', () => {
  const goblin = document.querySelectorAll('.container-row');
  const arrGoblins = [];
  const arrToGenerate = [];

  goblin.forEach((item) => arrGoblins.push(item));

  function getRandomInt() {
    const min = Math.ceil(0);
    const max = Math.floor(15);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generationPosition() {
    const numberGenerate = getRandomInt();
    if (numberGenerate !== arrToGenerate[arrToGenerate.length]) {
      arrGoblins.forEach((item) => item.classList.remove('container-goblin'));
      arrGoblins[numberGenerate].classList.add('container-goblin');
      arrToGenerate.push(numberGenerate);
    }
  }

  generationPosition();

  setInterval(() => {
    generationPosition();
  }, 1000);
});
