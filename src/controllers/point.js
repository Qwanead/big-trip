import moment from 'moment';
import EventEdit from '../components/event-edit';
import EventComponent from '../components/event';
import {render, replace, RenderPosition} from '../utils/render';

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
  }

  render(point) {
    const dayContainerElement = this._containerElement.querySelector(`.trip-events__list[date-time="${moment(point.dateFrom).format(`YYYY-MM-DD`)}"]`);
    if (dayContainerElement) {
      this._containerElement = dayContainerElement;
    } else {
      this._containerElement = this._containerElement.querySelector(`.trip-events__list`);
    }

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(point);
    this._eventEditComponent = new EventEdit(point);

    const onDocumentKeyDown = (evt) => {
      if (isEscKey(evt)) {
        this._replaceEditToEvent();
        document.removeEventListener(`keydown`, onDocumentKeyDown);
      }
    };

    const onRollupButtonClick = () => {
      this._replaceEventToEdit();

      document.addEventListener(`keydown`, onDocumentKeyDown);
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    };

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
}

export default PointController;
