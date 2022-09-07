import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {
  getRandomArrayElement,
  getRandomInteger,
  geArrayRandomLength
} from '../utils/common.js';
import {
  EVENT_POINT_TYPES,
  MIN_PRICE_EVENT_VALUE,
  MAX_RICE_EVENT_VALUE,
  DestinationId,
  OfferId,
  MAX_MINUTES_IN_EVENT_DAY_FROM,
  MAX_MINUTES_IN_EVENT_DAY_TO
} from '../constants.js';

const generateDate = (to, from) => dayjs().add(getRandomInteger(to, from), 'minute').toISOString();

const generateOfferId = () => Array.from({length: OfferId.MAX}, ((_, i) => i));

export const generateEventPoint = () => ({
  basePrice : getRandomInteger(MIN_PRICE_EVENT_VALUE, MAX_RICE_EVENT_VALUE),
  dateFrom : generateDate(0, MAX_MINUTES_IN_EVENT_DAY_FROM),
  dateTo : generateDate(MAX_MINUTES_IN_EVENT_DAY_FROM, MAX_MINUTES_IN_EVENT_DAY_TO),
  destination: getRandomInteger(DestinationId.MIN + 1, DestinationId.MAX),
  id : nanoid(),
  isFavorite : Boolean(getRandomInteger(0, 1)),
  offers: geArrayRandomLength(generateOfferId()),
  type : getRandomArrayElement(EVENT_POINT_TYPES)
});
