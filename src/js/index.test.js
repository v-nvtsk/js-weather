/* eslint-disable no-useless-escape */
import { pageInit, weatherRender, updateWeather } from './index';
import renderCitiesList from './render-cities-list';
import getWeatherInCity from './weather';

jest.mock('./ip');
jest.mock('./weather');
jest.mock('./map');

describe('Weather forecast app', () => {
  let currentWeatherEl;
  let currentCityEl;
  let currentTempEl;
  let currentIconEl;
  let inputGroup;
  let inputCity;
  let submitBtn;
  let savedCitiesList;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.append(container);
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const parent = document.querySelector('#app');
    currentWeatherEl = parent.querySelector('#currentWeather');
    currentCityEl = currentWeatherEl.querySelector('#currentCity');
    currentTempEl = currentWeatherEl.querySelector('#currentTemp');
    currentIconEl = currentWeatherEl.querySelector('#currentIcon');

    inputGroup = parent.querySelector('#inputGroup');
    inputCity = inputGroup.querySelector('#inputCity');
    submitBtn = inputGroup.querySelector('#submitBtn');
    savedCitiesList = parent.querySelector('#savedCitiesList');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('pageInit', () => {
    it('pageInit is a function', () => {
      expect(pageInit).toBeInstanceOf(Function);
    });
    it('pageInit creates initial markup', () => {
      expect(currentWeatherEl).not.toBeNull();
      expect(currentCityEl).not.toBeNull();
      expect(currentTempEl).not.toBeNull();
      expect(currentIconEl).not.toBeNull();
    });

    it('inputGroup is created', () => {
      expect(inputGroup).not.toBeNull();
      expect(inputCity).not.toBeNull();
      expect(submitBtn).not.toBeNull();
      expect(savedCitiesList).not.toBeNull();
    });
  });

  describe('weatherRender', () => {
    const weatherData = {
      city: 'Moscow',
      temp: -3.43,
      icon: '04d'
    };

    it('weatherRender is a function', () => {
      expect(weatherRender).toBeInstanceOf(Function);
    });

    it('weatherRender do nothing with no data', () => {
      weatherRender();
      expect(currentCityEl.innerHTML).toEqual('');
    });

    it('weatherRender renders weather data', () => {
      weatherRender(weatherData);
      expect(currentCityEl.innerHTML).toEqual(`${weatherData.city}`);
      expect(currentTempEl.innerHTML).toEqual(`${weatherData.temp}`);
      expect(currentIconEl.innerHTML).toEqual(
        `<img src=\"https://openweathermap.org/img/wn/${weatherData.icon}@2x.png\">`
      );
    });

    it('button click calls getWeatherInCity', async () => {
      // first run on startup
      expect(getWeatherInCity).toHaveBeenCalledTimes(1);

      inputCity.value = 'London';
      submitBtn.click();
      expect(getWeatherInCity).toHaveBeenCalledTimes(2);
      expect(getWeatherInCity).toHaveBeenCalledWith('London');
    });

    it('updateWeather calls getWeatherInCity', async () => {
      // first run on startup
      expect(getWeatherInCity).toHaveBeenCalledTimes(1);

      inputCity.value = 'London';
      getWeatherInCity.mockResolvedValue({ city: 'Лондон', temp: -33.43, icon: '01d', cod: 200 });
      updateWeather(inputCity.value);
      expect(getWeatherInCity).toHaveBeenCalledTimes(2);
      expect(getWeatherInCity).toHaveBeenCalledWith('London');
    });

    it('click on savedCitiesList calls getWeatherInCity', async () => {
      // first run on startup
      expect(getWeatherInCity).toHaveBeenCalledTimes(1);

      const cities = ['London'];
      renderCitiesList(savedCitiesList, cities);
      savedCitiesList.querySelector('LI').click();
      expect(getWeatherInCity).toHaveBeenCalledTimes(2);
      expect(getWeatherInCity).toHaveBeenCalledWith('London');
    });
    it('misclick on savedCitiesList but not city do nothing', async () => {
      // first run on startup
      expect(getWeatherInCity).toHaveBeenCalledTimes(1);

      const cities = ['London'];
      renderCitiesList(savedCitiesList, cities);
      savedCitiesList.click();
      expect(getWeatherInCity).toHaveBeenCalledTimes(1);
    });
  });
});
