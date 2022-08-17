import { generateEventPoint } from '../mock/event-point.js';

export default class EventPointModel {
  eventPoints = Array.from({length: 4}, generateEventPoint);

  getEventPoints = () => this.eventPoints;
}


