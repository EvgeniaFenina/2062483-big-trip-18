import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EVENT_POINT_TYPES} from '../constants.js';
import {getTransformationDateInEditForm} from '../utils/event-point.js';
import {
  getWordCapitalized,
  formatWords
} from '../utils/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createEditFormTemplate = (eventPoint) => {
  const {
    dateFrom,
    dateTo,
    type,
    destination,
    basePrice,
    offers,
    destinations,
    offersByType,
    isDisabled,
    isSaving,
    isDeleting
  } = eventPoint;

  const getDestinationDescription = () => (destinations.find((dest) => dest.id === destination))?.description;

  const isTypeChecked = (checkedType, currentType) => currentType === checkedType ? 'checked' : '';

  const createTypeEditTemplate = (checkedType) => EVENT_POINT_TYPES.map((currentType) =>
    `<div class="event__type-item">
      <input
        id="event-type-${currentType}-${EVENT_POINT_TYPES.indexOf(currentType)}"
        class="event__type-input
        visually-hidden"
        type="radio"
        name="event-type"
        value="${currentType}"
        ${isTypeChecked(checkedType, currentType)}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="event__type-label
        event__type-label--${currentType}"
        for="event-type-${currentType}-${EVENT_POINT_TYPES.indexOf(currentType)}"
      >
      ${getWordCapitalized(currentType)}</label>
    </div>`).join('');


  const isOfferChecked = (offer) => offers.includes(offer.id) ? 'checked' : '';

  const createOfferTemplate = () => {
    const offerType = offersByType.find((offer) => offer.type === type);
    return offerType.offers.map((offer) =>
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox
          visually-hidden"
          id="event-offer-${formatWords(offer.title)}-${offer.id}"
          type="checkbox" name="event-offer-${formatWords(offer.title)}"
          value="${offer.id}" ${isOfferChecked(offer)}>
          <label class="event__offer-label"
          for="event-offer-${formatWords(offer.title)}-${offer.id}"
          ${isDisabled ? 'disabled' : ''}
        >
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');
  };

  const createOffersTemplate = () =>(
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${createOfferTemplate()}
    </section>`
  );

  const createPhotoTemplate = () => {
    const currentDestination = destinations.find((dest) => dest.id === destination);
    return currentDestination?.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  };

  const createDestinationTemplate = () => {
    const destinationName = (destination === undefined) ? '' : destinations.find((dest) => dest.id === destination).name;

    const destinationsOptions = [...new Set(destinations.map((dest) => `
    <option
      value="${dest.name}"
      ${destinationName === dest.name ? 'selected' : ''}
    >
    </option>`))].join('');

    return (
      `<label class="event__label  event__type-output" for="event-destination-${destination}">
        ${type}
      </label>
      <input
        class="event__input
        event__input--destination"
        id="event-destination-${destination}"
        type="text"
        value="${he.encode(destinationName)}"
        name="event-destination"
        list="destination-list-${destination}"
        onFocus="this.select()"
        autocomplete="off"
        required
        ${isDisabled ? 'disabled' : ''}
      >
      <datalist id="destination-list-${destination}">
        ${destinationsOptions}
      </datalist>`
    );
  };

  const createDestinationsTemplate = () => (
    `<section class="event__section  event__section--destination ${destination === undefined ? 'visually-hidden' : ''}">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${getDestinationDescription()}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPhotoTemplate()}
        </div>
      </div>
    </section>`
  );

  return (
    `<form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${destination}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${destination}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
            <div class="event__type-list">
              <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
                <legend class="visually-hidden">Event type</legend>
                ${createTypeEditTemplate(type)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
          ${createDestinationTemplate()}
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${destination}">From</label>
            <input
              class="event__input
              event__input--time"
              id="event-start-time-${destination}"
              type="text"
              name="event-start-time"
              value="${getTransformationDateInEditForm(dateFrom)}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-${destination}">To</label>
            <input class="event__input
              event__input--time"
              id="event-end-time-${destination}"
              type="text"
              name="event-end-time"
              value="${getTransformationDateInEditForm(dateTo)}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${destination}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input
              event__input--price"
              id="event-price-${destination}"
              type="number"
              name="event-price"
              value="${Number(basePrice)}"
              onFocus="this.select()"
              min="1"
              required
              ${isDisabled ? 'disabled' : ''}
            >
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">${isDeleting ? 'deleting...' : 'delete'}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${(offersByType) ? createOffersTemplate() : ''}
        ${(createDestinationsTemplate())}
        </section>
      </form>`
  );
};

export default class EditFormView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(eventPoint, destinations, offersByType) {
    super();

    this._state = EditFormView.parsePointToState(eventPoint, destinations, offersByType);
    this.#setInnerHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state);

  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
  };

  reset = (eventPoint, destinations, offersByType) => {
    this.updateElement(
      EditFormView.parsePointToState(eventPoint, destinations, offersByType),
    );
  };

  setEditFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#editFormSubmitHandler);
  };

  #editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToPoint(this._state));
  };

  setCollapseButtonClickHandler = (callback) => {
    this._callback.collapsedClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#collapseButtonClickHandler);
  };

  #collapseButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.collapsedClick();
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setEditFormSubmitHandler(this._callback.formSubmit);
    this.setCollapseButtonClickHandler(this._callback.collapsedClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const currentDestination = this._state.destinations.find((dest) => dest.name === evt.target.value);
    if (!currentDestination) {
      evt.target.value = '';
      return;
    }
    this.updateElement({
      destination: currentDestination.id
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value > 0) {
      this.updateElement({
        basePrice: evt.target.value,
      });
    } else {
      evt.target.value = '';
    }
  };

  #offersChangeHandler = (evt) => {
    const offersId = Number(evt.target.value);
    const hasOffer = this._state.offers.includes(offersId);
    const modifiedOffers = hasOffer ? this._state.offers.filter((offer) => offer !== offersId) : this._state.offers.concat(offersId);

    this.updateElement({
      offers: modifiedOffers
    });
  };

  #dateFromInputHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToInputHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr (
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromInputHandler,
        'time_24hr': true
      }
    );
  };

  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr (
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToInputHandler,
        'time_24hr': true
      }
    );
  };

  #setInnerHandlers = () => {
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditFormView.parseStateToPoint(this._state));
  };

  static parsePointToState = (eventPoint, destinations, offersByType) => ({
    ...eventPoint,
    destinations: destinations,
    offersByType: offersByType,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const eventPoint = {...state};

    delete eventPoint.destinations;
    delete eventPoint.offersByType;
    delete eventPoint.isDisabled;
    delete eventPoint.isSaving;
    delete eventPoint.isDeleting;

    return eventPoint;
  };
}
