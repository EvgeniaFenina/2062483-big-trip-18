import {render} from '../render.js';
import TripListView from '../view/trip-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventPointView from '../view/event-point-view.js';
import {isPressEscape} from '../utils.js';

export default class TripListPresenter {
  #tripListComponent = new TripListView();

  #tripListContainer = null;
  #eventPointsModel = null;
  #destinationModel = null;
  #offerModel = null;

  #eventPointsList = [];
  #eventDestinations = [];
  #eventOffersByType = [];

  init = (tripListContainer, eventPointsModel, destinationModel, offerModel) => {
    this.#tripListContainer = tripListContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#eventPointsList = [...this.#eventPointsModel.eventPoints];
    this.#eventDestinations = [...this.#destinationModel.destination];
    this.#eventOffersByType = [...this.#offerModel.offerByType];

    render(this.#tripListComponent, this.#tripListContainer);

    this.#eventPointsList.forEach((event) => {
      this.#renderEventPoints(event, this.#eventDestinations, this.#eventOffersByType);
    });
  };

  #renderEventPoints = (eventPoints, destinations, offersByType) => {
    const eventPointComponent = new EventPointView(eventPoints, destinations, offersByType);
    const formEditComponent = new EditFormView(eventPoints, destinations, offersByType);

    const replaceEventPointsListToEditForm = () => this.#tripListComponent.element.replaceChild(formEditComponent.element, eventPointComponent.element);

    const replaceEditFormToEventPointsList = () => this.#tripListComponent.element.replaceChild(eventPointComponent.element, formEditComponent.element);

    const onEscKeyDown = (evt) => {
      if (isPressEscape(evt)) {
        evt.preventDefault();
        replaceEditFormToEventPointsList();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onOpenFormEdit = (evt) => {
      evt.preventDefault();
      replaceEventPointsListToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    };

    const onCloseFormEdit = (evt) => {
      evt.preventDefault();
      replaceEditFormToEventPointsList();
      document.addEventListener('keydown', onEscKeyDown);
    };

    eventPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onOpenFormEdit);

    formEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onCloseFormEdit);

    formEditComponent.element.addEventListener('submit', onCloseFormEdit);

    render(eventPointComponent, this.#tripListComponent.element);
  };
}
