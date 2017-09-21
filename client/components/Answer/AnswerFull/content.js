import { Button, Column, Columns } from 're-bulma';
import Social from './social';
import style from '../style';

export default function Content(props) {
  return (
    <div>
      <Column style={style.answerFull.content}>
        <p className="answer-content" dangerouslySetInnerHTML={{ __html: props.context }} />
        <p className="mute-link">{props.views} views</p>
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
            deleted={props.deleted}
            twitterText={props.twitterText}
          />
        </Columns>
      </Column>
    </div>
  );
}
