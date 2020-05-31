import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

import {POINT_ACTIVITYS, POINT_TYPES} from '../const';
import {formatCase, generateTemplates, isActivitys} from '../utils/common';

import AbstractSmartComponent from './abstract-smart-component';
import flatpickr from 'flatpickr';

const parseFormData = (formData, form, point, typePoint) => {
  const offersElements = Array.from(form.querySelectorAll(`.event__offer-selector`));

  const getOffers = (offers) =>
    offers.map((offersElement) =>
      ({
        title: offersElement.querySelector(`.event__offer-title`).textContent,
        price: +offersElement.querySelector(`.event__offer-price`).textContent,
        isChecked: offersElement.querySelector(`input`).checked,
        shortTitle: offersElement.querySelector(`input`).name,
      }));

  const type = typePoint;
  const destination = formData.get(`event-destination`);
  const destinationInfo = point.destinations.find((it) => it.name === destination);
  const pictures = destinationInfo.pictures;
  const description = destinationInfo.description;
  const dateFrom = new Date(formData.get(`event-start-time`));
  const dateTo = new Date(formData.get(`event-end-time`));
  const basePrice = +formData.get(`event-price`);
  const offers = getOffers(offersElements);

  return {type, destination, pictures, description, dateFrom, dateTo, basePrice, offers};
};

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

const getEventTypeList = generateTemplates(getEventTypeTemplate);
const getOptionsList = generateTemplates(getOptionTemplate);
const getOffersList = generateTemplates(getOfferTemplate);
const getPicturesList = generateTemplates(getPictureTemplate);

const createEventEditTemplate = (point, type, destination, offers, description, pictures) => {
  const {destinations, basePrice, dateFrom, dateTo, isFavorite} = point;
  // const {type} = option;
  const destinationsNames = destinations.map((it) => it.name);

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
            ${formatCase(type)} ${isActivitys(type) ? `in` : `to`}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getOptionsList(destinationsNames)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
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
    this._destination = point.destination;
    this._offers = point.offers;
    this._description = point.description;
    this._pictures = point.pictures;

    this._onFormSubmit = null;
    this._onFavoriteButtonClick = null;
    this._onDeleteClick = null;
    this._onCloseClick = null;
    this._flatpickrDateTo = null;
    this._flatpickrDateFrom = null;

    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventEditTemplate(this._point, this._type, this._destination, this._offers, this._description, this._pictures);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setOnFormSubmit(this._onFormSubmit);
    this.setOnFavoriteButtonClick(this._onFavoriteButtonClick);
    this.setOnDeleteButtonClick(this._onDeleteClick);
    this.setOnEditCloseButtonClick(this._onCloseClick);
  }

  rerender() {
    super.rerender();


    this._applyFlatpickr();
  }

  setOnFormSubmit(onSubmit) {
    this._onFormSubmit = onSubmit;
    this.getElement().addEventListener(`submit`, onSubmit);
  }

  setOnFavoriteButtonClick(onClick) {
    const favoriteButtonElement = this.getElement().querySelector(`.event__favorite-btn`);
    this._onFavoriteButtonClick = onClick;
    favoriteButtonElement.addEventListener(`click`, this._onFavoriteButtonClick);
  }

  setOnDeleteButtonClick(onClick) {
    this._onDeleteClick = onClick;
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._onDeleteClick);
  }

  setOnEditCloseButtonClick(onClick) {
    // if (this._mode === `adding`) {
    //   return;
    // }
    this._onCloseClick = onClick;
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onCloseClick);
  }

  reset() {
    this._type = this._point.type;
    this._offers = this._point.offers;

    this.rerender();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);
    return parseFormData(formData, form, this._point, this._type);
  }

  _applyFlatpickr() {
    const dateFromElement = this.getElement().querySelector(`#event-start-time-1`);
    const dateToElement = this.getElement().querySelector(`#event-end-time-1`);

    if (this._flatpickrDateTo !== null) {
      this._flatpickrDateTo.destroy();
      this._flatpickrDateTo = null;
    }

    if (this._flatpickrDateFrom !== null) {
      this._flatpickrDateFrom.destroy();
      this._flatpickrDateFrom = null;
    }

    this._flatpickrDateFrom = flatpickr(dateFromElement, {
      enableTime: true,
      altInput: true,
      allowInput: true,
      dateFormat: `M-d-Y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: this._point.dateFrom,
      onClose: () => {
        this._flatpickrDateTo.set(`minDate`, dateFromElement.value);
      }
    });

    this._flatpickrDateTo = flatpickr(dateToElement, {
      enableTime: true,
      altInput: true,
      allowInput: true,
      dateFormat: `M-d-Y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: this._point.dateTo,
      onClose: () => {
        this._flatpickrDateFrom.set(`maxDate`, dateToElement.value);
      }
    });
  }

  _subscribeOnEvents() {
    const typeWrapperElement = this.getElement().querySelector(`.event__type-wrapper`);

    typeWrapperElement.addEventListener(`change`, (evt) => {
      if (evt.target.value !== `on`) {
        this._type = evt.target.value;
        this._offers = this._point
          .allOffers
          .find((offer) => offer.type === this._type)
          .offers;

        this.rerender();
      }
    });

    const inputDestination = this.getElement().querySelector(`.event__input--destination`);
    const saveButton = this.getElement().querySelector(`.event__save-btn`);

    inputDestination.addEventListener(`change`, (evt) => {
      const destinations = this._point.destinations;
      saveButton.disabled = false;

      const isDestinationCorrect = destinations.some((destination) => {
        const isCorrect = destination.name === evt.target.value;

        if (isCorrect) {
          this._destination = destination.name;
          this._description = destination.description;
          this._pictures = destination.pictures;
        }

        return isCorrect;
      });

      if (isDestinationCorrect) {
        saveButton.disabled = false;
        this.rerender();
      } else {
        saveButton.disabled = true;
        inputDestination.value = ``;
      }
    });
  }
}

export default EventEdit;
