function appendParentWithEl(parentEl, tag, childId = '') {
  const child = document.createElement(tag);
  child.id = childId;
  parentEl.append(child);
  return child;
}

export default function pageInit(parent) {

  const header = appendParentWithEl(parent, 'h1', 'header');
  header.innerHTML = 'Weather forecast';

  const currentWeatherEl = appendParentWithEl(parent, 'div', 'currentWeather');
  const currentCityEl = appendParentWithEl(currentWeatherEl, 'div', 'currentCity');
  const currentTempEl = appendParentWithEl(currentWeatherEl, 'div', 'currentTemp');
  const currentIconEl = appendParentWithEl(currentWeatherEl, 'div', 'currentIcon');
}

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('#app');
  pageInit(appContainer);
})

