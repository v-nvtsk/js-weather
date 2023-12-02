import appendParentWithChild from './appendParentWithChild';

export default function renderCitiesList(parent, citiesList) {
  // eslint-disable-next-line no-param-reassign
  parent.innerHTML = '';
  citiesList.forEach((el) => {
    const item = appendParentWithChild(parent, 'li');
    item.innerHTML = el;
  });
}
