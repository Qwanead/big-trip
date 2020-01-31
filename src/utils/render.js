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

const render = (containerElement, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(component.getElement());
      break;
    case RenderPosition.AFTER:
      containerElement.after(component.getElement());
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
  oldComponent.getElement().replaceWith(newComponent.getElement());
};

export {createElement, render, RenderPosition, remove, replace};
