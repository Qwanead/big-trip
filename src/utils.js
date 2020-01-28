const NUMBER_LENGTH = 2;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
};

const getRandomInteger = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const formatCase = (str) => str[0].toUpperCase() + str.slice(1);

const formatNumber = (number) => number.toString().padStart(NUMBER_LENGTH, `0`);

const generateTemplates = (getTemplate) =>
  (arr) => arr.reduce((result, it) => result + getTemplate(it), ``);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTER:
      container.after(element);
      break;
  }
};

export {getRandomInteger, getRandomArrayItem, formatCase, formatNumber, generateTemplates, createElement, render, RenderPosition};
