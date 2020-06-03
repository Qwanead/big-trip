import {POINT_ACTIVITYS} from '../const';

const NUMBER_LENGTH = 2;

const isActivitys = (eventType) => POINT_ACTIVITYS.some((activity) => activity === eventType);

const formatCase = (str) => str[0].toUpperCase() + str.slice(1);

const formatString = (str) => str.replace(/ /g, `-`).toLowerCase();

const formatNumber = (number) => number.toString().padStart(NUMBER_LENGTH, `0`);

const calculateTotalCost = (points) => {
  const calculateEventPrice = (basePrice, offers) => {
    const offersPrice = offers.reduce((result, offer) => offer.price + result, 0);
    return offersPrice + basePrice;
  };

  return points.reduce((result, point) =>
    result + calculateEventPrice(point.basePrice, point.offers), 0);
};


const generateTemplates = (getTemplate) =>
  (arr) => arr.reduce((result, item) => result + getTemplate(item), ``);

export {isActivitys, formatCase, formatNumber, calculateTotalCost, generateTemplates, formatString};
