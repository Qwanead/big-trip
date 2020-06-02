import AbstractSmartComponent from './abstract-smart-component';
import {generateTemplates} from '../utils/common';
import moment from 'moment';

const getDayTemplate = ({day, dayNumber}) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${day}">${moment(day, `YYYY-MM-DD`).format(`MMM DD`).toUpperCase()}</time>
      </div>

      <ul class="trip-events__list" date-time="${day}"></ul>
    </li>`
  );
};

const getDaysDiff = (day, previousDay) =>
  moment(day, `YYYY-MM-DD`).diff(moment(previousDay, `YYYY-MM-DD`), `day`);

const getDaysListTemplate = (points) => {
  const DaySet = new Set();

  points.forEach((point) =>
    DaySet.add(moment(point.dateFrom).format(`YYYY-MM-DD`))
  );

  const days = Array.from(DaySet).sort((a, b) => getDaysDiff(a, b));

  const daysWithNumbers = [];

  days.forEach((day, index, arr) => {
    if (index === 0) {
      daysWithNumbers.push({day, dayNumber: 1});
    } else {
      const previousDayNumber = daysWithNumbers[index - 1].dayNumber;
      daysWithNumbers
        .push({
          day,
          dayNumber: getDaysDiff(day, arr[index - 1]) + previousDayNumber
        });
    }
  });

  const getDaysTemplates = generateTemplates(getDayTemplate);
  return getDaysTemplates(daysWithNumbers);
};

const createEventListTemplate = (points) => {
  let daysListTemplate = (
    `<li class="trip-days__item  day">
      <div class="day__info"></div>
      <ul class="trip-events__list"></ul>
    </li>`
  );

  if (points.length !== 0) {
    daysListTemplate = getDaysListTemplate(points);
  }

  return (
    `<ul class="trip-days">
      ${daysListTemplate}
    </ul>`
  );
};

class EventList extends AbstractSmartComponent {
  constructor(points) {
    super();
    this._points = points;
    this._pointsTemp = points;
  }

  getTemplate() {
    return createEventListTemplate(this._points);
  }

  recoveryListeners() {
  }

  rerenderDefault() {
    this._points = this._pointsTemp;

    this.rerender();
  }

  rerenderEmpty() {
    this._points = [];

    this.rerender();
  }

  getPlaceForNewPoint() {

  }
}

export default EventList;
