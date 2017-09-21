import dynamic from 'next/dynamic';
import { Button, Column, Columns } from 're-bulma';
import Social from './social';
import style from '../style';

const Wysiwyg = dynamic(import('../../Wysiwyg'));

export default function Content(props) {
  return (
    <div>
      <Column style={style.answerFull.content}>
        {!props.editing ?
          <div>
            <p className="answer-content" dangerouslySetInnerHTML={{ __html: props.context }} />
            <p className="mute-link">{props.views} views</p>
          </div>
          :
          <div>
            <Wysiwyg
              handleChange={props.handleAnswerChange}
              value={props.contentEditable}
            />
            <Columns style={style.actions}>
              <Column>
                <Button color="isPrimary" onClick={props.handleUpdateAnswer}>Update</Button>
                <span> <a className="mute-link" onClick={() => props.submitAnswer(props.id) }>Save draft</a></span>
                <span> <a className="mute-link" onClick={props.toggleEdit}>Cancel</a></span>
              </Column>
              <div style={{ clear: 'both' }} />
            </Columns>
          </div>
        }
        <Columns>
          <Column>
            <Button state="isDisabled"><b>Upvotes | {props.upvotes.length}</b></Button>
          </Column>
          <Social
            share={props.handleShare}
            openTooltip={props.toggleTooltip}
            content="What is a good album to listen to, from start to finish?"
            tooltip={props.tooltip}
            handleDelete={props.handleDelete}
            handleEdit={props.handleEdit}
            deleted={props.deleted}
            twitterText={props.twitterText}
          />
        </Columns>
      </Column>
    </div>
  );
}
