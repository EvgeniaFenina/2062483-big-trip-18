import TripListView from '../view/trip-list-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import SortView from '../view/sort-view.js';
import EventPointPresenter from '../presenter/event-point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../constants.js';
import {
  render,
  remove
} from '../framework/render.js';
import {
  sortByPrice,
  sortByTime,
  sortByDay
} from '../utils/event-point.js';

export default class TripListPresenter {
  #tripListComponent = new TripListView();
  #noEventPointComponent = new NoEventPointView();
  #sortComponent = null;

  #tripListContainer = null;
  #eventPointModel = null;
  #destinationModel = null;
  #offerModel = null;

  #eventPointsList = [];
  #eventDestinations = [];
  #eventOffersByType = [];
  #sourcedEventPointsList = [];

  #eventPointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(tripListContainer, eventPointModel, destinationModel, offerModel) {
    this.#tripListContainer = tripListContainer;
    this.#eventPointModel = eventPointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init = () => {
    this.#eventPointsList = [...this.#eventPointModel.eventPoints];
    this.#eventDestinations = [...this.#destinationModel.destination];
    this.#eventOffersByType = [...this.#offerModel.offerByType];
    this.#sourcedEventPointsList = [...this.#eventPointModel.eventPoints];

    this.#renderTripList();
  };

  #sortEventPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME :
        this.#eventPointsList.sort(sortByTime);
        break;
      case SortType.PRICE :
        this.#eventPointsList.sort(sortByPrice);
        break;
      default :
        this.#eventPointsList.sort(sortByDay);
    }
    this.#currentSortType = sortType;
  };

  #handleModeChange = () => this.#eventPointPresenter.forEach((presenter) => presenter.resetView());

  #handleEventPointChange = (updatedPoint) => {
    this.#eventPointsList = updateItem(this.#eventPointsList, updatedPoint);
    this.#sourcedEventPointsList = updateItem(this.#sourcedEventPointsList, updatedPoint);
    this.#eventPointPresenter.get(updatedPoint.id).init(updatedPoint, this.#eventDestinations, this.#eventOffersByType);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEventPoints(sortType);
    this.#clearTripList();
    this.#renderTripList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripListComponent.element);
  };

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#tripListComponent.element, this.#handleEventPointChange, this.#handleModeChange);
    eventPointPresenter.init(eventPoint, this.#eventDestinations, this.#eventOffersByType);
    this.#eventPointPresenter.set(eventPoint.id, eventPointPresenter);
  };

  #renderEventPoins = () => this.#eventPointsList.forEach(this.#renderEventPoint);

  #renderNoEventPoint = () => render(this.#noEventPointComponent, this.#tripListComponent.element);

  #clearTripList = () => {
    this.#eventPointPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPointPresenter.clear();

    remove(this.#sortComponent);
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#tripListContainer);

    if (this.#eventPointsList.length === 0) {
      return this.#renderNoEventPoint();
    }

    this.#renderSort();
    return this.#renderEventPoins();
  };
}
