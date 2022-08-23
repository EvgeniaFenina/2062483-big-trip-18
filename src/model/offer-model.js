import {generateOffersByType} from '../mock/offers.js';

export default class OffersModel {
  offersByType = generateOffersByType();

  getOfferByType = () => this.offersByType;
}
