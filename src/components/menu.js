import AbstractComponent from './abstract-component';
import {generateTemplates} from '../utils/common';

const MENU_ITEMS = [
  {
    title: `Table`,
    isChecked: true,
  },
  {
    title: `Stats`,
    isChecked: false,
  },
];

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
  constructor() {
    super();
    this._menuItems = MENU_ITEMS;
    this._currentTab = MENU_ITEMS[0].title;
  }

  getTemplate() {
    return createMenuTemplate(this._menuItems);
  }

  setOnTabButtonClick(onClick) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`trip-tabs__btn--active`)) {
        return;
      }

      this.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
      evt.target.classList.add(`trip-tabs__btn--active`);
      this._toggleCurrentTab();

      onClick();
    });
  }

  _toggleCurrentTab() {
    if (this._currentTab === MENU_ITEMS[0].title) {
      this._currentTab = MENU_ITEMS[1].title;
    } else {
      this._currentTab = MENU_ITEMS[0].title;
    }
  }

  getCurrentTab() {
    return this._currentTab;
  }
}

export default Menu;
