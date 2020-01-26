import {createTripInfoTemplate} from './components/trip-info';
import {createMenuTemplate} from './components/menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createTripEditTemplate} from './components/trip-edit';
import {createTripListTemplate} from './components/trip-list';
import {createTripEventTemplate} from './components/trip-event';
import {getPointMocks} from './mocks/point';
import {MENU_ITEMS} from './mocks/menu';
import {FILTERS} from './mocks/filters';
import {convertArrayToString} from './utils';


const EVENT_COUNT = 4;

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);
const points = getPointMocks(EVENT_COUNT).sort((a, b) => a.dateFrom - b.dateFrom);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

render(tripInfoElement, createTripInfoTemplate(points), `afterbegin`);
render(menuHeaderElement, createMenuTemplate(MENU_ITEMS), `afterend`);
render(tripControlsElement, createFilterTemplate(FILTERS));
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createTripEditTemplate(points[0]));
render(tripEventsElement, createTripListTemplate());

const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(eventsListElement, convertArrayToString(points.slice(1), createTripEventTemplate));
