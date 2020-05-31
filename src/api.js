import Point from "./models/point-model";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getTasks(allOffers, destinations) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
      .then((response) => response.json())
      .then((response) => Point.parsePoints({response, allOffers, destinations}));
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then((response) => response.json());
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
      .then((response) => response.json());
  }
};

export default API;
