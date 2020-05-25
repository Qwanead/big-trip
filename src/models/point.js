const formatString = (str) => str.replace(/ /g, `-`).toLowerCase();

const convertOffers = (type, offersChecked, allOffers) => {
  const resultOffers = allOffers.filter((it) => it.type === type)[0].offers.slice();
  for (let i = 0; i < resultOffers.length; i++) {
    resultOffers[i] = Object.assign({}, resultOffers[i]);
  }

  resultOffers.forEach((resultOffer) => {
    resultOffer.shortTitle = formatString(resultOffer.title);
    resultOffer.isChecked = false;

    offersChecked.some((offerChecked) => {
      if (offerChecked.title === resultOffer.title) {
        resultOffer.price = offerChecked.price;
        resultOffer.isChecked = true;

        return true;
      }

      return false;
    });
  });

  return resultOffers;
};

class Point {
  constructor(pointData, allOffers) {
    this.id = pointData.id;
    this.type = pointData.type;
    this.destination = pointData.destination.name;
    this.pictures = pointData.destination.pictures;
    this.description = pointData.destination.description;
    this.dateFrom = new Date(pointData.date_from);
    this.dateTo = new Date(pointData.date_to);
    this.basePrice = pointData.base_price;
    this.offersChecked = pointData.offers;
    this.allOffers = allOffers;
    this.offers = convertOffers(pointData.type, pointData.offers, allOffers);
    this.isFavorite = Boolean(pointData.is_favorite);
    this.duration = this.dateFrom - this.dateTo;
  }

  static parsePoint(pointData, allOffers) {
    return new Point(pointData, allOffers);
  }

  static parsePoints({response: PointsData, allOffers}) {
    return PointsData.map((it) => Point.parsePoint(it, allOffers));
  }
}

export default Point;
