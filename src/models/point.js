const formatString = (str) => str.replace(/ /g, `-`).toLowerCase();

const convertOffers = (type, offersChecked, allOffers) => {
  const targetOffers = allOffers.filter((it) => it.type === type)[0].offers;
  const temp = targetOffers.filter((it) => offersChecked.some((elem) => elem.type === it.type));
  console.log('target');
  console.log(targetOffers);
  console.log('filter');
  console.log(temp);
  return targetOffers;
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
    this.offers = pointData.offers;
    this.isFavorite = Boolean(pointData.is_favorite);
    this.duration = this.dateFrom - this.dateTo;

    convertOffers(this.type, this.offersChecked, this.allOffers);
  }

  static parsePoint(pointData, allOffers) {
    return new Point(pointData, allOffers);
  }

  static parsePoints({response: PointsData, allOffers}) {
    return PointsData.map((it) => Point.parsePoint(it, allOffers));
  }

  // setOffers() {
  //   const offersModel = new Offers();
  //   console.log(offersModel.getOffers());
  // }
}

export default Point;
