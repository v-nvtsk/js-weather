import pageInit from '../js/index';

describe('Weather forecast app', () => {
  let currentWeatherEl;
  let currentCityEl;
  let currentTempEl;
  let currentIconEl;

  beforeEach(() => {
    const parent = document.createElement('div');
    pageInit(parent);
    currentWeatherEl = parent.querySelector('#currentWeather');
    currentCityEl = currentWeatherEl.querySelector('#currentCity');
    currentTempEl = currentWeatherEl.querySelector('#currentTemp');
    currentIconEl = currentWeatherEl.querySelector('#currentIcon');
  });
  it('pageInit is a function', () => {
    expect(pageInit).toBeInstanceOf(Function);
  })
  it('pageInit creates initial markup', () => {
    expect(currentWeatherEl).not.toBeNull();
    expect(currentCityEl).not.toBeNull();
    expect(currentTempEl).not.toBeNull();
    expect(currentIconEl).not.toBeNull();

  });
});