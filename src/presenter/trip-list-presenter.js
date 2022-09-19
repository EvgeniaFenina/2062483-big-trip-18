import TripListView from '../view/trip-list-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import EventPointPresenter from '../presenter/event-point-presenter.js';
import {render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';

export default class TripListPresenter {
  #tripListComponent = new TripListView();
  #noEventPointComponent = new NoEventPointView();

  #tripListContainer = null;
  #eventPointModel = null;
  #destinationModel = null;
  #offerModel = null;

  #eventPointsList = [];
  #eventDestinations = [];
  #eventOffersByType = [];

  #eventPointPresenter = new Map();

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

    this.#renderTripList();
  };

  #handleModeChange = () => this.#eventPointPresenter.forEach((presenter) => presenter.resetView());

  #handleEventPointChange = (updatedPoint) => {
    this.#eventPointsList = updateItem(this.#eventPointsList, updatedPoint);
    this.#eventPointPresenter.get(updatedPoint.id).init(updatedPoint, this.#eventDestinations, this.#eventOffersByType);
  };

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#tripListComponent.element, this.#handleEventPointChange, this.#handleModeChange);
    eventPointPresenter.init(eventPoint, this.#eventDestinations, this.#eventOffersByType);
    this.#eventPointPresenter.set(eventPoint.id, eventPointPresenter);
  };

  #rederEventPoins = () => {
    this.#eventPointsList.forEach((event) => this.#renderEventPoint(event));
  };

  #renderNoEventPoint = () => render(this.#noEventPointComponent, this.#tripListComponent.element);

  #clearTripList = () => {
    this.#eventPointPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPointPresenter.clear();
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#tripListContainer);

    if (this.#eventPointsList.length === 0) {
      return this.#renderNoEventPoint();
    }
    return this.#rederEventPoins();
  };
}
