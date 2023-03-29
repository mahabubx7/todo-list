/* eslint-disable import/no-cycle */
import ToDo from './ToDo.js';

export default class Behaviors {
  static insert(event) {
    new ToDo().add(event.target.value);
    event.target.value = ''; // reset field
  }

  static delete(event) {
    const { index } = event.target.dataset;
    new ToDo().remove(index);
  }

  // static edit(event) {
  //   //
  // }

  static toggle(event) {
    const { index } = event.target.parentElement.dataset;
    new ToDo().toggleTask(index);
  }

  static clearCompleted() {
    new ToDo().clearCompleted();
  }

  static resetAll() {
    new ToDo().reset();
  }
}
