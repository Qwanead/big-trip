import AbstractComponent from './abstract-component';

const createNewEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

class newEventButton extends AbstractComponent {
  getTemplate() {
    return createNewEventButtonTemplate();
  }

  setOnNewEventButtonClick(onClick) {
    this.getElement().addEventListener(`click`, onClick);
  }

  setDisabled() {
    this.getElement().disabled = true;
  }

  setEnabled() {
    this.getElement().disabled = false;
  }
}

export default newEventButton;
