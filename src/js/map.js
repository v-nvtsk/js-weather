// import * as ymaps3 from 'ymaps3';

let Map;

export async function initMap(coordArr) {
  await global.ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer } = global.ymaps3;
  Map = new YMap(document.getElementById('map'), {
    location: { center: coordArr, zoom: 10 }
  });
  Map.addChild(new YMapDefaultSchemeLayer());
  return Map;
}

export async function setLocation(coordArr) {
  if (!Map) {
    Map = await initMap(coordArr);
  } else {
    Map.setLocation({ center: coordArr, zoom: 10 });
  }
}
