import {RenderPosition, render} from './utils/render';

import API from "./api.js";
import EventsComponent from './components/events';
import FilterController from './controllers/filters-controller';
import {MENU_ITEMS} from './mocks/menu';
import MenuComponent from './components/menu';
import NewEventButtonComponent from './components/new-event-button';
import PointsModel from './models/points-model';
import TripController from './controllers/trip-controller';
import TripCostComponent from './components/trip-cost';
import TripInfoComponent from './components/trip-info';

const AUTHORIZATION = `Basic eWnlckBwYfvbd29yZAo=`;

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const eventsContainerElement = document.querySelector(`.page-main .page-body__container`);

const api = new API(AUTHORIZATION);
const eventsComponent = new EventsComponent();
const newEventButtonComponent = new NewEventButtonComponent();
const pointsModel = new PointsModel();
const filterController = new FilterController(tripControlsElement, pointsModel);
let allOffers = [];
let destinations = [];

render(menuHeaderElement, new MenuComponent(MENU_ITEMS), RenderPosition.AFTER);
render(tripControlsElement, newEventButtonComponent, RenderPosition.AFTER);


api.getOffers()
  .then((response) => {
    allOffers = response;
  })
  .then(() => {
    api.getDestinations()
    .then((response) => {
      destinations = response;
    })
    .then(() => api.getTasks(allOffers, destinations))
    .then((points) => {
      eventsContainerElement.innerHTML = ``;
      render(eventsContainerElement, eventsComponent, RenderPosition.BEFOREEND);

      pointsModel.setPoints(points);

      const tripInfoComponent = new TripInfoComponent(pointsModel.getAllPoints());
      const tripCostComponent = new TripCostComponent(pointsModel.getAllPoints());
      const tripController = new TripController(eventsComponent, pointsModel, tripInfoComponent, tripCostComponent, newEventButtonComponent, filterController);

      filterController.render();
      render(tripInfoElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
      render(tripInfoElement, tripCostComponent, RenderPosition.BEFOREEND);
      tripController.render();
    });
  });
