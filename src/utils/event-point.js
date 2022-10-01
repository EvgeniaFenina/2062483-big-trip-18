import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const getTransformationDateEvent = (dateEvent) => dayjs(dateEvent).format('YYYY-MM-DD');
const getTransformationDateEventForUI = (date) => dayjs(date).format('MMM D');
const getTransformationDate = (date) => dayjs(date).format();
const getTransformationTime = (time) => dayjs(time).format('HH:mm');
const getTransformationDateInEditForm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const getDurationEventInMin = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

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

const isEventPointInFuture = ({dateFrom}) => dayjs().isSame(dayjs(dateFrom)) || dayjs().isBefore(dayjs(dateFrom));

const isEventPointInPast = ({dateTo}) => dayjs().isAfter(dayjs(dateTo));

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const sortByTime = (a, b) => getDurationEventInMin(b.dateFrom, b.dateTo) - getDurationEventInMin(a.dateFrom, a.dateTo);

const sortByDay = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {
  getTransformationDateEvent,
  getTransformationDateEventForUI,
  getTransformationDate,
  getTransformationTime,
  getTransformationDuration,
  getTransformationDateInEditForm,
  isEventPointInFuture,
  isEventPointInPast,
  sortByPrice,
  sortByTime,
  sortByDay,
  isDatesEqual
};
