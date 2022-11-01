export class Font {
  style = document.createElement('style');

  constructor() {
    this.style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');
  `;
  }

  mount() {
    document.head.appendChild(this.style);
  }
}