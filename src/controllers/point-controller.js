import {RenderPosition, remove, render, replace} from '../utils/render';

import EventComponent from '../components/event';
import EventEdit from '../components/event-edit';
import Point from '../models/point-model';
import moment from 'moment';

const KeyboardKey = {
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`,
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const POINT_INIT_PARAMS = {
  type: `taxi`,
  offers: [
    {
      title: `Upgrade to a business class`,
      price: 110,
      shortTitle: `upgrade-to-a-business-class`,
    },
    {
      title: `Choose the radio station`,
      price: 150,
      shortTitle: `choose-the-radio-station`,
    },
    {
      title: `Choose temperature`,
      price: 160,
      shortTitle: `choose-temperature`,
    },
    {
      title: `Drive quickly, I'm in a hurry`,
      price: 30,
      shortTitle: `drive-quickly-I'm-in-a-hurry`,
    },
    {
      title: `Drive slowly`,
      price: 90,
      shortTitle: `drive-slowly`,
    }
  ]
};

const SHAKE_ANIMATION_TIMEOUT = 500;


const parseFormData = (formData, form, point, typePoint) => {
  const offersElements = Array.from(form.querySelectorAll(`.event__offer-selector`));
  const getOffers = (offers) =>
    offers.filter((offer) => offer.querySelector(`input`).checked)
    .map((offer) =>
      ({
        title: offer.querySelector(`.event__offer-title`).textContent,
        price: +offer.querySelector(`.event__offer-price`).textContent,
      }));

  const type = typePoint;
  const destination = formData.get(`event-destination`);
  const destinationInfo = point.destinations.find((destinationItem) => destinationItem.name === destination);
  let pictures = [];
  let description = ``;
  const dateFrom = new Date(formData.get(`event-start-time`));

  const dateTo = new Date(formData.get(`event-end-time`));
  const basePrice = +formData.get(`event-price`);
  const offers = getOffers(offersElements);

  if (destinationInfo) {
    pictures = destinationInfo.pictures;
    description = destinationInfo.description;
  }

  return new Point({
    "type": type,
    "destination": {
      "description": description,
      "name": destination,
      "pictures": pictures,
    },
    "date_from": dateFrom,
    "date_to": dateTo,
    "base_price": basePrice,
    "offers": offers,
  });
};

const EmptyPoint = {
  id: String(Math.floor(Math.random() * 10000)),
  type: POINT_INIT_PARAMS.type,
  destination: ``,
  pictures: [],
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: ``,
  offersChecked: [],
  allOffers: [],
  description: ``,
  offers: POINT_INIT_PARAMS.offers,
  isFavorite: false,
};

const isEscKey = ({key}) =>
  key === KeyboardKey.ESCAPE || key === KeyboardKey.ESCAPE_IE;

const formatString = (str) => str.replace(/ /g, `-`).toLowerCase();

const convertOffers = (type, offersChecked, allOffers) => {
  if (allOffers.length === 0) {
    return offersChecked;
  }

  const resultOffers = allOffers.filter((offer) => offer.type === type)[0].offers.slice();

  for (let offer of resultOffers) {
    offer = Object.assign({}, offer);
  }

  resultOffers.forEach((resultOffer) => {
    resultOffer.shortTitle = formatString(resultOffer.title);
    resultOffer.isChecked = false;

    offersChecked.some((offerChecked) => {
      if (offerChecked.title === resultOffer.title) {
        resultOffer.price = offerChecked.price;
        resultOffer.isChecked = true;

        return true;
      }

      return false;
    });
  });

  return resultOffers;
};

const addShortTitle = (allOffers) => {
  allOffers.forEach((allOffer) => {
    allOffer.offers.forEach((offer) => {
      offer.shortTitle = formatString(offer.title);
    });
  });
};

class PointController {
  constructor(containerElement, onDataChange, onViewChange, destinations, allOffers) {
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._destinations = destinations;
    this._allOffers = allOffers;
  }

