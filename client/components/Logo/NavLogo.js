import style from './style';

export default function NavLogo() {
  return (
    <h1 style={style.navLogo.header}>
      <a style={style.navLogo.link} href="/">
        <span style={style.navLogo.span}>Quora</span>
      </a>
    </h1>
  );
}
