import Observable from '../framework/observable.js';
import {UpdateType} from '../constants.js';

export default class DestinationModel extends Observable {
  #eventPointApiService = null;
  #destinations = [];

  constructor(eventPointApiService) {
    super();

    this.#eventPointApiService = eventPointApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#eventPointApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT_DESTINATIONS);
  };
}
