/* eslint-disable import/no-cycle */
import Task from './Task.js';
import Storage from './Storage.js';
import Renderer from './Renderer.js';

export default class ToDo {
  constructor() {
    this.storage = new Storage('todo');
    this.index = new Storage('indexTrack');
    this.list = this.storage.get() || [];
    this.render = new Renderer('#list');
    this.syncUpdates();
  }

  syncUpdates() {
    this.storage.set(this.list);
    this.render.render();
  }

  toggleTask(index) {
    this.list.forEach((task) => {
      if (task.index === Number(index)) {
        task.completed = !task.completed;
      }
    });
    this.syncUpdates();
  }

  add(task) {
    const indexNumber = Number(this.index.get() + 1);
    this.list.push(new Task(task, indexNumber));
    this.index.set(Number(this.index.get() + 1));
    this.syncUpdates();
  }

  remove(index) {
    this.list = this.list.filter((it) => it.index !== Number(index));
    this.syncUpdates();
  }

  clearCompleted() {
    this.list = this.list.filter((it) => it.completed === false);
    this.syncUpdates();
  }

  reset() {
    this.list = []; // list reset
    this.syncUpdates(); // storage reset
    this.index.set(0); // index reset
  }
}
