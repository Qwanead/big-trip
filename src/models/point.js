import Offers from './offers';

class Point {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.destination = data.destination.name;
    this.pictures = data.destination.pictures;
    this.description = data.destination.description;
    this.dateFrom = new Date(data.date_from);
    this.dateTo = new Date(data.date_to);
    this.basePrice = data.base_price;
    this.offers = data.offers;
    this.isFavorite = Boolean(data.is_favorite);
    this.duration = this.dateFrom - this.dateTo;
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(PointsData) {
    return PointsData.map(Point.parsePoint);
  }

  setOffers() {
    const offersModel = new Offers();
    console.log(offersModel.getOffers());
  }
}

export default Point;
