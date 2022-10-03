import Observable from '../framework/observable.js';
import {UpdateType} from '../constants.js';

export default class OfferModel extends Observable {
  #eventPointApiService = null;
  #offersByType = [];

  constructor(eventPointApiService) {
    super();

    this.#eventPointApiService = eventPointApiService;
  }

  get offersByType() {
    return this.#offersByType;
  }

  init = async () => {
    try {
      const offers = await this.#eventPointApiService.offers;
      this.#offersByType = offers;
    } catch (err) {
      this.#offersByType = [];
    }

    this._notify(UpdateType.INIT_OFFERS);
  };
}
