import {filter} from '../utils/filter.js';

export const generateFilter = (eventPoints) => Object.entries(filter).map(
  ([filterName, filterEventPoints]) => ({
    name: filterName,
    count: filterEventPoints(eventPoints).length,
  }),
);

