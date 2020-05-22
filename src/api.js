import Point from "./models/point";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getTasks(allOffers) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/points`, {headers})
      .then((response) => response.json())
      .then((response) => Point.parsePoints({response, allOffers}));
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/offers`, {headers})
      .then((response) => response.json());
  }
};

export default API;
