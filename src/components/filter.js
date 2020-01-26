import {formatCase, convertArrayToString} from '../utils';

const getFiltersList = (filters) => {

  const getFiltersListTemplate = (filter) => {
    return (`
      <div class="trip-filters__filter">
        <input id="filter-${filter.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.title}" ${filter.isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.title}">${formatCase(filter.title)}</label>
      </div>
    `);
  };

  return convertArrayToString(filters, getFiltersListTemplate);
};

const createFilterTemplate = (filters) => {
  const filterList = getFiltersList(filters);

  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterList}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export {createFilterTemplate};
