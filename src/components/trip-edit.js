import {POINT_TYPES, POINT_ACTIVITYS, DESTINATIONS} from '../const';
import {formatCase, calculateTotalPrice} from '../utils';

const createTripEditTemplate = ({type, destination, basePrice, offers, dateFrom, dateTo, description, pictures}) => {

  const getEventTypeList = (types = []) => {
    const getEventTypeTemplate = (eventType) => {
      return (`
        <div class="event__type-item">
          <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
          <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${formatCase(eventType)}</label>
        </div>
      `);
    };

    return types.map((it) => getEventTypeTemplate(it)).join(`\n`);
  };

  const getOptionsList = (options) => {
    const getOptionTemplate = (optionValue) => `<option value="${optionValue}"></option>`;

    return options.map((it) => getOptionTemplate(it)).join(`\n`);
  };

  const convertDate = (date) => {
    const formatValue = (value) => {
      if (value < 10) {
        return `0` + value;
      } else {
        return value;
      }
    };

    const year = date.getFullYear().toString().slice(2);
    const month = formatValue(date.getMonth() + 1);
    const day = formatValue(date.getDate());
    const hour = formatValue(date.getHours());
    const minute = formatValue(date.getMinutes());


    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  const getOffersList = () => {

    const getOfferTemplate = (offer) => {
      return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.shortTitle}-1" type="checkbox" name="event-offer-${offer.shortTitle}" ${offer.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.shortTitle}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `);
    };

    return offers.map((it) => getOfferTemplate(it)).join(`\n`);
  };

  const getPicturesList = () => {
    const getPictureTemplate = (picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.destination}">`;

    return pictures.map((it) => getPictureTemplate(it)).join(`\n`);
  };

  return (`
    <form class="trip-events__item  event  event--edit" action="#" method="post">
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
            ${calculateTotalPrice(basePrice, offers)} &euro;
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
            ${getOffersList()}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${getPicturesList()}
            </div>
          </div>
        </section>
      </section>
    </form>
  `);
};

export {createTripEditTemplate};
