import {convertArrayToString} from '../utils';

const getMenuList = (menuItems) => {
  const getMenuItemTemplate = (menuItem) =>
    `<a class="trip-tabs__btn ${menuItem.isChecked ? `trip-tabs__btn--active` : ``}" href="#">${menuItem.title}</a>`;

  return convertArrayToString(menuItems, getMenuItemTemplate);
};

const createMenuTemplate = (menuItems) => {
  const menuList = getMenuList(menuItems);

  return (`
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuList}
    </nav>
  `);
};

export {createMenuTemplate};
