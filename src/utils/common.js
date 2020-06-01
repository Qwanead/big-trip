import {POINT_ACTIVITYS} from '../const';

const NUMBER_LENGTH = 2;

const isActivitys = (eventType) => POINT_ACTIVITYS.some((activity) => activity === eventType);

const formatCase = (str) => str[0].toUpperCase() + str.slice(1);

const formatString = (str) => str.replace(/ /g, `-`).toLowerCase();

const formatNumber = (number) => number.toString().padStart(NUMBER_LENGTH, `0`);

const generateTemplates = (getTemplate) =>
  (arr) => arr.reduce((result, it) => result + getTemplate(it), ``);

export {isActivitys, formatCase, formatNumber, generateTemplates, formatString};
