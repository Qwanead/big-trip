import {FilterType} from "../const";

const getFuturePoints = (points, currentDate) => {
  return points.filter((point) => (point.dateFrom > currentDate));
};

const getPastPoints = (points, currentDate) => {
  return points.filter((point) => (point.dateFrom < currentDate));
};

const getPointsByFilter = (points, filterType) => {
  const currentDate = new Date();
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFuturePoints(points, currentDate);
    case FilterType.PAST:
      return getPastPoints(points, currentDate);
  }

  return points;
};

class Points {
  constructor() {
    this._points = [];

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._activeFilter = FilterType.EVERYTHING;
    this._additionalInfo = {};
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilter);
  }

  getAllPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);

    if (this._points.length) {
      this._additionalInfo = {
        destinations: points[0].destinations,
        allOffers: points[0].allOffers,
      };
      this._callHandlers(this._dataChangeHandlers);
    }
  }

  getAdditionalInfo() {
    return this._additionalInfo;
  }

  setFilter(filterType) {
    this._activeFilter = filterType;

    this._callHandlers(this._filterChangeHandlers);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((pointItem) => pointItem.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((point) => point.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setOnDataChange(onChange) {
    this._dataChangeHandlers.push(onChange);
  }

  setOnFilterChange(onChange) {
    this._filterChangeHandlers.push(onChange);
  }

  getActiveFilterType() {
    return this._activeFilter;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Points;
