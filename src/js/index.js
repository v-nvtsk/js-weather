import getCityByIP from './ip';
import getWeatherInCity from './weather';
import appendParentWithChild from './appendParentWithChild';

let currentWeatherEl;
let currentCityEl;
let currentTempEl;
let currentIconEl;
let inputCity;
let submitBtn;

export function weatherRender(weather) {
  if (weather) {
    currentCityEl.innerHTML = `Current city: ${weather.city}`;
    currentTempEl.innerHTML = `Current temperature: ${weather.temp}`;
    currentIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">`;
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
    const weather = await getWeatherInCity(city);
    weatherRender(weather);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const appContainer = document.querySelector('#app');
  pageInit(appContainer);

  const city = await getCityByIP();
  const weather = await getWeatherInCity(city);
  weatherRender(weather);
});
