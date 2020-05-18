import {generateTemplates} from '../utils/common';
import AbstractComponent from './abstract-component';

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

class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }
}

export default Menu;
