const POINT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const POINT_ACTIVITYS = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const SortType = {
  PRICE: `sort-price`,
  TIME: `sort-time`,
  DEFAULT: `sort-event`,
};

export {POINT_TYPES, POINT_ACTIVITYS, FilterType, SortType};
