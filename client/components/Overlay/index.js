import style from './style';

export default function Overlay(props) {
  return (
    <div>
      <div style={props.bg === 'light' ? style.light : style.dark}></div>
      <div style={style.layer}>
        {props.children}
      </div>
    </div>
  );
}
