import {RenderPosition, render} from './utils';

import EventComponent from './components/event';
import EventEdit from './components/event-edit';
import EventListComponent from './components/event-list';
import {FILTERS} from './mocks/filters';
import FilterComponent from './components/filter';
import {MENU_ITEMS} from './mocks/menu';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import TripInfoComponent from './components/trip-info';
import {getPointMocks} from './mocks/point';

const EVENT_COUNT = 4;

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);
const points = getPointMocks(EVENT_COUNT).sort((a, b) => a.dateFrom - b.dateFrom);

const renderEvent = (eventList, point) => {
  const eventComponent = new EventComponent(point);
  const eventEditComponent = new EventEdit(point);
  const rollupButtonElement = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const eventElement = eventComponent.getElement();
  const eventFormElement = eventEditComponent.getElement();

  const onRollupButtonClick = () => {
    eventList.replaceChild(eventFormElement, eventElement);
  };

  const onEventFormSubmit = (evt) => {
    evt.preventDefault();
    eventList.replaceChild(eventElement, eventFormElement);
  };

  rollupButtonElement.addEventListener(`click`, onRollupButtonClick);
  eventFormElement.addEventListener(`submit`, onEventFormSubmit);

  render(eventList, eventElement, RenderPosition.BEFOREEND);
};

render(tripInfoElement, new TripInfoComponent(points).getElement(), RenderPosition.AFTERBEGIN);
render(menuHeaderElement, new MenuComponent(MENU_ITEMS).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FilterComponent(FILTERS).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new EventListComponent().getElement(), RenderPosition.BEFOREEND);

const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

points.forEach((point) =>
  renderEvent(eventsListElement, point)
);
