import AbstractComponent from './abstract-component';

const createNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

class noPoints extends AbstractComponent {
  getTemplate() {
    return createNoPointsTemplate();
  }
}

export default noPoints;
