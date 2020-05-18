import AbstractComponent from './abstract-component';

const createEventsTemplate = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`
  );
};

class Events extends AbstractComponent {
  getTemplate() {
    return createEventsTemplate();
  }
}

export default Events;
