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

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT_POINTS: 'INIT_POINTS',
  INIT_OFFERS: 'INIT_OFFERS',
  INIT_DESTINATIONS: 'INIT_DESTINATIONS'
};

const EMPTY_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: undefined,
  isFavorite: false,
  offers: [],
  type: 'bus',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
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
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  EMPTY_POINT,
  Method
};

