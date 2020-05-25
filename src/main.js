import {RenderPosition, render} from './utils/render';

import API from "./api.js";
import EventsComponent from './components/events';
import {FILTERS} from './mocks/filters';
import FilterComponent from './components/filter';
import {MENU_ITEMS} from './mocks/menu';
import MenuComponent from './components/menu';
import PointsModel from './models/points';
import TripController from './controllers/trip';
import TripCostComponent from './components/trip-cost';
import TripInfoComponent from './components/trip-info';

const AUTHORIZATION = `Basic eWnlckBwYfvbd29yZAo=`;

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const eventsContainerElement = document.querySelector(`.page-main .page-body__container`);

const eventsComponent = new EventsComponent();
const pointsModel = new PointsModel();
const tripComponent = new TripController(eventsComponent, pointsModel);
const api = new API(AUTHORIZATION);

render(menuHeaderElement, new MenuComponent(MENU_ITEMS), RenderPosition.AFTER);
render(tripControlsElement, new FilterComponent(FILTERS), RenderPosition.BEFOREEND);
render(eventsContainerElement, eventsComponent, RenderPosition.BEFOREEND);

api.getOffers()
  .then((allOffers) => api.getTasks(allOffers))
  .then((points) => {
    pointsModel.setPoints(points);
    render(tripInfoElement, new TripInfoComponent(points), RenderPosition.AFTERBEGIN);
    render(tripInfoElement, new TripCostComponent(points), RenderPosition.BEFOREEND);
    tripComponent.render();
  });
