import {POINT_TYPES, POINT_ACTIVITYS, DESTINATIONS} from '../const';
import {formatCase, formatNumber, generateTemplates, createElement} from '../utils';

const getEventTypeTemplate = (eventType) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${formatCase(eventType)}</label>
    </div>`
  );
};

const getOptionTemplate = (optionValue) => `<option value="${optionValue}"></option>`;

const getOfferTemplate = ({shortTitle, title, isChecked, price}) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-${shortTitle}-1"
        type="checkbox"
        name="event-offer-${shortTitle}"
        ${isChecked ? `checked` : ``}
      >
      <label class="event__offer-label" for="event-offer-${shortTitle}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const getPictureTemplate = ({src, description}) =>
  `<img class="event__photo" src="${src}" alt="${description}">`;

const convertDate = (date) => {
  const year = date.getFullYear().toString().slice(2);
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const hour = formatNumber(date.getHours());
  const minute = formatNumber(date.getMinutes());


  return `${day}/${month}/${year} ${hour}:${minute}`;
};

const getEventTypeList = generateTemplates(getEventTypeTemplate);
const getOptionsList = generateTemplates(getOptionTemplate);
const getOffersList = generateTemplates(getOfferTemplate);
const getPicturesList = generateTemplates(getPictureTemplate);


const createEventEditTemplate = ({type, destination, basePrice, offers, dateFrom, dateTo, description, pictures}) => {
  const offersList = getOffersList(offers);
  const picturesList = getPicturesList(pictures);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${getEventTypeList(POINT_TYPES)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>


              ${getEventTypeList(POINT_ACTIVITYS)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${formatCase(type)} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getOptionsList(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDate(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDate(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            ${basePrice} &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${picturesList}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

class EventEdit {
  constructor(point) {
    this._element = null;
    this.point = point;

  }

  getTemplate() {
    return createEventEditTemplate(this.point);
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

export default EventEdit;
