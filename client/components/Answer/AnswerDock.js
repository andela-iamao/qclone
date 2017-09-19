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
            <img style={style.answerImage} src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/07/28/16/avatar.jpg" />
          </Column>
          <Column>
            <Column>
              <a href="#" className="header-link">Ash Amao</a><br />
              <a href="#" className="mute-link">Edit credentials</a>
            </Column>
          </Column>
        </Columns>
      </div>
      <Wysiwyg
        handleChange={props.handleAnswerChange}
      />
      <Columns style={style.actions}>
        <Column>
          <Button color="isPrimary">Submit</Button>
          <span> <a href="#" className="mute-link">Save draft</a></span>
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
