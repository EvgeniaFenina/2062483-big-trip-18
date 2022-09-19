const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const geArrayRandomLength = (array) => array.sort(() => Math.random() - 0.5).slice(getRandomInteger(0, array.length - 1));

const getWordCapitalized = (word) => word[0].toUpperCase() + word.slice(1);

const isPressEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getRandomInteger,
  getRandomArrayElement,
  geArrayRandomLength,
  getWordCapitalized,
  isPressEscape,
  updateItem
};
