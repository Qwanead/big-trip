const offerstoRAW = (offers) => {
  if (offers.length > 0 && offers[0].hasOwnProperty(`isChecked`)) {
    return offers
      .filter((offer) => offer.isChecked)
      .map((offer) => ({
        title: offer.title,
        price: offer.price,
      }));
  }

  return offers;
};
class Point {
  constructor(pointData) {
    this.id = pointData.id;
    this.type = pointData.type;
    this.destination = pointData.destination.name;
    this.pictures = pointData.destination.pictures;
    this.description = pointData.destination.description;
    this.dateFrom = new Date(pointData.date_from);
    this.dateTo = new Date(pointData.date_to);
    this.basePrice = pointData.base_price;
    this.offersChecked = pointData.offers;
    this.offers = pointData.offers;
    this.isFavorite = Boolean(pointData.is_favorite);
    this.duration = this.dateFrom - this.dateTo;
  }

  static parsePoint(pointData, allOffers, destinations) {
    return new Point(pointData, allOffers, destinations);
  }

  static parsePoints({response: PointsData, allOffers, destinations}) {
    return PointsData.map((PointData) => Point.parsePoint(PointData, allOffers, destinations));
  }

  toRAW() {
    return {
      "base_price": this.basePrice,
      "date_from": this.dateFrom.toISOString(),
      "date_to": this.dateTo.toISOString(),
      "destination": {
        "description": this.description,
        "name": this.destination,
        "pictures": this.pictures,
      },
      "id": this.id,
      "is_favorite": this.isFavorite,
      "offers": offerstoRAW(this.offers),
      "type": this.type,
    };
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}

export default Point;
