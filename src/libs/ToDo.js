import Task from './Task.js';
import Storage from './Storage.js';
import Renderer from './Renderer.js';

export default class ToDo {
  constructor() {
    this.storage = new Storage('todo');
    this.index = new Storage('indexTrack');
    this.list = this.storage.get() || [];
    this.storage.set(this.list);
    this.render = new Renderer('#list');
  }

  add(task) {
    const indexNumber = Number(this.index.get() + 1);
    this.list.push(new Task(task.description, indexNumber));
    this.index.set(Number(this.index.get() + 1));
    this.render.render(this.list);
  }

  remove(index) {
    let { list } = this;
    list = list.filter((it) => it.index !== index);
    this.list = list;
    this.render.render(this.list);
  }
}
