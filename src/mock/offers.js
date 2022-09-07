import {
  getRandomArrayElement,
  getRandomInteger
} from '../utils/common.js';
import {
  EVENT_POINT_TYPES,
  MIN_PRICE_EVENT_VALUE,
  MAX_RICE_EVENT_VALUE,
  OFFER_TITLES,
  OfferId
} from '../constants.js';

const generateOffer = (i) => ({
  id : i,
  title : getRandomArrayElement(OFFER_TITLES),
  price : getRandomInteger(MIN_PRICE_EVENT_VALUE, MAX_RICE_EVENT_VALUE)
});

const mockOffers = Array.from({length: OfferId.MAX}, ((_, i) => generateOffer(i)));

const generateOfferByType = (i) => ({
  type: EVENT_POINT_TYPES[i],
  offers: mockOffers
});

const generateOffersByType = () => Array.from({length: EVENT_POINT_TYPES.length}, ((_, i) => generateOfferByType(i)));

export {generateOffersByType};
