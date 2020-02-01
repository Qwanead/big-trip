import TripInfoComponent from './components/trip-info';
import TripCostComponent from './components/trip-cost';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import EventsComponent from './components/events';
import TripController from './controllers/trip';
import {getPointsMock} from './mocks/point';
import {MENU_ITEMS} from './mocks/menu';
import {FILTERS} from './mocks/filters';
import {render, RenderPosition} from './utils/render';

const EVENT_COUNT = 14;

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
