import {getRandomArrayItem, getRandomInteger} from '../utils/common';
import {POINT_TYPES, POINT_ACTIVITYS, DESTINATIONS} from '../const';

const OFFERS = [
  {
    title: `Add luggage`,
    price: 10,
    isChecked: false,
    shortTitle: `luggage`,
  },
  {
    title: `Switch to comfort class`,
    price: 150,
    isChecked: false,
    shortTitle: `comfort`,
  },
  {
    title: `Add meal`,
    price: 2,
    isChecked: false,
    shortTitle: `meal`,
  },
  {
    title: `Choose seats`,
    price: 9,
    isChecked: false,
    shortTitle: `seats`,
  },
];

const getPicturesList = () => {
  const MIN_PICTURES_COUNT = 1;
  const MAX_PICTURES_COUNT = 5;

  const picturesCount = getRandomInteger(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT);

  let picturesList = [];

  for (let i = picturesCount; i--; i > 0) {
    let item = {
      src: `http://picsum.photos/300/150?r=${Math.random()}`,
      description: `Event photo`,
    };

    picturesList.push(item);
  }

  return picturesList;
};

const getRandomText = () => {
  const MIN_TEXT_LENGTH = 1;
  const MAX_TEXT_LENGTH = 3;

  const textLength = getRandomInteger(MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);

  const PHRASES = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const firstPhrase = getRandomInteger(0, PHRASES.length - 1 - textLength);

  return PHRASES.slice(firstPhrase, firstPhrase + textLength).join(` `);
};

const getRandomDate = () => {
  const MAX_DIFF_HOUR = 75;
  const MAX_DIFF_MINUTE = 60;

  let dateFrom = new Date();
  dateFrom.setHours(getRandomInteger(0, MAX_DIFF_HOUR));
  dateFrom.setMinutes(getRandomInteger(0, MAX_DIFF_MINUTE));

  let dateTo = new Date(dateFrom);
  dateTo.setHours(dateTo.getHours() + getRandomInteger(0, MAX_DIFF_HOUR));
  dateTo.setMinutes(dateTo.getMinutes() + getRandomInteger(0, MAX_DIFF_MINUTE));

  return {dateFrom, dateTo};
};

const getOffers = () => {
  const MIN_OFFERS_COUNT = 0;
  const MAX_OFFERS_COUNT = 2;
  let offersCount = getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT);

  let offers = [];

  OFFERS.forEach((offer, index) => {
    offers[index] = Object.assign({}, offer);
  });

  if (offersCount === 0) {
    return offers;
  }

  offers.forEach((offer) => {
    if ((Math.random() > 0.5) && (offersCount !== 0)) {
      offer.isChecked = true;
      offersCount--;
    }
  });

  return offers;
};

const getPointMock = () => {
  const date = getRandomDate();

  const pointMock = {
    type: getRandomArrayItem(POINT_TYPES.concat(POINT_ACTIVITYS)),
    destination: getRandomArrayItem(DESTINATIONS),
    pictures: getPicturesList(),
    description: getRandomText(),
    dateFrom: date.dateFrom,
    dateTo: date.dateTo,
    basePrice: getRandomInteger(1, 10) * 100 + getRandomInteger(1, 10) * 10,
    offers: getOffers(),
  };

  return pointMock;
};

const getPointsMock = (num) => {
  const pointMocks = [];

  for (let i = 0; i < num; i++) {
    pointMocks.push(getPointMock());
  }

  return pointMocks;
};

export {getPointsMock};
