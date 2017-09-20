import { Columns, Column } from 're-bulma';
import style from '../style';

export default function Header() {
  return (
    <div>
      <h1><a className="header-link parent-font">What is a good album to listen to, from start to finish?</a></h1>
      <hr />
      <Columns>
        <Column size="is1">
          <img style={style.answerFull.avatar} src="https://qph.ec.quoracdn.net/main-thumb-138684411-50-wtqmfujaumbklivtgndzihiqhpwfkhrs.jpeg" />
        </Column>
        <Column style={style.answerFull.userInfo}>
          <span>
            <a className="header-link parent-font">Ash Amao</a> · <a className="mute-link">Add credentials</a><br />
            <a className="mute-link">Answered 57m ago</a>
          </span>
        </Column>
      </Columns>
    </div>
  );
}
