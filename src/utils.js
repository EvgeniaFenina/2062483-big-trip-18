import dayjs from 'dayjs';
import {
  MINUTES_IN_HOUR,
  MINUTES_IN_DAY
} from './constants.js';

const getTransformationDateEvent = (dateEvent) => dayjs(dateEvent).format('YYYY-MM-DD');
const getTransformationDateEventForUI = (date) => dayjs(date).format('MMM D');
const getTransformationDate = (date) => date !== null ? dayjs(date).format() : '';
const getTransformationTime = (time) => dayjs(time).format('HH:mm');
const getTransformationDateInEditForm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const getDurationEvent = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'm');

const convertDurationInMinutes = (minutes) => `${String(Math.floor(minutes)).padStart(2, '0')}M`;
const convertDurationInHours = (minutes) => `${String(Math.floor(minutes / MINUTES_IN_HOUR)).padStart(2, '0')}H ${convertDurationInMinutes(minutes - Math.floor(minutes / MINUTES_IN_HOUR) * MINUTES_IN_HOUR)}`;
const convertDurationInDays = (minutes) => `${String(Math.floor(minutes / MINUTES_IN_DAY)).padStart(2, '0')}D ${convertDurationInHours(minutes - Math.floor(minutes / MINUTES_IN_DAY) * MINUTES_IN_DAY)}`;


const getTransformationDuration = (dateFrom, dateTo) => {
  const durationInMin = getDurationEvent(dateFrom, dateTo);
  if (durationInMin < MINUTES_IN_HOUR) {
    return convertDurationInMinutes(durationInMin);
  }
  if (durationInMin > MINUTES_IN_HOUR && durationInMin < MINUTES_IN_DAY) {
    return convertDurationInHours(durationInMin);
  }
  if (durationInMin > MINUTES_IN_DAY) {
    return convertDurationInDays(durationInMin);
  }
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const geArrayRandomLength = (array) => array.sort(() => Math.random() - 0.5).slice(getRandomInteger(0, array.length - 1));

const getWordCapitalized = (word) => word[0].toUpperCase() + word.slice(1);

export {
  getTransformationDateEvent,
  getTransformationDateEventForUI,
  getTransformationDate,
  getTransformationTime,
  getTransformationDuration,
  getDurationEvent,
  getRandomInteger,
  getRandomArrayElement,
  geArrayRandomLength,
  getTransformationDateInEditForm,
  getWordCapitalized
};
