/* eslint-disable no-useless-escape */
import { pageInit, weatherRender } from './index';

describe('Weather forecast app', () => {
  let currentWeatherEl;
  let currentCityEl;
  let currentTempEl;
  let currentIconEl;
  let inputGroup;
  let inputCity;
  let submitBtn;

  beforeAll(() => {
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
    });
  });

  describe('weatherRender', () => {
    const weatherData = {
      city: 'London',
      temp: 10,
      icon: 'https://openweathermap.org/img/wn/10d@2x.png'
    };
    beforeEach(() => {
      weatherRender(weatherData);
    });

    it('weatherRender is a function', () => {
      expect(weatherRender).toBeInstanceOf(Function);
    });

    it('weatherRender renders weather data', () => {
      expect(currentCityEl.innerHTML).toEqual(`Current city: ${weatherData.city}`);
      expect(currentTempEl.innerHTML).toEqual(`Current temperature: ${weatherData.temp}`);
      expect(currentIconEl.innerHTML).toEqual(`<img src=\"${weatherData.icon}\">`);
    });
  });
});
