import {createElement, formatCase, formatNumber, generateTemplates} from '../utils';

import {POINT_ACTIVITYS} from '../const';

const MS_IN_MINUTE = 1000 * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;
const OFFERS_COUNT = 3;

const convertDateToTime = (date) => {
  let hour = formatNumber(date.getHours());
  let minute = formatNumber(date.getMinutes());

  return `${hour}:${minute}`;
};

const calculateDiffDate = (beginDate, endDate) => {

  const convertMs = (ms, target = `minute`) => {
    let unit;
    let unitInMs;
    let result = {};

    switch (target) {
      case `minute`:
        unit = `M`;
        unitInMs = MS_IN_MINUTE;
        break;
      case `hour`:
        unit = `H`;
        unitInMs = MS_IN_HOUR;
        break;
      case `day`:
        unit = `D`;
        unitInMs = MS_IN_DAY;
        break;
    }

    result.value = Math.floor(ms / unitInMs);

    if (result.value < 10) {
      result.string = `0` + result.value + unit;
    } else {
      result.string = result.value + unit;
    }

    return result;
  };

  const diffDateInMs = endDate - beginDate;

  if (diffDateInMs < MS_IN_HOUR) {
    return convertMs(diffDateInMs).string;
  }

  if (diffDateInMs < MS_IN_DAY) {
    const hour = convertMs(diffDateInMs, `hour`);
    const minute = convertMs(diffDateInMs - hour.value * MS_IN_HOUR);

    return `${hour.string} ${minute.string}`;
  }

  const day = convertMs(diffDateInMs, `day`);
  const hour = convertMs(diffDateInMs - day.value * MS_IN_DAY, `hour`);
  const minute = convertMs(diffDateInMs - day.value * MS_IN_DAY - hour.value * MS_IN_HOUR);

  return `${day.string} ${hour.string} ${minute.string}`;
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
    offersCheckedShort = offersChecked.slice(OFFERS_COUNT - 1);
  } else {
    offersCheckedShort = offersChecked;
  }

  const getOffersTemplates = generateTemplates(getOfferTemplate);

  return getOffersTemplates(offersCheckedShort);
};

const isActivitys = (eventType) => POINT_ACTIVITYS.some((it) => it === eventType);

const createEventTemplate = ({type, destination, dateFrom, dateTo, basePrice, offers}) => {
  const offersChecked = offers.filter((it) => it.isChecked);
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

class Event {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createEventTemplate(this._point);
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

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default Event;
