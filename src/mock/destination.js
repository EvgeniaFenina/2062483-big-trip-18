import {getRandomArrayElement} from '../utils/common.js';
import {
  DESTINATION_NAMES,
  DESTINATION_DESCRIPTIONS,
  DestinationId
} from '../constants.js';

const generateDestination = (i) => ({
  id : i + 1,
  description : getRandomArrayElement(DESTINATION_DESCRIPTIONS),
  name : getRandomArrayElement(DESTINATION_NAMES),
  pictures: [
    {
      src : `http://picsum.photos/300/200?r=${Math.random()}`,
      description : getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    }
  ]
});

const generateDestinations = () => Array.from({length: DestinationId.MAX}, ((_, i) => generateDestination(i)));

export {generateDestinations};
