import Link from 'next/link';
import style from './style';

export default function Item({ href, icon, title, path, children, customStyle }) {
  let className = 'nav-link';
  if (path === '/' && title === 'Home') {
    className = 'nav-link-active';
  } else if (path === '/notifications' && title === 'Notifications') {
    className = 'nav-link nav-link-active';
  } else if (path === '/answer' && title === 'Answer') {
    className = 'nav-link nav-link-active';
  }
  if(children) {
    return (
      <div className={className} style={customStyle}>
        {children}
      </div>
    );
  }
  return (
    <div className={className}>
      <Link href={href}>
        <h3 style={style.navItems}>
          <span className={icon}></span>
          <span className="nav-link-title">{title}</span>
        </h3>
      </Link>
    </div>
  );
}
