import {createElement} from '../utils';

const calculateEventPrice = (basePrice, offers) => {
  const offersChecked = offers.filter((it) => it.isChecked);
  const offersPrice = offersChecked.reduce((result, offer) => offer.price + result, 0);

  return offersPrice + basePrice;
};

const calculateTripCost = (points) =>
  points.reduce((result, point) =>
    result + calculateEventPrice(point.basePrice, point.offers), 0);

const createTripCostTemplate = (points) => {
  const tripCost = calculateTripCost(points);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
    </p>`
  );
};

class TripCost {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripCost;
