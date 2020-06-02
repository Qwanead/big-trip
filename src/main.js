import {RenderPosition, render} from './utils/render';

import API from "./api.js";
import EventsComponent from './components/events';
import FilterController from './controllers/filters-controller';
import MenuComponent from './components/menu';
import NewEventButtonComponent from './components/new-event-button';
import PointsModel from './models/points-model';
import StatisticsComponent from "./components/statistics";
import TripController from './controllers/trip-controller';
import TripCostComponent from './components/trip-cost';
import TripInfoComponent from './components/trip-info';

const AUTHORIZATION = `Basic eWnlckBwYfvbf59yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;
const SiteTabs = {
  TABLE: `Table`,
  STATS: `Stats`,
};

const tripInfoElement = document.querySelector(`.trip-info`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const eventsContainerElement = document.querySelector(`.page-main .page-body__container`);

const api = new API(END_POINT, AUTHORIZATION);
const menuComponent = new MenuComponent();
const eventsComponent = new EventsComponent();
const newEventButtonComponent = new NewEventButtonComponent();
const pointsModel = new PointsModel();
const filterController = new FilterController(tripControlsElement, pointsModel);
let allOffers = [];
let destinations = [];

render(menuHeaderElement, menuComponent, RenderPosition.AFTER);
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
    .then(() => api.getPoints(allOffers, destinations))
    .then((points) => {
      eventsContainerElement.innerHTML = ``;
      render(eventsContainerElement, eventsComponent, RenderPosition.BEFOREEND);

      pointsModel.setPoints(points);

      const tripInfoComponent = new TripInfoComponent(pointsModel.getAllPoints());
      const tripCostComponent = new TripCostComponent(pointsModel.getAllPoints());
      const tripController = new TripController(eventsComponent, pointsModel, tripInfoComponent, tripCostComponent, newEventButtonComponent, filterController, api);
      tripController.setAllOffers(allOffers);
      tripController.setDetinations(destinations);

      filterController.render();
      render(tripInfoElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
      render(tripInfoElement, tripCostComponent, RenderPosition.BEFOREEND);
      tripController.render();

      const statisticsComponent = new StatisticsComponent(pointsModel);
      render(eventsContainerElement, statisticsComponent, RenderPosition.BEFOREEND);
      statisticsComponent.hide();

      menuComponent.setOnTabButtonClick(() => {
        const currentTab = menuComponent.getCurrentTab();
        switch (currentTab) {
          case SiteTabs.TABLE:
            tripController.show();
            statisticsComponent.hide();
            break;
          case SiteTabs.STATS:
            tripController.hide();
            statisticsComponent.show();
            break;
        }
      });
    });
  });
