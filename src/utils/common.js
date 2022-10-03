const getWordCapitalized = (word) => word[0].toUpperCase() + word.slice(1);

const formatWords = (words) => words.toLowerCase().replace(/\s/g, '-');

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {
  getWordCapitalized,
  isEscapeKey,
  formatWords
};
