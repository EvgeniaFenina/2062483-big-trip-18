import {createElement} from '../render.js';

const createNoEventViewTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoEventPointView {
  #element = null;

  get template() {
    return createNoEventViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
