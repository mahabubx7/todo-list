import Behaviors from './libs/Behaviors.js';
import ToDo from './libs/ToDo.js';
import './style.css';

// eslint-disable-next-line no-new
new ToDo(); // calling ToDo

// Functionalities behaviors
const input = document.querySelector('#input');
const reset = document.querySelector('#reset');
const clear = document.querySelector('#btn-clear');

const insertTask = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    Behaviors.insert(event);
  }
};

const clearAllCompleted = () => Behaviors.clearCompleted();

const resetTasks = () => Behaviors.resetAll();

// after page loads
document.addEventListener('DOMContentLoaded', () => {
  // event bindings
  reset.addEventListener('click', resetTasks);
  input.addEventListener('keypress', insertTask);
  clear.addEventListener('click', clearAllCompleted);
});
