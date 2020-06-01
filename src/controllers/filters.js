import {FilterType} from '../const.js';

class FilerController {
  constructor(container, pointsModel) {
    this._conainer = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {

  }
}

export default FilerController;
