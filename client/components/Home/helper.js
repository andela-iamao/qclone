import _ from 'lodash';

export default function(arg) {
  document.addEventListener('click', (event) => {
    const tooltipElements = document.getElementsByClassName('hover_menu-active')[0];
    let isClickInside = tooltipElements.contains(event.target);
    if (!isClickInside && Object.values(event.target.classList).indexOf('ellipse-link') < 0) {
      arg();
    }
  });
}

export function toObj(arr) {
  return arr.reduce((a, b) => {
    a[b.id] = _.pick(b, ['id', 'ownAnswer']);
    a[b.id].open = false;
    a[b.id].answer = '';  
    return a;
  }, {});
}
