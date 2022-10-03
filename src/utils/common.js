const getWordCapitalized = (word) => word[0].toUpperCase() + word.slice(1);

const formatWords = (words) => words.toLowerCase().replace(/\s/g, '-');

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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
  getWordCapitalized,
  isEscapeKey,
  updateItem,
  formatWords
};
