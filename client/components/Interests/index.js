import { Column } from 're-bulma';
import style from './style';

export default class Interests extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { handleCheck, active, text, image, id } = this.props;
    return (
      <Column style={style.col}>
        <div className={active ? 'check-wrapper check-wrapper-active' : 'check-wrapper'}>
          <div className={active ? 'check check-active' : 'check'} onClick={() => handleCheck(id)}></div>
        </div>
        <div style={style.box}>
          <div style={style.imageBox}>
            <img style={style.imageBoxImage} src={image} />
          </div>
          <div style={style.textBox}>
            <span style={style.textBoxSpan}>{text}</span>
          </div>
        </div>
      </Column>
    );
  }

}
