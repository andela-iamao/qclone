import { Columns, Column } from 're-bulma';
import style from '../style';

export default function About(props) {
  return (
    <Column>
      <h3>About the author</h3>
      <hr />
      <Columns>
        <Column size="is1">
          <img style={style.answerFull.avatar} src={props.profile_photo} />
        </Column>
        <Column style={style.answerFull.userInfo}>
          <span>
            <a className="header-link parent-font"> <b>{`${props.firstname} ${props.lastname}`}</b></a>
          </span>
        </Column>
      </Columns>
      <Column style={style.answerFull.credentialsUl}>
        <Columns>
          <Column size="is1">
            <span className="fa fa-briefcase"/>
          </Column>
          <Column>
            <a href="#"><b>Add employment credential</b></a>
          </Column>
        </Columns>
        <Columns>
          <Column size="is1">
            <span className="fa fa-graduation-cap"/>
          </Column>
          <Column>
            <a href="#"><b>Add educational credential</b></a>
          </Column>
        </Columns>
        <Columns>
          <Column size="is1">
            <span className="fa fa-map-marker"/>
          </Column>
          <Column >
            <a href="#"><b>Add location credential</b></a>
          </Column>
        </Columns>
      </Column>
    </Column>
  );
}
