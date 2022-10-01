import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constants.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click «New event» in menu to create your first event point',
  [FilterType.FUTURE]: 'There are no event point in future',
  [FilterType.PAST]: 'There are no event point passed'
};

const createNoEventViewTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return (
    `<p class="trip-events__msg">
    ${noTaskTextValue}
    </p>`
  );
};

export default class NoEventPointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createNoEventViewTemplate(this.#filterType);
  }
}
