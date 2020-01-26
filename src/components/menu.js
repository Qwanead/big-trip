import {generateTemplates} from '../utils';

const getMenuItemTemplate = ({isChecked, title}) =>
  `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`;

const getMenuList = generateTemplates(getMenuItemTemplate);

const createMenuTemplate = (menuItems) => {
  return (`
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getMenuList(menuItems)}
    </nav>
  `);
};

export {createMenuTemplate};
