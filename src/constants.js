const MIN_PRICE_EVENT_VALUE = 0;
const MAX_RICE_EVENT_VALUE = 1000;
const MAX_MINUTES_IN_EVENT_DAY_FROM = 500;
const MAX_MINUTES_IN_EVENT_DAY_TO = 2000;

const EVENT_POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFER_TITLES = [
  'Switch to comfort',
  'Order Uber',
  'Book tickets',
  'Lunch in city',
  'Upgrade to a business class'
];

const OfferId = {
  MIN: 0,
  MAX: OFFER_TITLES.length
};

const DESTINATION_NAMES = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
  'Berlin',
  'Paris'
];

const DESTINATION_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Brandenburg Gate',
  'Eiffel Tower',
  'Vincent Van Gogh Museum'
];

const DestinationId = {
  MIN: 0,
  MAX: DESTINATION_NAMES.length
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export {
  EVENT_POINT_TYPES,
  MIN_PRICE_EVENT_VALUE,
  MAX_RICE_EVENT_VALUE,
  OFFER_TITLES,
  OfferId,
  DESTINATION_NAMES,
  DESTINATION_DESCRIPTIONS,
  DestinationId,
  MAX_MINUTES_IN_EVENT_DAY_FROM,
  MAX_MINUTES_IN_EVENT_DAY_TO,
  FilterType
};

