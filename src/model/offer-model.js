import Observable from '../framework/observable.js';
import {UpdateType} from '../constants.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offersByType = [];

  constructor(offersApiService) {
    super();

    this.#offersApiService = offersApiService;
  }

  get offersByType() {
    return this.#offersByType;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offersByType = offers;
    } catch (err) {
      this.#offersByType = [];
    }

    this._notify(UpdateType.INIT_OFFERS);
  };
}
