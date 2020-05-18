import {MONTH_NAMES} from '../const';
import {formatNumber} from '../utils/common';
import AbstractComponent from './abstract-component';


const ROUTE_INFO_LENGTH = 3;

const getTripDate = (points) => {

  const convertDate = (date) => {
    const month = MONTH_NAMES[date.getMonth()].slice(0, 3).toUpperCase();
    const day = formatNumber(date.getDate());

    return {day, month};
  };

  const beginDate = convertDate(points[0].dateFrom);
  const endDate = convertDate(points[points.length - 1].dateTo);

  if (beginDate.month === endDate.month) {
    return (`
      ${beginDate.month} ${beginDate.day}&nbsp;&mdash;&nbsp;${endDate.day}
    `);
  }

  return (`
    ${beginDate.month} ${beginDate.day}&nbsp;&mdash;&nbsp;${endDate.month} ${endDate.day}
  `);
};

const getTripRoute = (points) => {
  const beginPoint = points[0].destination;
  const endPoint = points[points.length - 1].destination;

  if (points.length > ROUTE_INFO_LENGTH) {
    return `${beginPoint} &mdash; ... &mdash; ${endPoint}`;
  }

  return points.map((point) => point.destination).join(` &mdash; `);
};

const createTripInfoTemplate = (points) => {
  if (points.length === 0) {
    return ` `;
  }

  const tripRoute = getTripRoute(points);
  const tripDate = getTripDate(points);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>
      <p class="trip-info__dates">${tripDate}</p>
    </div>`
  );
};

class TripInfo extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }

  removeElement() {
    this._element = null;
  }
}

export default TripInfo;
