import appendParentWithChild from './appendParentWithChild';

export default function renderCitiesList(parent, citiesList) {
  citiesList.forEach((el) => {
    const item = appendParentWithChild(parent, 'li');
    item.innerHTML = el;
  });
}
