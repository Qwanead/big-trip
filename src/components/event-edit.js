import {POINT_TYPES, POINT_ACTIVITYS, DESTINATIONS} from '../const';
import {formatCase, formatNumber, generateTemplates} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

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

const createEventEditTemplate = (point, option) => {
  const {destination, basePrice, offers, dateFrom, dateTo, description, pictures, isFavorite} = point;
  const {type} = option;

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
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <input id="event-favorite-1"
          class="event__favorite-checkbox
          visually-hidden"
          type="checkbox"
          name="event-favorite"
          ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
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

class EventEdit extends AbstractSmartComponent {
  constructor(point) {
    super();
    this._point = point;
    this._type = point.type;

    this._onFormSubmit = null;
    this._onFavoriteButtonClick = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._point, {type: this._type});
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setOnFormSubmit(this._onFormSubmit);
    this.setOnFavoriteButtonClick(this._onFavoriteButtonClick);
  }

  setOnFormSubmit(handler) {
    this._onFormSubmit = handler;
    this.getElement().addEventListener(`submit`, handler);
  }

  setOnFavoriteButtonClick(handler) {
    const favoriteButton = this.getElement().querySelector(`.event__favorite-btn`);
    this._onFavoriteButtonClick = handler;
    favoriteButton.addEventListener(`click`, handler);
  }

  reset() {
    this._type = this._point.type;

    this.rerender();
  }

  _subscribeOnEvents() {
    const typeWrapperElement = this.getElement().querySelector(`.event__type-wrapper`);

    typeWrapperElement.addEventListener(`change`, (evt) => {
      if (evt.target.value !== `on`) {
        this._type = evt.target.value;

        this.rerender();
      }
    });
  }
}

export default EventEdit;
