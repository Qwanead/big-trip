import {MONTH_NAMES} from '../const';
import {formatNumber, createElement} from '../utils';

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

  return points.map((it) => it.destination).join(` &mdash; `);
};

const calculateEventPrice = (basePrice, offers) => {
  const offersChecked = offers.filter((it) => it.isChecked);
  const offersPrice = offersChecked.reduce((result, it) => it.price + result, 0);

  return offersPrice + basePrice;
};

const calculateTripCost = (points) =>
  points.reduce((result, it) =>
    result + calculateEventPrice(it.basePrice, it.offers), 0);

const createTripInfoTemplate = (points) => {
  const tripRoute = getTripRoute(points);
  const tripDate = getTripDate(points);
  const tripCost = calculateTripCost(points);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>
      <p class="trip-info__dates">${tripDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
    </p>`
  );
};

class TripInfo {
  constructor(points) {
    this._element = null;
    this.points = points;

  }

  getTemplate() {
    return createTripInfoTemplate(this.points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripInfo;
