import { getLocalStorageItem, setLocalStorageItem } from './storage';

const CITY_LIST = 'cities';

export default {
  cities: [],
  init() {
    this.loadItems();
  },
  loadItems() {
    this.cities = getLocalStorageItem(CITY_LIST) || [];
    return this.cities;
  },
  saveItems() {
    setLocalStorageItem(CITY_LIST, this.cities);
  },
  addCity(cityName) {
    if (!cityName) return false;
    const newItem = cityName.toUpperCase();
    const tempArr = [newItem];
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i] !== newItem) {
        tempArr.push(this.cities[i]);
      }
    }
    if (tempArr.length === 11) tempArr.pop();
    this.cities = tempArr;

    this.saveItems();
    this.listeners.forEach((el) => el(this.cities));
    return newItem;
  },
  listeners: [],
  subscribe(func) {
    this.listeners.push(func);
  }
};
