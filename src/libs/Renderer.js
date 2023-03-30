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
        <button class="btn-delete hidden" data-index="${it.index}"><i class="ri-delete-bin-line"></i></button>
        `;
        item.addEventListener('change', (event) => Behaviors.toggle(event));
        item.addEventListener('dblclick', () => {
          item.querySelector('span').contentEditable = true;
          item.querySelector('span').focus();
          const del = item.querySelector('.btn-delete');
          item.querySelector('.option').classList.add('hidden');
          del.classList.remove('hidden');
          del.addEventListener('click', (event) => Behaviors.delete(event));
        });
        item.querySelector('span').addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            Behaviors.edit(event);
            event.target.removeAttribute('contentEditable');
            item.querySelector('.option').classList.remove('hidden');
          }
        });
        this.element.appendChild(item); // updating DOM content
      });
    } else {
      this.element.innerHTML = '<li>List is empty!</li>';
    }
  }
}
