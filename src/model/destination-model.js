import {generateDestinations} from '../mock/destination.js';

export default class DestinationsModel {
  destinations = generateDestinations();

  getDestination = () => this.destinations;
}
