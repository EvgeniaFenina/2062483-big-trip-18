import {generateOffersByType} from '../mock/offers.js';

export default class OffersModel {
  #offersByType = generateOffersByType();

  get offerByType() {
    return this.#offersByType;
  }
}
