import {render} from '../render.js';
import TripListView from '../view/trip-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventPointView from '../view/event-point-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import {isPressEscape} from '../utils.js';

export default class TripListPresenter {
  #tripListComponent = new TripListView();

  #tripListContainer = null;
  #eventPointModel = null;
  #destinationModel = null;
  #offerModel = null;

  #eventPointsList = [];
  #eventDestinations = [];
  #eventOffersByType = [];

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

    this.#renderEventPointList();
  };

  #renderEventPoint = (eventPoint, destinations, offersByType) => {
    const eventPointComponent = new EventPointView(eventPoint, destinations, offersByType);
    const formEditComponent = new EditFormView(eventPoint, destinations, offersByType);

    const replaceEventPointToEditForm = () => this.#tripListComponent.element.replaceChild(formEditComponent.element, eventPointComponent.element);

    const replaceEditFormToEventPoint = () => this.#tripListComponent.element.replaceChild(eventPointComponent.element, formEditComponent.element);

    const onEscKeyDown = (evt) => {
      if (isPressEscape(evt)) {
        evt.preventDefault();
        replaceEditFormToEventPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onOpenFormEdit = (evt) => {
      evt.preventDefault();
      replaceEventPointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    };

    const onCloseFormEdit = (evt) => {
      evt.preventDefault();
      replaceEditFormToEventPoint();
      document.addEventListener('keydown', onEscKeyDown);
    };

    eventPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onOpenFormEdit);

    formEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onCloseFormEdit);

    formEditComponent.element.addEventListener('submit', onCloseFormEdit);

    render(eventPointComponent, this.#tripListComponent.element);
  };

  #renderEventPointList = () => {
    render(this.#tripListComponent, this.#tripListContainer);

    if (this.#eventPointsList.length === 0) {
      render(new NoEventPointView(), this.#tripListComponent.element);
    } else {
      this.#eventPointsList.forEach((event) => this.#renderEventPoint(event, this.#eventDestinations, this.#eventOffersByType));
    }
  };
}
