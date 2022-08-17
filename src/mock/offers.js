import {
  getRandomArrayElement,
  getRandomInteger
} from '../utils.js';
import {
  EVENT_POINT_TYPE,
  MIN_PRICE_EVENT_VALUE,
  MAX_RICE_EVENT_VALUE,
  OFFER_TITLES,
  OfferId
} from '../constants.js';

const generateOffer = (i) => ({
  id : i + 1,
  title : getRandomArrayElement(OFFER_TITLES),
  price : getRandomInteger(MIN_PRICE_EVENT_VALUE, MAX_RICE_EVENT_VALUE)
});

const mockOffers = new Array(OfferId.MAX).fill('').map((_, i) => generateOffer(i));

const generateOfferByType = (i) => ({
  type: EVENT_POINT_TYPE[i],
  offers: mockOffers
});

const mockOffersByType = new Array(EVENT_POINT_TYPE.length).fill('').map((_, i) => generateOfferByType(i));

export {
  mockOffers,
  mockOffersByType
};
