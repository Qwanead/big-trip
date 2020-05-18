const NUMBER_LENGTH = 2;

const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const formatCase = (str) => str[0].toUpperCase() + str.slice(1);

const formatNumber = (number) => number.toString().padStart(NUMBER_LENGTH, `0`);

const convertArrayToString = (arr, cb = (it) => it) =>
  arr.reduce((result, it) => result + cb(it), ``);

export {getRandomInteger, getRandomArrayItem, formatCase, formatNumber, convertArrayToString};
