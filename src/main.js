import {render} from './framework/render.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventPointModel from './model/event-point-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import EventPointApiService from './event-point-api.js';
import {
  AUTHORIZATION,
  END_POINT
} from './constants.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripListElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');

const eventPointModel = new EventPointModel(new EventPointApiService(END_POINT, AUTHORIZATION));
const destinationModel = new DestinationsModel(new EventPointApiService(END_POINT, AUTHORIZATION));
const offerModel = new OffersModel(new EventPointApiService(END_POINT, AUTHORIZATION));
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

tripListPresenter.init();
filterPresenter.init();
destinationModel.init();
offerModel.init();
eventPointModel.init().finally(() => {
  render(newEventButtonComponent, siteHeaderElement);
  newEventButtonComponent.setClickHandler(handleNewEventPointButtonClick);
});
