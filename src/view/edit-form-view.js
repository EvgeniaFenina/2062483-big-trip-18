import {createElement} from '../render.js';
import {EVENT_POINT_TYPES} from '../constants.js';
import {
  getTransformationDateInEditForm,
  getWordCapitalized
} from '../utils.js';

const createEditFormTemplate = (eventPoint, destinations, offersByType) => {
  const {dateFrom, dateTo, type, destination, basePrice, offers} = eventPoint;


  const getDestinationName = () => (destinations.find((dest) => dest.id === destination)).name;

  const getDestinationDescription = () => (destinations.find((dest) => dest.id === destination)).description;

  const isTypeChecked = (checkedType, currentType) => currentType === checkedType ? 'checked' : '';

  const createTypeEditTemplate = (checkedType) => EVENT_POINT_TYPES.map((currentType) =>
    `<div class="event__type-item">
      <input id="event-type-${currentType}-${EVENT_POINT_TYPES.indexOf(currentType)}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isTypeChecked(checkedType, currentType)}>
      <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${getWordCapitalized(currentType)}</label>
    </div>`).join('');


  const isOfferChecked = (offer) => offers.includes(offer.id) ? 'checked' : '';

  const createOfferEditTemplate = () => {
    const offerType = offersByType.find((offer) => offer.type === type);
    return offerType.offers.map((offer) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offer)}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');
  };

  return (
    `<form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypeEditTemplate(type)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getDestinationName()}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getTransformationDateInEditForm(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getTransformationDateInEditForm(dateTo)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createOfferEditTemplate()}
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${getDestinationDescription()}</p>
          </section>
        </section>
      </form>` );
};

export default class EditFormView {
  #element = null;
  #eventPoint = null;
  #destinations = null;
  #offersByType = null;

  constructor(eventPoint, destinations, offersByType) {
    this.#eventPoint = eventPoint;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  get template() {
    return createEditFormTemplate(this.#eventPoint, this.#destinations, this.#offersByType);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
