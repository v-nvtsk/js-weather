import getCityByIP from './ip';
import getWeatherInCity from './weather';
import appendParentWithChild from './appendParentWithChild';
import renderCitiesList from './render-cities-list';
import citiesCache from './cities-cache';
import { setLocation } from './map';

let currentWeatherEl;
let currentCityEl;
let currentTempEl;
let currentIconEl;
let inputCity;
let submitBtn;
let savedCitiesList;

export function weatherRender(weather) {
  if (weather) {
    currentCityEl.innerHTML = `${weather.city}`;
    currentTempEl.innerHTML = `${weather.temp}`;
    currentIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">`;
  }
}

export async function updateWeather(city) {
  const weather = await getWeatherInCity(city);
  if (weather) {
    weatherRender(weather);
    citiesCache.addCity(weather.city);
    setLocation(weather.coord);
  }
}

export function pageInit(parent) {
  const header = appendParentWithChild(parent, 'h1', 'header');
  header.innerHTML = 'Weather forecast';

  currentWeatherEl = appendParentWithChild(parent, 'div', 'currentWeather');
  currentCityEl = appendParentWithChild(currentWeatherEl, 'div', 'currentCity');
  currentTempEl = appendParentWithChild(currentWeatherEl, 'div', 'currentTemp');
  currentIconEl = appendParentWithChild(currentWeatherEl, 'div', 'currentIcon');

  const inputGroup = appendParentWithChild(parent, 'form', 'inputGroup');
  inputCity = appendParentWithChild(inputGroup, 'input', 'inputCity');
  inputCity.placeholder = 'Enter city';
  submitBtn = appendParentWithChild(inputGroup, 'button', 'submitBtn');
  submitBtn.innerHTML = 'Get weather forecast';

  inputGroup.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const city = inputCity.value;
    updateWeather(city);
    inputCity.value = '';
  });

  savedCitiesList = appendParentWithChild(parent, 'ul', 'savedCitiesList');
  savedCitiesList.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'LI') {
      const city = ev.target.innerHTML;
      updateWeather(city);
    }
  });

  appendParentWithChild(parent, 'div', 'map');
}

document.addEventListener('DOMContentLoaded', async () => {
  const appContainer = document.querySelector('#app');
  pageInit(appContainer);

  citiesCache.init();
  citiesCache.subscribe((cities) => {
    renderCitiesList(savedCitiesList, cities);
  });

  const city = await getCityByIP();
  updateWeather(city);
});
