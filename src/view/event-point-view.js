import AbstractView from '../framework/view/abstract-view.js';
import {
  getTransformationDateEvent,
  getTransformationDateEventForUI,
  getTransformationDate,
  getTransformationTime,
  getTransformationDuration
} from '../utils/event-point.js';

const createEventPointTemplate = (eventPoint, destinations, offersByType) => {
  const {dateFrom, dateTo, type, destination, basePrice, offers, isFavorite} = eventPoint;

  const getDestinationName = () => (destinations.find((dest) => dest.id === destination)).name;

  const isFavoriteOffer = () => isFavorite ? 'event__favorite-btn--active' : '';

  const createOffersTemplate = () => {
    const offersByPointType = offersByType.find((offer) => offer.type === type);
    const offersToAd = offersByPointType.offers.filter((offer) => offers.indexOf(offer.id) >= 0);
    return offersToAd.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
    ).join('');
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${getTransformationDateEvent(dateFrom)}>${getTransformationDateEventForUI(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${getDestinationName()}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${getTransformationDate(dateFrom)}>${getTransformationTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime=${getTransformationDate(dateTo)}>${getTransformationTime(dateTo)}</time>
          </p>
          <p class="event__duration">${getTransformationDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${Number(basePrice)}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate()}
        </ul>
        <button class="event__favorite-btn  ${isFavoriteOffer()}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventPointView extends AbstractView {
  #eventPoint = null;
  #destinations = null;
  #offersByType = null;

  constructor(eventPoint, destinations, offersByType) {
    super();

    this.#eventPoint = eventPoint;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  get template() {
    return createEventPointTemplate(this.#eventPoint, this.#destinations, this.#offersByType);
  }

  setExpandButtonClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#expandButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #expandButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
