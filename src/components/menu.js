import {generateTemplates, createElement} from '../utils';

const getMenuItemTemplate = ({isChecked, title}) =>
  `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`;

const getMenuList = generateTemplates(getMenuItemTemplate);

const createMenuTemplate = (menuItems) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${getMenuList(menuItems)}
    </nav>`
  );
};

class Menu {
  constructor(menuItems) {
    this._element = null;
    this.menuItems = menuItems;

  }

  getTemplate() {
    return createMenuTemplate(this.menuItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Menu;
