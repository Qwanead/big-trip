import AbstractComponent from './abstract-component';

const createNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

class NoPoints extends AbstractComponent {
  getTemplate() {
    return createNoPointsTemplate();
  }
}

export default NoPoints;