  render(point, mode = Mode.DEFAULT) {
    this._mode = mode;

    if (!point.destinations) {
      point.destinations = this._destinations;
      point.allOffers = this._allOffers;
      point.offers = convertOffers(point.type, point.offersChecked, point.allOffers);
      addShortTitle(point.allOffers);
    }

    if (this._containerElement && mode === Mode.DEFAULT) {
      const dayContainerElement = this._containerElement.querySelector(`.trip-events__list[date-time="${moment(point.dateFrom).format(`YYYY-MM-DD`)}"]`);
      if (dayContainerElement) {
        this._containerElement = dayContainerElement;
      } else {
        this._containerElement = this._containerElement.querySelector(`.trip-events__list`);
      }
    }

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(point);
    this._eventEditComponent = new EventEdit(point, mode);

    const onRollupButtonClick = () => {
      this._replaceEventToEdit();

      document.addEventListener(`keydown`, this._onDocumentKeyDown);
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      const receivedData = this._eventEditComponent.getData();
      const formData = receivedData.formData;
      const data = parseFormData(formData, this._eventEditComponent.getElement(), receivedData.point, receivedData.type);
      data.id = receivedData.id;
      data.isFavorite = receivedData.isFavorite;
      this._eventEditComponent.showNotificationAboutSaving();

      if (this._eventEditComponent.checkForErrors()) {
        this._eventEditComponent.removeErrorStyle();
      }

      const onError = () => {
        this._eventEditComponent.removeNotificationAboutSaving();
        this._eventEditComponent.addErrorStyle();
      };

      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, null, data, Mode.ADDING, onError);
      } else {
        this._onDataChange(this, point, data, Mode.DEFAULT, onError);
      }

      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    };

    this._eventEditComponent.setOnDeleteButtonClick(() => {
      this._eventEditComponent.showNotificationAboutDeleting();

      const onError = () => {
        this._editFormComponent.removeNotificationAboutDeleting();
        this._editFormComponent.addErrorStyle();
      };

      if (mode === Mode.ADDING) {
        this._onDataChange(this, null, null, Mode.DEFAULT, onError);
      } else {
        this._onDataChange(this, point, null, Mode.DEFAULT, onError);
      }

      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    });

    this._eventEditComponent.setOnEditCloseButtonClick(() => {
      this._eventEditComponent.resetDestination();
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    });

    this._eventComponent.setOnRollupButtonClick(onRollupButtonClick);
    this._eventEditComponent.setOnFormSubmit(onFormSubmit);

    this._eventEditComponent.setOnFavoriteButtonClick(() => {
      if (this._eventEditComponent.checkForErrors()) {
        this._eventEditComponent.removeErrorStyle();
      }

      const newPoint = Point.clone(point);
      newPoint.isFavorite = !newPoint.isFavorite;

      const onError = () => {
        this._eventEditComponent.toggleFavoriteState();
        this._eventEditComponent.addErrorStyle();
      };

      this._onDataChange(this, point, newPoint, Mode.EDIT, onError);
    });

    if ((oldEventComponent === null) || (oldEventEditComponent === null)) {
      if (mode === Mode.ADDING) {
        render(this._containerElement, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        this._hideEventDetails();
        document.addEventListener(`keydown`, this._onDocumentKeyDown);
      } else {
        render(this._containerElement, this._eventComponent, RenderPosition.BEFOREEND);
      }
    } else {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    }
  }

  _hideEventDetails() {
    this._containerElement.querySelector(`.event__details`).classList.add(`visually-hidden`);
  }

  _onDocumentKeyDown(evt) {
    if (isEscKey(evt)) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, null, null);
      }

      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
    this._eventComponent.rerender();
    this._mode = Mode.DEFAULT;
  }

  destroy() {
    this._eventEditComponent.removeFlatpickr();
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onDocumentKeyDown);
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  blockInterface() {
    this._eventComponent.disableEditButton();
    this._eventEditComponent.blockForm();
  }

  unblockInterface() {
    this._eventComponent.enableEditButton();
    this._eventEditComponent.unblockForm();
  }
}

export default PointController;
export {Mode, EmptyPoint};
