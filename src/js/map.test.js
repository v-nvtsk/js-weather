import { initMap, setLocation } from './map';

describe('yandex maps', () => {
  let parent;
  beforeAll(() => {
    parent = {
      value: {},
      addChild(layer) {
        this.value.layer = layer;
      },
      setLocation(obj) {
        this.value.obj = obj;
      }
    };
    // Mock the global ymaps object
    global.ymaps3 = {
      ready: jest.fn().mockImplementation((callback) => callback()),
      YMap: jest.fn((el, obj) => {
        parent.YMAP = { el, obj };
        return parent;
      }),
      YMapDefaultSchemeLayer: jest.fn(() => 'mapLayer')
    };
  });
  it('setLocation is a function', () => {
    expect(setLocation).toBeInstanceOf(Function);
  });

  it('setLocation calls initMap', async () => {
    const coord = ['55.753994', '37.622093'];
    await setLocation(coord);
    expect(await initMap()).toBe(parent);
  });

  it("setLocation second call doesn't call initMap", async () => {
    const coord = ['55.753994', '37.622093'];
    await setLocation(coord);
    const parent1 = { ...parent };
    await setLocation(coord);
    const parent2 = { ...parent };
    expect(parent1).toEqual(parent2);
  });
});
