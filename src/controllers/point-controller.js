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

  render(point) {
    if (this._containerElement) {
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
    this._eventEditComponent = new EventEdit(point);

    const onRollupButtonClick = () => {
      this._replaceEventToEdit();

      document.addEventListener(`keydown`, this._onDocumentKeyDown);
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      const newData = this._eventEditComponent.getData();
      this._onDataChange(this, point, Object.assign({}, point, newData));
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
      render(this._containerElement, this._eventComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    }
  }

  _onDocumentKeyDown(evt) {
    if (isEscKey(evt)) {
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
