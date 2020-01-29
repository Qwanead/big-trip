const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTER:
      container.after(component.getElement());
      break;
    default:
      throw new Error(`Unknown render position`);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(newElement && oldElement);

  if (isExistElements) {
    oldElement.replaceWith(newElement);
  }
};

export {createElement, render, RenderPosition, remove, replace};
