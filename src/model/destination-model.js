import {generateDestinations} from '../mock/destination.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = generateDestinations();

  get destinations() {
    return this.#destinations;
  }
}
