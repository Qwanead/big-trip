const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const formatCase = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const calculateTotalPrice = (basePrice, offers) => {
  const offersChecked = offers.filter((it) => it.isChecked);

  let offersPrice = 0;

  if (offersChecked) {
    offersChecked.forEach((it) => {
      offersPrice += it.price;
    });
  }

  return offersPrice + basePrice;
};

export {getRandomInteger, getRandomArrayItem, formatCase, calculateTotalPrice};
