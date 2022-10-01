import {render} from './framework/render.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventPointModel from './model/event-point-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripListElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header__container');

const eventPointModel = new EventPointModel();
const destinationModel = new DestinationsModel();
const offerModel = new OffersModel();
const filterModel = new FilterModel();
const newEventButtonComponent = new NewEventButtonView();

const tripListPresenter = new TripListPresenter(siteTripListElement, eventPointModel, destinationModel, offerModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventPointModel);

const handleNewEventPointFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventPointButtonClick = () => {
  tripListPresenter.createEventPoint(handleNewEventPointFormClose);
  newEventButtonComponent.element.disabled = true;
};


render(newEventButtonComponent, siteHeaderElement);
newEventButtonComponent.setClickHandler(handleNewEventPointButtonClick);

filterPresenter.init();
tripListPresenter.init();
