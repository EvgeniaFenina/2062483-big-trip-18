import AbstractView from '../framework/view/abstract-view.js';
import {getTransformationDatesTrip} from '../utils/event-point.js';
import {sortByDay} from '../utils/event-point.js';
import {maxDisplayedPointsName} from '../constants.js';

const createTripInfoTemplate = (tripDates, tripTitle, tripPrice) => (`
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${tripTitle}</h1>
    <p class="trip-info__dates">${tripDates}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;
    &nbsp;
    <span class="trip-info__cost-value">
      ${tripPrice}
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
    return createTripInfoTemplate(
      this.#getTripDates(this.#eventPoints),
      this.#getTripTitle(this.#eventPoints, this.#destinations),
      this.#getTripPrice(this.#eventPoints, this.#offers)
    );
  }

  #getTripDates = (eventPoints) => {
    const sorteredPoints = eventPoints.sort(sortByDay);
    const startDate = sorteredPoints[0].dateFrom;
    const endDate = sorteredPoints.at(-1).dateTo;

    return getTransformationDatesTrip(startDate, endDate);
  };

  #getTripTitle = (eventPoints, destinations) => {
    const sorteredPoints = eventPoints.sort(sortByDay);
    const getDestinationById = (dests, id) => dests.find((dest) => dest.id === id);
    const tripNames = [];

    for (const point of sorteredPoints) {
      tripNames.push(getDestinationById(destinations, point.destination).name);
    }

    if (tripNames.length > maxDisplayedPointsName) {
      tripNames.splice(1, tripNames.length - 2, '&hellip;');
      return tripNames.join('&nbsp;&mdash;');
    }

    return tripNames.join('&nbsp;&mdash;&nbsp;');
  };

  #getTripPrice = (eventPoints, offers) => {
    const tripPrice = eventPoints.reduce((totalPrice, point) => {

      const offersByType = offers.find((offer) => offer.type === point.type).offers;
      const offersPriceSum = offersByType.reduce((sumPrice, offer) => {

        if (point.offers.includes(offer.id)) {
          sumPrice += offer.price;
        }

        return sumPrice;
      }, 0);

      totalPrice += point.basePrice + offersPriceSum;
      return totalPrice;
    }, 0);

    return tripPrice;
  };
}
