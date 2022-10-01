import {generateEventPoint} from '../mock/event-point.js';
import Observable from '../framework/observable.js';

export default class EventPointModel extends Observable {
  #eventPoints = Array.from({length : 3}, generateEventPoint);

  get eventPoints() {
    return this.#eventPoints;
  }

  addEventPoint = (updateType, update) => {
    this.#eventPoints = [
      update,
      ...this.#eventPoints,
    ];

    this._notify(updateType, update);
  };

  updateEventPoint = (updateType, update) => {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event point');
    }

    this.#eventPoints = [
      ...this.#eventPoints.slice(0, index),
      update,
      ...this.#eventPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
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
}
