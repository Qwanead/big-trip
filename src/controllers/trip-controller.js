import {FilterType, SortType} from '../const';
import PointController, {EmptyPoint, Mode as PointControllerMode} from './point-controller';
import {RenderPosition, remove, render} from '../utils/render';

import EventListComponent from '../components/event-list';
import NoPointsComponent from '../components/no-points';
import SortComponent from '../components/sort';

const renderEvents = (eventsListElement, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(eventsListElement, onDataChange, onViewChange);
    pointController.render(point);

    return pointController;
  });
};

class TripController {
  constructor(container, pointsModel, tripInfoComponent, tripCostComponent, newEventButtonComponent, filterController) {
    this._renderedEvents = [];
    this._container = container;
    this._pointsModel = pointsModel;
    this._creatingPoint = null;

    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._eventListComponent = null;
    this._tripInfoComponent = tripInfoComponent;
    this._tripCostComponent = tripCostComponent;
    this._newEventButtonComponent = newEventButtonComponent;
    this._filterController = filterController;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortingFormChange = this._onSortingFormChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onTravelCostChange = this._onTravelCostChange.bind(this);
    this._onTravelInfoChange = this._onTravelInfoChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setOnSortTypeChange(this._onSortingFormChange);

    this._pointsModel.setDataChangeHandler(this._onTravelInfoChange);
    this._pointsModel.setDataChangeHandler(this._onTravelCostChange);

    this._setOnNewEventButtonClick(() => {
      this._filterController.setDefault();
      this._pointsModel.setFilter(FilterType.EVERYTHING);
      this._onViewChange();
      this._createPoint();
      this._newEventButtonComponent.setDisabled();
    });
  }

  render() {
    const points = this._pointsModel.getPoints();
    const containerElement = this._container.getElement();
    this._eventListComponent = new EventListComponent(points);
    containerElement.innerHTML = ``;


    if (points.length === 0) {
      render(containerElement, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(containerElement, this._eventListComponent, RenderPosition.BEFOREEND);

    const eventsListElement = containerElement.querySelector(`.trip-days`);

    this._renderedEvents = renderEvents(eventsListElement, points, this._onDataChange, this._onViewChange);
  }

  _createPoint() {
    if (this._creatingPoint) {
      return;
    }

    if (this._pointsModel.getAllPoints().length === 0) {
      const containerElement = this._container.getElement();
      this._eventListComponent = new EventListComponent([]);
      render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
      render(containerElement, this._eventListComponent, RenderPosition.BEFOREEND);
      remove(this._noPointsComponent);
      this._creatingPoint = new PointController(this._eventListComponent.getElement(), this._onDataChange, this._onViewChange);
      this._creatingPoint.render(Object.assign({}, EmptyPoint, this._pointsModel.getAdditionalInfo()), PointControllerMode.ADDING);
    } else {
      this._creatingPoint = new PointController(this._eventListComponent.getElement(), this._onDataChange, this._onViewChange);
      this._creatingPoint.render(Object.assign({}, EmptyPoint, this._pointsModel.getAdditionalInfo()), PointControllerMode.ADDING);
    }
  }


  _setOnNewEventButtonClick(onClick) {
    this._newEventButtonComponent.setOnNewEventButtonClick(onClick);
  }

  _onSortingFormChange(sortType) {
    this._newEventButtonComponent.setEnabled();

    let sortedPoints = [];
    const points = this._pointsModel.getPoints();


    switch (sortType) {
      case SortType.PRICE:
        sortedPoints = points.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.TIME:
        sortedPoints = points.slice().sort((a, b) => a.duration - b.duration);
        break;
      case SortType.DEFAULT:
        sortedPoints = points;
        break;
    }

    if (sortType === SortType.DEFAULT) {
      this._eventListComponent.rerenderDefault();
    } else {
      this._eventListComponent.rerenderEmpty();
    }

    const eventsListElement = this._container.getElement().querySelector(`.trip-days`);

    this._renderedEvents = renderEvents(eventsListElement, sortedPoints, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    this._newEventButtonComponent.setEnabled();

    // новая точка
    if (oldData === null) {
      this._newEventButtonComponent.setEnabled();
      this._creatingPoint = null;
      // удаление новой
      if (newData === null) {
        pointController.destroy();
        this._newEventButtonComponent.setEnabled();
      // создание новой
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._renderedEvents = [].concat(pointController, this._renderedEvents);
      }
      this._updatePoints();
    // удаление старой
    } else {
      if (newData === null) {
        this._pointsModel.removePoint(oldData.id);
        this._updatePoints();
      // редактирование старой
      } else {
        const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
        if (isSuccess) {
          pointController.render(newData);
        }
      }
    }
  }

  _onFilterChange() {
    this._newEventButtonComponent.setEnabled();
    this._updatePoints();
    this._newEventButtonComponent.setEnabled();
  }

  _onTravelCostChange() {
    this._tripInfoComponent.setPoints(this._pointsModel.getAllPoints());
    this._tripInfoComponent.rerender();
  }

  _onTravelInfoChange() {
    this._tripCostComponent.setPoints(this._pointsModel.getAllPoints());
    this._tripCostComponent.rerender();
  }

  _removePoints() {
    this._renderedEvents.forEach((pointController) => pointController.destroy());
    this._renderedEvents = [];
  }

  _updatePoints() {
    this._removePoints();
    this._container.innerHTML = ``;
    remove(this._eventListComponent);
    this._sortComponent.rerender();
    this.render();
  }

  _onViewChange() {
    if (this._creatingPoint) {
      this._creatingPoint.destroy();
      this._creatingPoint = null;
      this._newEventButtonComponent.setEnabled();
    }
    this._renderedEvents.forEach((it) => it.setDefaultView());
    this._newEventButtonComponent.setEnabled();
  }
}

export default TripController;
