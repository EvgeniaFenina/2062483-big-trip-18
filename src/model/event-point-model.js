import Observable from '../framework/observable.js';
import {UpdateType} from '../constants.js';

export default class EventPointModel extends Observable {
  #eventPointsApiService = null;
  #eventPoints = [];

  constructor(eventPointsApiService) {
    super();

    this.#eventPointsApiService = eventPointsApiService;
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  init = async () => {
    try {
      const eventPoints = await this.#eventPointsApiService.eventPoints;
      this.#eventPoints = eventPoints.map(this.#adaptToClient);
    } catch (err) {
      this.#eventPoints = [];
    }

    this._notify(UpdateType.INIT_POINTS);
  };

  addEventPoint = (updateType, update) => {
    this.#eventPoints = [
      update,
      ...this.#eventPoints,
    ];

    this._notify(updateType, update);
  };

  updateEventPoint = async (updateType, update) => {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event point');
    }

    try {
      const response = await this.#eventPointsApiService.updateEventPoint(update);
      const updatedEventPoint = this.#adaptToClient(response);
      this.#eventPoints = [
        ...this.#eventPoints.slice(0, index),
        update,
        ...this.#eventPoints.slice(index + 1),
      ];
      this._notify(updateType, updatedEventPoint);
    } catch(err) {
      throw new Error('Can\'t update event point');
    }
  };

  deleteEventPoint = (updateType, update) => {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event point');
    }

    this.#eventPoints = [
      ...this.#eventPoints.slice(0, index),
      ...this.#eventPoints.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (eventPoints) => {
    const adaptedPoint = {
      ...eventPoints,
      basePrice: eventPoints['base_price'],
      dateFrom: eventPoints['date_from'],
      dateTo: eventPoints['date_to'],
      isFavorite: eventPoints['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}
