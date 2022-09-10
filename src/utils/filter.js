import {FilterType} from '../constants.js';
import {
  isEventPointInFuture,
  isEventPointInPast
} from './event-point.js';


const filter = {
  [FilterType.EVERYTHING] : (eventPoints) => eventPoints,
  [FilterType.FUTURE] : (eventPoints) => eventPoints.filter(isEventPointInFuture),
  [FilterType.PAST] : (eventPoints) => eventPoints.filter(isEventPointInPast),
};

export {filter};
