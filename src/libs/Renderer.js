/* eslint-disable import/no-cycle */
import Behaviors from './Behaviors.js';
import Storage from './Storage.js';

export default class Renderer {
  constructor(selector = '#test') {
    this.selector = selector;
    this.element = document.querySelector(this.selector);
    this.syncUpdates();
    this.render();
  }

  syncUpdates(payload = []) {
    this.list = new Storage('todo').get() || payload;
  }

  render() {
    this.syncUpdates();
    this.element.innerHTML = ''; // reset old content
    if (this.list && this.list.length > 0) {
      this.list.forEach((it) => {
        const item = document.createElement('li');
        item.dataset.index = it.index;
        item.innerHTML = `
        <input type="checkbox" ${it.completed ? 'checked' : ''}>
        <span class="${it.completed ? 'completed' : ''}">${it.description}</span>
        <button class="option"><i class="ri-more-2-fill"></i></button>
        `;
        item.addEventListener('change', (event) => Behaviors.toggle(event));
        this.element.appendChild(item); // updating DOM content
      });
    } else {
      this.element.innerHTML = '<li>List is empty!</li>';
    }
  }
}
