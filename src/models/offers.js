class Offers {
  constructor(api) {
    this.offers = [];
    this.api = api;
  }

  getOffers() {
    if (this.offers === 0) {
      this.api.getOffers().
        then((offersList) => {
          this.offers = Array.from(offersList);
        });
    }

    return this.offers;
  }
}

export default Offers;
