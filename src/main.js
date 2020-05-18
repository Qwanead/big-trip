import {RenderPosition, render} from './utils/render';

import EventsComponent from './components/events';
import {FILTERS} from './mocks/filters';
import FilterComponent from './components/filter';
import {MENU_ITEMS} from './mocks/menu';
import MenuComponent from './components/menu';
import TripController from './controllers/trip';
import TripCostComponent from './components/trip-cost';
import TripInfoComponent from './components/trip-info';
import {getPointsMock} from './mocks/point';

const EVENT_COUNT = 4;

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const eventsContainerElement = document.querySelector(`.page-main .page-body__container`);
const points = getPointsMock(EVENT_COUNT).sort((a, b) => a.dateFrom - b.dateFrom);
const eventsComponent = new EventsComponent();

render(tripInfoElement, new TripInfoComponent(points), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new TripCostComponent(points), RenderPosition.BEFOREEND);
render(menuHeaderElement, new MenuComponent(MENU_ITEMS), RenderPosition.AFTER);
render(tripControlsElement, new FilterComponent(FILTERS), RenderPosition.BEFOREEND);
render(eventsContainerElement, eventsComponent, RenderPosition.BEFOREEND);

const tripComponent = new TripController(eventsComponent);

tripComponent.render(points);
