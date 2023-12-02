import getCityByIP from './ip';
import getWeatherInCity from './weather';

let currentWeatherEl;
let currentCityEl;
let currentTempEl;
let currentIconEl;
let inputCity;
let submitBtn;

function appendParentWithChild(parentEl, tag, childId = '') {
  const child = document.createElement(tag);
  child.id = childId;
  parentEl.append(child);
  return child;
}

export function pageInit(parent) {
  const header = appendParentWithChild(parent, 'h1', 'header');
  header.innerHTML = 'Weather forecast';

  currentWeatherEl = appendParentWithChild(parent, 'div', 'currentWeather');
  currentCityEl = appendParentWithChild(currentWeatherEl, 'div', 'currentCity');
  currentTempEl = appendParentWithChild(currentWeatherEl, 'div', 'currentTemp');
  currentIconEl = appendParentWithChild(currentWeatherEl, 'div', 'currentIcon');

  const inputGroup = appendParentWithChild(parent, 'div', 'inputGroup');
  inputCity = appendParentWithChild(inputGroup, 'input', 'inputCity');
  inputCity.placeholder = 'Enter city';
  submitBtn = appendParentWithChild(inputGroup, 'button', 'submitBtn');
  submitBtn.innerHTML = 'Get weather forecast';
}

export function weatherRender(weather) {
  if (weather) {
    currentCityEl.innerHTML = `Current city: ${weather.city}`;
    currentTempEl.innerHTML = `Current temperature: ${weather.temp}`;
    currentIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const appContainer = document.querySelector('#app');
  pageInit(appContainer);

  const city = await getCityByIP();
  const weather = await getWeatherInCity(city);
  weatherRender(weather);
});
