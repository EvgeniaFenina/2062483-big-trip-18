import {
  getRandomArrayElement,
  getRandomInteger
} from '../utils/common.js';
import {
  DESTINATION_NAMES,
  DESTINATION_DESCRIPTIONS,
  DestinationId
} from '../constants.js';

const generateDestination = (i) => ({
  id : i + 1,
  description : getRandomArrayElement(DESTINATION_DESCRIPTIONS),
  name : getRandomArrayElement(DESTINATION_NAMES),
  pictures : [
    {
      src :  `img/photos/${getRandomInteger(1, 5)}.jpg`,
      description : getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    }
  ]
});

const generateDestinations = () => Array.from({length: DestinationId.MAX}, ((_, i) => generateDestination(i)));

export {generateDestinations};
