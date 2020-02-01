import SortComponent from '../components/sort';
import EventListComponent from '../components/event-list';
import NoPointsComponent from '../components/no-points';
import PointController from './point';
import {render, RenderPosition} from '../utils/render';
import {SortType} from '../const';

const renderEvents = (eventsListElement, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(eventsListElement, onDataChange, onViewChange);
    pointController.render(point);

    return pointController;
  });
};

class TripController {
  constructor(container) {
    this._renderedEvents = [];
    this._points = [];
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._eventListComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortingFormChange = this._onSortingFormChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);


    this._sortComponent.setOnSortTypeChange(this._onSortingFormChange);
  }

  render(points) {
    this._points = points;
    const containerElement = this._container.getElement();
    this._eventListComponent = new EventListComponent(this._points);


    if (points.length === 0) {
      render(containerElement, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(containerElement, this._eventListComponent, RenderPosition.BEFOREEND);

    const eventsListElement = containerElement.querySelector(`.trip-days`);

    this._renderedEvents = renderEvents(eventsListElement, this._points, this._onDataChange, this._onViewChange);
  }

  _onSortingFormChange(sortType) {
    let sortedPoints = [];

    switch (sortType) {
      case SortType.PRICE:
        sortedPoints = this._points.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.TIME:
        sortedPoints = this._points.slice().sort((a, b) => a.duration - b.duration);
        break;
      case SortType.DEFAULT:
        sortedPoints = this._points;
        break;
    }

    // eventsListElement.innerHTML = ``;
    // this._eventListComponent.removeElement();

    if (sortType === SortType.DEFAULT) {
      this._eventListComponent.rerenderDefault();
    } else {
      this._eventListComponent.rerenderEmpty();
    }

    const eventsListElement = this._container.getElement().querySelector(`.trip-days`);

    this._renderedEvents = renderEvents(eventsListElement, sortedPoints, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._renderedEvents.forEach((it) => it.setDefaultView());
  }
}

export default TripController;
