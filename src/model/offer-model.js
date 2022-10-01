import {generateOffersByType} from '../mock/offers.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offersByType = generateOffersByType();

  get offersByType() {
    return this.#offersByType;
  }
}
