import SortComponent from '../components/sort';
import EventListComponent from '../components/event-list';
import NoPointsComponent from '../components/no-points';
import EventEdit from '../components/event-edit';
import EventComponent from '../components/event';
import {render, replace, RenderPosition} from '../utils/render.js';

const renderEvent = (eventListElement, point) => {
  const eventComponent = new EventComponent(point);
  const eventEditComponent = new EventEdit(point);

  const onDocumentKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, onDocumentKeyDown);
    }
  };

  const onRollupButtonClick = () => {
    replace(eventEditComponent, eventComponent);

    document.addEventListener(`keydown`, onDocumentKeyDown);
  };

  const onEventFormSubmit = (evt) => {
    evt.preventDefault();
    replace(eventComponent, eventEditComponent);
  };

  eventComponent.setRollupButtonClickHandler(onRollupButtonClick);
  eventEditComponent.setFormSubmitHandler(onEventFormSubmit);

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (eventsListElement, points) => {
  points.forEach((point) =>
    renderEvent(eventsListElement, point)
  );
};

class Trip {
  constructor(container) {
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._eventListComponent = new EventListComponent();
  }

  render(points) {
    const container = this._container.getElement();

    if (points.length === 0) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._sortComponent, RenderPosition.BEFOREEND);
      render(container, this._eventListComponent, RenderPosition.BEFOREEND);

      const eventsListElement = container.querySelector(`.trip-events__list`);

      renderEvents(eventsListElement, points);
    }
  }
}

export default Trip;
