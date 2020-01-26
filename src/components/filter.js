import {formatCase, generateTemplates} from '../utils';

const getFilterTemplate = ({title, isChecked}) => {
  return (`
    <div class="trip-filters__filter">
      <input
        id="filter-${title}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${title}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-filters__filter-label" for="filter-${title}">${formatCase(title)}</label>
    </div>
  `);
};

const getFilterTemplates = generateTemplates(getFilterTemplate);

const createFilterTemplate = (filters) => {

  return (`
    <form class="trip-filters" action="#" method="get">
      ${getFilterTemplates(filters)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export {createFilterTemplate};
