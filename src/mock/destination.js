import {getRandomArrayElement} from '../utils.js';
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

const mockDestinations = new Array(DestinationId.MAX).fill('').map((_, i) => generateDestination(i));

export {mockDestinations};
