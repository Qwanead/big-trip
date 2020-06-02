import {formatCase, generateTemplates} from '../utils/common';

import AbstractComponent from './abstract-component';

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};


const getFilterTemplate = ({title, isChecked}) => {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${title}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${title}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-filters__filter-label" for="filter-${title}">${formatCase(title)}</label>
    </div>`
  );
};

const getFilterTemplates = generateTemplates(getFilterTemplate);

const createFilterTemplate = (filters) => {

  return (
    `<form class="trip-filters" action="#" method="get">
      ${getFilterTemplates(filters)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setOnFilterTypeChange(onChange) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      onChange(filterName);
    });
  }
}

export default Filter;
