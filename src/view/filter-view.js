import AbstractView from '../framework/view/abstract-view.js';
import {getWordCapitalized} from '../utils/common.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  const isFilterChecked = isChecked ? 'checked' : '';
  const isFilterDisabled = count === 0 ? 'disabled' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isFilterChecked} ${isFilterDisabled}>
      <label class="trip-filters__filter-label" for="filter-${name}">${getWordCapitalized(name)}</label>
    </div>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersTemplate = filters.map((filter, i) => createFilterItemTemplate(filter, i === 0)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
