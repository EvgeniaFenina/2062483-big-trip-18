import AbstractView from '../framework/view/abstract-view.js';

const createNoEventViewTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoEventPointView extends AbstractView {
  get template() {
    return createNoEventViewTemplate();
  }
}
