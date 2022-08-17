import {render} from './render.js';
import FiltersView from './view/filter-view.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import EventPointModel from './model/event-point-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripListElement = document.querySelector('.trip-events');
const eventPointModel = new EventPointModel();
const tripListPresenter = new TripListPresenter();

render(new FiltersView(), siteFilterElement);

tripListPresenter.init(siteTripListElement, eventPointModel);
