import Storage from './Storage.js';

export default class Renderer {
  constructor(selector = '#test') {
    this.selector = selector;
    this.element = document.querySelector(this.selector);
    this.list = new Storage('todo').get() || [];
    this.render();
  }

  render() {
    this.element.innerHTML = ''; // reset old content
    if (this.list && this.list.length > 0) {
      this.list.forEach((it) => {
        const item = document.createElement('li');
        item.innerHTML = `
        <input type="checkbox" name="${it.index}">
        <span>${it.description}</span>
        <button class="option"><i class="ri-more-2-fill"></i></button>
        `;
        this.element.appendChild(item); // updating DOM content
      });
    } else {
      this.element.innerHTML = '<li>List is empty!</li>';
    }
  }
}
