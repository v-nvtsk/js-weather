export default function pageInit(parent) {
  const header = document.createElement('h1');
  header.innerHTML = 'Weather forecast';
  parent.append(header);

  const currentWeatherEl = document.createElement('div');
  currentWeatherEl.id = 'currentWeather';
  parent.append(currentWeatherEl);

  const currentCityEl = document.createElement('div');
  currentCityEl.id = 'currentCity';
  currentWeatherEl.append(currentCityEl);

  const currentTempEl = document.createElement('div');
  currentTempEl.id = 'currentTemp';
  currentWeatherEl.append(currentTempEl);

  const currentIconEl = document.createElement('div');
  currentIconEl.id = 'currentIcon';
  currentWeatherEl.append(currentIconEl);
}
