import renderCitiesList from './render-cities-list';

describe('renderCitiesList', () => {
  let parent;
  beforeEach(() => {
    parent = document.createElement('ul');
    parent.id = 'savedCitiesList';
    document.body.append(parent);
  });

  it('renderCitiesList is a function', () => {
    expect(renderCitiesList).toBeInstanceOf(Function);
  });
  const testData = [
    {
      cities: ['Moscow', 'London', 'New York'],
      result: '<li id="">Moscow</li><li id="">London</li><li id="">New York</li>'
    },
    {
      cities: [],
      result: ''
    }
  ];
  testData.forEach(({ cities, result }) => {
    it(`renderCitiesList renders cities: ${cities}`, () => {
      renderCitiesList(parent, cities);
      expect(parent.innerHTML).toBe(result);
    });
  });

  it('should clear parent', () => {
    renderCitiesList(parent, ['Moscow', 'London', 'New York']);
    renderCitiesList(parent, ['Minsk']);
    const result = `<li id="">Minsk</li>`;
    expect(parent.innerHTML).toBe(result);
  });
});
