const createMenuTemplate = (menuItems) => {

  const getMenuList = () => {
    const getMenuItemTemplate = (menuItem) =>
      `<a class="trip-tabs__btn ${menuItem.isChecked ? `trip-tabs__btn--active` : ``}" href="#">${menuItem.title}</a>`;

    return menuItems.map((it) => getMenuItemTemplate(it)).join(`\n`);
  };

  return (`
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getMenuList()}
    </nav>
  `);
};

export {createMenuTemplate};
