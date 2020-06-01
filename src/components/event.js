import {formatCase, formatNumber, generateTemplates, isActivitys} from '../utils/common';

import AbstractSmartComponent from './abstract-smart-component';
import moment from 'moment';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;
const OFFERS_COUNT = 3;

const convertDateToTime = (date) => moment(date).format(`HH:mm`);

const calculateDiffDate = (beginDate, endDate) => {

  const minutesDiff = moment(endDate).diff(moment(beginDate), `minutes`);
  const hoursDiff = moment(endDate).diff(moment(beginDate), `hours`);
  const daysDiff = moment(endDate).diff(moment(beginDate), `days`);

  const day = daysDiff;
  const hour = hoursDiff - day * HOURS_IN_DAY;
  const minute = minutesDiff - day * MINUTES_IN_DAY - hour * MINUTES_IN_HOUR;

  if (minutesDiff < MINUTES_IN_HOUR) {
    return `${formatNumber(minute)}M`;
  }

  if (hoursDiff < HOURS_IN_DAY) {
    return `${formatNumber(hour)}H ${formatNumber(minute)}M`;
  }

  return `${formatNumber(day)}D ${formatNumber(hour)}H ${formatNumber(minute)}M`;
};

const getOfferTemplate = ({title, price}) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const getOffersListTemplate = (offersChecked) => {
  let offersCheckedShort = [];

  if (offersChecked.length > OFFERS_COUNT) {
    offersCheckedShort = offersChecked.slice(0, OFFERS_COUNT);
  } else {
    offersCheckedShort = offersChecked;
  }

  const getOffersTemplates = generateTemplates(getOfferTemplate);

  return getOffersTemplates(offersCheckedShort);
};

const createEventTemplate = ({type, destination, dateFrom, dateTo, basePrice, offers}) => {
  const offersChecked = offers.filter((offer) => offer.isChecked);
  const offersList = getOffersListTemplate(offersChecked);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${formatCase(type)} ${isActivitys(type) ? `in` : `to`} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom.toString()}">${convertDateToTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo.toString()}">${convertDateToTime(dateTo)}</time>
          </p>
          <p class="event__duration">${calculateDiffDate(dateFrom, dateTo)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

class Event extends AbstractSmartComponent {
  constructor(point) {
    super();
    this._point = point;
    this._onRollupButtonClick = null;
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }

  recoveryListeners() {
    this.setOnRollupButtonClick(this._onRollupButtonClick);
  }

  setOnRollupButtonClick(onClick) {
    this._onRollupButtonClick = onClick;
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onClick);
  }
}

export default Event;
