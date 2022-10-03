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
  POST: 'POST',
  DELETE: 'DELETE'
};

const AUTHORIZATION = 'Basic fvjnjn3jn5njk3m';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const maxDisplayedPointsName = 3;

export {
  EVENT_POINT_TYPES,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  EMPTY_POINT,
  Method,
  AUTHORIZATION,
  END_POINT,
  TimeLimit,
  maxDisplayedPointsName
};

