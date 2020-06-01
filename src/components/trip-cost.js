import AbstractComponent from './abstract-component';
import {calculateTotalCost} from '../utils/common';

const createTripCostTemplate = (points) => {
  const tripCost = calculateTotalCost(points);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
    </p>`
  );
};

class TripCost extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }

  setPoints(points) {
    this._points = points;
  }

  rerender() {
    const oldElement = this.getElement();

    this.removeElement();

    const newElement = this.getElement();

    oldElement.replaceWith(newElement);
  }
}

export default TripCost;
