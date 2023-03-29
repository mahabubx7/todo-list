/* eslint-disable import/no-cycle */
import Task from './Task.js';
import Storage from './Storage.js';
import Renderer from './Renderer.js';

export default class ToDo {
  constructor() {
    this.storage = new Storage('todo');
    this.index = new Storage('indexTrack');
    this.list = this.storage.get() || [];
    this.syncUpdates();
    this.render = new Renderer('#list');
  }

  syncUpdates() {
    this.storage.set(this.list);
  }

  toggleTask(index) {
    this.list.forEach((task) => {
      if (task.index === Number(index)) {
        task.completed = !task.completed;
      }
    });
    this.syncUpdates();
    this.render.render();
  }

  add(task) {
    const indexNumber = Number(this.index.get() + 1);
    this.list.push(new Task(task, indexNumber));
    this.index.set(Number(this.index.get() + 1));
    this.syncUpdates();
    this.render.render();
  }

  remove(index) {
    this.list = this.list.filter((it) => it.index !== Number(index));
    this.syncUpdates();
    this.render.render();
  }

  clearCompleted() {
    this.list = this.list.filter((it) => it.completed === false);
    this.syncUpdates();
    this.render.render();
  }

  reset() {
    this.list = []; // list reset
    this.syncUpdates(); // storage reset
    this.render.render();
  }
}
