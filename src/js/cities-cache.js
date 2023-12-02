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
    const existIndex = this.cities.indexOf(newItem);
    if (existIndex !== -1) {
      this.cities = [newItem, ...this.cities.slice(0, existIndex), ...this.cities.slice(existIndex + 1)];
    } else if (this.cities.length > 9) {
      this.cities = [newItem, ...this.cities.slice(0, 9)];
    } else {
      this.cities = [newItem, ...this.cities];
    }
    this.saveItems();
    this.listeners.forEach((el) => el(this.cities));
    return newItem;
  },
  listeners: [],
  subscribe(func) {
    this.listeners.push(func);
  }
};