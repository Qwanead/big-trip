import {formatCase, generateTemplates, createElement} from '../utils';

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

class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;

  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Filter;
