import {MONTH_NAMES} from '../const';
import {calculateTotalPrice} from '../utils';

const createTripInfoTemplate = (points) => {

  const getTripDate = () => {

    const convertDate = (date) => {

      const formatValue = (value) => {
        if (value < 10) {
          return `0` + value;
        } else {
          return value;
        }
      };

      const month = MONTH_NAMES[date.getMonth()].slice(0, 3).toUpperCase();
      const day = formatValue(date.getDate());

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

  const getTripRout = () => {
    const beginPoint = points[0].destination;
    const endPoint = points[points.length - 1].destination;

    if (points.length > 3) {
      return `${beginPoint} &mdash; ... &mdash; ${endPoint}`;
    }

    return points.map((it) => it.destination).join(` &mdash; `);
  };

  const calculateTripCost = () => {
    let tripCoast = 0;

    points.forEach((it) => {
      tripCoast += calculateTotalPrice(it.basePrice, it.offers);
    });

    return tripCoast;
  };


  return (`
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripRout()}</h1>
      <p class="trip-info__dates">${getTripDate()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTripCost()}</span>
    </p>
  `);
};

export {createTripInfoTemplate};
