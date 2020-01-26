const NUMBER_LENGTH = 2;

const getRandomInteger = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const formatCase = (str) => str[0].toUpperCase() + str.slice(1);

const formatNumber = (number) => number.toString().padStart(NUMBER_LENGTH, `0`);

const generateTemplates = (getTemplate) =>
  (arr) => arr.reduce((result, it) => result + getTemplate(it), ``);

export {getRandomInteger, getRandomArrayItem, formatCase, formatNumber, generateTemplates};
