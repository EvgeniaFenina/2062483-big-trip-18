import {generateDestinations} from '../mock/destination.js';

export default class DestinationsModel {
  #destinations = generateDestinations();

  get destination() {
    return this.#destinations;
  }
}
