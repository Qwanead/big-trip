import {RenderPosition, render, replace} from '../utils/render';

import {FilterType} from '../const';
import FiltersComponent from "../components/filter";

class FilerController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = null;
    this._filtersComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._activeFilterType = this._pointsModel.getActiveFilterType();
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        title: filterType,
        isChecked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filtersComponent;

    this._filtersComponent = new FiltersComponent(filters);

    this._filtersComponent.setOnFilterTypeChange(this._onFilterChange);

    if (oldComponent) {
      replace(this._filtersComponent, oldComponent);
    } else {
      render(container, this._filtersComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefault() {
    this._container.querySelector(`#filter-everything`).checked = true;
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

export default FilerController;
