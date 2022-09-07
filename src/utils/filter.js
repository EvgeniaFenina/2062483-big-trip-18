import {FilterType} from '../constants.js';
import {
  isEventPointInFuture,
  isEventPointInPast
} from './event-point.js';


const filter = {
  [FilterType.EVERYTHING] : (eventPoints) => eventPoints.filter((point) => point),
  [FilterType.FUTURE] : (eventPoints) => eventPoints.filter((point) => isEventPointInFuture(point)),
  [FilterType.PAST] : (eventPoints) => eventPoints.filter((point) => isEventPointInPast(point)),
};

export {filter};
