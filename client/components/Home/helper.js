export default function(arg) {
  document.addEventListener('click', (event) => {
    const tooltipElements = document.getElementsByClassName('hover_menu-active')[0];
    let isClickInside = tooltipElements.contains(event.target);
    if (!isClickInside && Object.values(event.target.classList).indexOf('ellipse-link') < 0) {
      arg();
    }
  });
}
