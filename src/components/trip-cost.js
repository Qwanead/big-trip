import AbstractComponent from './abstract-component';

const calculateEventPrice = (basePrice, offers) => {
  const offersChecked = offers.filter((offer) => offer.isChecked);
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

class TripCost extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}

export default TripCost;
