import { Columns, Column } from 're-bulma';
import moment from 'moment';
import { getUserInfo } from '../../../util/auth';
import style from '../style';

export default function Header(props) {
  const fullname = Object.values(getUserInfo(['firstname', 'lastname'])).join(' ');
  return (
    <div>
      <h1><a className="header-link parent-font">{props.title}</a></h1>
      <hr />
      <Columns>
        <Column size="is1">
          <img style={style.answerFull.avatar} src={props.profile_photo} />
        </Column>
        <Column style={style.answerFull.userInfo}>
          <span>
            <a className="header-link parent-font">{fullname}</a> · {props.profile_credential.length > 0 ?
              <span>{props.profile_credential}</span>
              :
              <a className="mute-link">Add credentials</a>
            }<br />
            <a className="mute-link">Answered {moment(props.createdAt).fromNow()}</a>
          </span>
        </Column>
      </Columns>
    </div>
  );
}
