import { Column } from 're-bulma';
import style from './style';

export default function Social({ noAnswer }) {
  return (
    <Column style={style.social}>
      {noAnswer &&
        <span>
          <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
            <a href="#" className="fa fa-facebook-official mute-link" />
          </span>
          <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
            <a href="#" className="fa fa-twitter mute-link" />
          </span>
          <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
            <a href="#" className="fa fa-share-square-o mute-link" />
          </span>
        </span>
      }
      <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
        <a href="#" className="fa fa-ellipsis-h mute-link" />
      </span>
    </Column>
  );
}
