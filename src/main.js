import {render} from './framework/render.js';
import FiltersView from './view/filter-view.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import EventPointModel from './model/event-point-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import {generateFilter} from './mock/filter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripListElement = document.querySelector('.trip-events');

const eventPointModel = new EventPointModel();
const destinationModel = new DestinationsModel();
const offerModel = new OffersModel();
const tripListPresenter = new TripListPresenter(siteTripListElement, eventPointModel, destinationModel, offerModel);

const filters = generateFilter(eventPointModel.eventPoints);

render(new FiltersView(filters), siteFilterElement);

tripListPresenter.init();
