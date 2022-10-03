import AbstractView from '../framework/view/abstract-view.js';
import {getSumNumbersInArray} from '../utils/common.js';
import {getTransformationDatesTrip} from '../utils/event-point.js';
import {sortByDay} from '../utils/event-point.js';

const getCheckedOffersPrice = (offers, eventPoints) => {
  const checkedOffers = [];
  for (const point of eventPoints) {
    const offersByType = offers.find((offer) => offer.type === point.type).offers;
    checkedOffers.push(offersByType.filter((offer) => point.offers.includes(offer.id)));
  }
  const checkedOffersPrice = [];
  for (const checkedOffer of checkedOffers) {
    checkedOffersPrice.push(checkedOffer.map((offer) => offer.price));
  }

  return checkedOffersPrice;
};

const getTripPrice = (eventPoints, offers) => {
  const eventPointsPrices = eventPoints.map((point) => Number(point.basePrice));
  const generalBasePrice = getSumNumbersInArray(eventPointsPrices);

  const checkedOffersPriceSum = getSumNumbersInArray(getCheckedOffersPrice(offers, eventPoints).map((item) => getSumNumbersInArray(item)));

  return generalBasePrice + checkedOffersPriceSum;
};

const getTripTitle = (eventPoints, destinations) => {
  const sorteredPoints = eventPoints.sort(sortByDay);
  const getDestinationById = (dests, id) => dests.find((dest) => dest.id === id);
  const tripNames = [];
  for (const point of sorteredPoints) {
    tripNames.push(getDestinationById(destinations, point.destination).name);
  }

  return tripNames.length > 3 ? `
  ${tripNames[0]}&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;${tripNames[tripNames.length - 1]}
  ` : tripNames.join('&nbsp;&mdash;&nbsp;');
};

const getTripDates = (eventPoints) => {
  const sorteredPoints = eventPoints.sort(sortByDay);
  const startDate = sorteredPoints[0].dateFrom;
  const endDate = sorteredPoints[eventPoints.length - 1].dateTo;

  return getTransformationDatesTrip(startDate, endDate);
};

const createTripInfoTemplate = (eventPoints, destinations, offersByType) => (`
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripTitle(eventPoints, destinations)}</h1>
    <p class="trip-info__dates">${getTripDates(eventPoints)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;
    &nbsp;
    <span class="trip-info__cost-value">
      ${getTripPrice(eventPoints, offersByType)}
    </span>
  </p>
</section>`
);

export default class TripInfoView extends AbstractView {
  #eventPoints = null;
  #destinations = null;
  #offers = null;

  constructor(eventPoints, destinations, offersByType) {
    super();

    this.#eventPoints = eventPoints;
    this.#destinations = destinations;
    this.#offers = offersByType;
  }

  get template() {
    return createTripInfoTemplate(this.#eventPoints, this.#destinations, this.#offers);
  }
}
