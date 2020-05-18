import {createTripInfoTemplate} from './components/trip-info';
import {createMenuTemplate} from './components/menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createTripEditTemplate} from './components/trip-edit';
import {createTripListTemplate} from './components/trip-list';
import {createTripEventTemplate} from './components/trip-event';

const EVENT_COUNT = 3;

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(menuHeaderElement, createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createTripEditTemplate());
render(tripEventsElement, createTripListTemplate());

const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(eventsListElement, new Array(EVENT_COUNT)
  .fill(createTripEventTemplate()).join(`\n`));
