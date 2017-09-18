import style from './style';

export default function Item({ icon, title, path }) {
  let className = 'nav-link';
  if (path === '/' && title === 'Home') {
    className = 'nav-link-active';
  } else if (path === '/notifications' && title === 'Notifications') {
    className = 'nav-link nav-link-active';
  } else if (path === '/answer' && title === 'Answer') {
    className = 'nav-link nav-link-active';
  }
  return (
    <div className={className}>
      <h3 style={style.navItems}>
        <span className={icon}></span>
        <span className="nav-link-title">{title}</span>
      </h3>
    </div>
  );
}
