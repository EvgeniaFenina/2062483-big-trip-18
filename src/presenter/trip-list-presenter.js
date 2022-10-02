import TripListView from '../view/trip-list-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import EventPointPresenter from '../presenter/event-point-presenter.js';
import EventPointNewPresenter from '../presenter/event-point-new-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {filter} from '../utils/filter.js';
import {
  SortType,
  UpdateType,
  UserAction,
  FilterType,
  TimeLimit
} from '../constants.js';
import {
  render,
  remove,
  RenderPosition
} from '../framework/render.js';
import {
  sortByPrice,
  sortByTime,
  sortByDay
} from '../utils/event-point.js';

export default class TripListPresenter {
  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #noEventPointComponent = null;
  #sortComponent = null;

  #tripListContainer = null;
  #eventPointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;

  #eventPointPresenter = new Map();
  #eventPointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoadingPoints = true;
  #isLoadingOffers = true;
  #isLoadingDestinations = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(tripListContainer, eventPointModel, destinationModel, offerModel, filterModel) {
    this.#tripListContainer = tripListContainer;
    this.#eventPointModel = eventPointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;

    this.#eventPointNewPresenter = new EventPointNewPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#destinationModel, this.#offerModel);

    this.#eventPointModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    this.#offerModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get eventPoints() {
    this.#filterType = this.#filterModel.filter;
    const eventPoints = this.#eventPointModel.eventPoints;
    const filteredEventPoints = filter[this.#filterType](eventPoints);

    switch (this.#currentSortType) {
      case SortType.DAY :
        return filteredEventPoints.sort(sortByDay);
      case SortType.TIME :
        return filteredEventPoints.sort(sortByTime);
      case SortType.PRICE :
        return filteredEventPoints.sort(sortByPrice);
      default :
        throw new Error(`Unknown order state: '${this.#currentSortType}'!`);
    }
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offersByType() {
    return this.#offerModel.offersByType;
  }

  init = () => {
    this.#renderTripList();
  };

  createEventPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventPointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#eventPointNewPresenter.destroy();
    this.#eventPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPointPresenter.get(update.id).setSaving();
        try {
          await this.#eventPointModel.updateEventPoint(updateType, update);
        } catch(err) {
          this.#eventPointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#eventPointNewPresenter.setSaving();
        try {
          await this.#eventPointModel.addEventPoint(updateType, update);
        } catch(err) {
          this.#eventPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#eventPointPresenter.get(update.id).setDeleting();
        try {
          await this.#eventPointModel.deleteEventPoint(updateType, update);
        } catch(err) {
          this.#eventPointPresenter.get(update.id).setAborting();
        }
        break;
      default :
        throw new Error(`Unknown '${actionType}'!`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPointPresenter.get(data.id).init(data, this.destinations, this.offersByType);
        break;
      case UpdateType.MINOR:
        this.#clearTripList();
        this.#renderTripList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripList();
        this.#renderTripList({resetSortType: true});
        break;
      case UpdateType.INIT_POINTS:
        this.#isLoadingPoints = false;
        remove(this.#loadingComponent);
        this.#renderTripList();
        break;
      case UpdateType.INIT_DESTINATIONS:
        this.#isLoadingDestinations = false;
        remove(this.#loadingComponent);
        this.#renderTripList();
        break;
      case UpdateType.INIT_OFFERS:
        this.#isLoadingOffers = false;
        remove(this.#loadingComponent);
        this.#renderTripList();
        break;
      default :
        throw new Error(`Unknown '${updateType}'!`);
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearTripList();
    this.#renderTripList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripListComponent.element);
  };

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange);
    eventPointPresenter.init(eventPoint, this.destinations, this.offersByType);
    this.#eventPointPresenter.set(eventPoint.id, eventPointPresenter);
  };

  #renderEventPoints = (eventPoints) => eventPoints.forEach((eventPoint) => this.#renderEventPoint(eventPoint));

  #renderLoading = () => render(this.#loadingComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);

  #renderNoEventPoint = () => {
    this.#noEventPointComponent = new NoEventPointView(this.#filterType);
    render(this.#noEventPointComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearTripList = (resetSortType = false) => {
    this.#eventPointNewPresenter.destroy();
    this.#eventPointPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventPointComponent) {
      remove(this.#noEventPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#tripListContainer);

    if (this.#isLoadingPoints || this.#isLoadingOffers || this.#isLoadingDestinations) {
      this.#renderLoading();
      return;
    }

    const eventPoints = this.eventPoints;

    if (eventPoints.length === 0) {
      return this.#renderNoEventPoint();
    }

    this.#renderSort();
    this.#renderEventPoints(eventPoints);
  };
}
