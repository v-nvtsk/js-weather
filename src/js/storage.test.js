import { getLocalStorageItem, setLocalStorageItem } from './storage';

describe('localStorage tests', () => {
  let getItemSpy;
  let setItemSpy;
  beforeEach(() => {
    if (getItemSpy) getItemSpy.mockRestore();
    if (setItemSpy) setItemSpy.mockRestore();
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  });

  describe('localStorage Get/Set functions', () => {
    [getLocalStorageItem, setLocalStorageItem].forEach((el) => {
      it(`${el.name} should be a function`, () => {
        expect(el).toBeInstanceOf(Function);
      });
    });
  });

  const mockTestData = [
    { KEY: 'foo', VALUE: 'bar' },
    { KEY: 'num', VALUE: 2 },
    { KEY: 'cities', VALUE: ['MOSCOW', 'MADRID'] },
    { KEY: 'cities', VALUE: [] }
  ];
  mockTestData.forEach(({ KEY, VALUE }) => {
    describe(`Test localstorage mock on ${KEY} tests ${VALUE}`, () => {
      it('should spy on localStorage.setItem', () => {
        setLocalStorageItem(KEY, VALUE);
        expect(setItemSpy).toHaveBeenCalledWith(KEY, JSON.stringify(VALUE));
      });

      it('should spy on localStorage.getItem', () => {
        getLocalStorageItem(KEY);
        expect(getItemSpy).toHaveBeenCalledWith(KEY);
      });
      it('should be cleared after each run', () => {
        expect(getItemSpy).not.toHaveBeenCalled();
      });
    });
  });
  /* 
    test('Test broken value for cities list returns empty array',
     () => {
      const cities = "['Moscow', 'London', 'Paris', 'New York'";
      localStorage.brokeItem('cities', cities);
      expect(citiesCache.loadItems('cities')).toEqual([]);
    });
    test('Test broken item for lang returns null', () => {
      const lang = "'r";
      localStorage.brokeItem('lang', lang);
      expect(getLocalStorageItem('lang')).toBeNull();
    });
  */
});
