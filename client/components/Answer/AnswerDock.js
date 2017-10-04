import dynamic from 'next/dynamic';
import { Button, Columns, Column } from 're-bulma';
import Tooltip from '../Tooltip';
import style from './style';

const Wysiwyg = dynamic(import('../Wysiwyg'));

export default function AnswerDoc(props) {
  return (
    <div style={style.answerDockContainer}>
      <div style={style.userInfo}>
        <Columns>
          <Column size="is1">
            <img style={style.answerImage} src={props.user.profilePhoto} />
          </Column>
          <Column>
            <Column>
              <a href="#" className="header-link">{props.user.name}</a><br />
              <a href="#" className="mute-link">{props.user.profileCredential}</a>
            </Column>
          </Column>
        </Columns>
      </div>
      <Wysiwyg
        handleChange={(html) => props.handleAnswerChange(html, props.id)}
        value={props.content}
      />
      <Columns style={style.actions}>
        <Column>
          <Button color="isPrimary" onClick={() => props.submitAnswer(props.id, false)}>Submit</Button>
          <span> <a className="mute-link" onClick={() => props.submitAnswer(props.id) }>Save draft</a></span>
        </Column>
        <Column style={style.rightActions}>
          <span onClick={() => props.openTooltip(`answer-${props.id}`)} className="toggle-tooltip">
            <a className="fa fa-ellipsis-h mute-link ellipse-link" />
            <Tooltip open={props.tooltip === `answer-${props.id}`}>
              <ul>
                <li ><a>Clear draft</a></li>
              </ul>
            </Tooltip>
          </span>
        </Column>
        <div style={{ clear: 'both' }} />
      </Columns>
    </div>
  );
}
