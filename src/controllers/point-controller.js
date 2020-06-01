import {RenderPosition, remove, render, replace} from '../utils/render';

import EventComponent from '../components/event';
import EventEdit from '../components/event-edit';
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

const EmptyPoint = {
  id: String(new Date() + Math.random()),
  type: POINT_INIT_PARAMS.type,
  destination: ``,
  pictures: [],
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: ``,
  allOffers: [],
  description: ``,
  offers: POINT_INIT_PARAMS.offers,
  isFavorite: false,
  destinations: [],
};

const isEscKey = ({key}) =>
  key === KeyboardKey.ESCAPE || key === KeyboardKey.ESCAPE_IE;

class PointController {
  constructor(containerElement, onDataChange, onViewChange) {
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  }

  render(point, mode = Mode.DEFAULT) {
    this._mode = mode;

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
      const newData = this._eventEditComponent.getData();

      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, null, Object.assign({}, point, newData));
      } else {
        this._onDataChange(this, point, Object.assign({}, point, newData));
      }

      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
      this._eventEditComponent.getData();
      this._replaceEditToEvent();
    };

    this._eventEditComponent.setOnDeleteButtonClick(() => {
      this._onDataChange(this, point, null);

      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    });

    this._eventEditComponent.setOnEditCloseButtonClick(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    });

    this._eventComponent.setOnRollupButtonClick(onRollupButtonClick);
    this._eventEditComponent.setOnFormSubmit(onFormSubmit);
    this._eventEditComponent.setOnFavoriteButtonClick(() =>
      this._onDataChange(this, point, Object.assign({}, point, {isFavorite: !point.isFavorite}))
    );

    if ((oldEventComponent === null) || (oldEventEditComponent === null)) {
      if (mode === Mode.ADDING) {
        render(this._containerElement, this._eventEditComponent, RenderPosition.AFTERBEGIN);

        document.addEventListener(`keydown`, this._onDocumentKeyDown);
      } else {
        render(this._containerElement, this._eventComponent, RenderPosition.BEFOREEND);
      }


    } else {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    }
  }

  _onDocumentKeyDown(evt) {
    if (isEscKey(evt)) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
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
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export default PointController;
export {Mode, EmptyPoint};
