import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const getTransformationDateEvent = (dateEvent) => dayjs(dateEvent).format('YYYY-MM-DD');
const getTransformationDateEventForUI = (date) => dayjs(date).format('MMM D');
const getTransformationDate = (date) => dayjs(date).format();
const getTransformationTime = (time) => dayjs(time).format('HH:mm');
const getTransformationDateInEditForm = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const getTransformationDuration = (dateFrom, dateTo) => {
  dayjs.extend(duration);
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  const timeDuration = dayjs.duration(endDate.diff((startDate)));

  if (timeDuration.days() > 0) {
    return timeDuration.format('DD[D] HH[H] mm[M]');
  }
  if (timeDuration.hours() > 0) {
    return timeDuration.format('HH[H] mm[M]');
  }
  return timeDuration.format('mm[M]');
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const geArrayRandomLength = (array) => array.sort(() => Math.random() - 0.5).slice(getRandomInteger(0, array.length - 1));

const getWordCapitalized = (word) => word[0].toUpperCase() + word.slice(1);

const isPressEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {
  getTransformationDateEvent,
  getTransformationDateEventForUI,
  getTransformationDate,
  getTransformationTime,
  getTransformationDuration,
  getRandomInteger,
  getRandomArrayElement,
  geArrayRandomLength,
  getTransformationDateInEditForm,
  getWordCapitalized,
  isPressEscape
};
