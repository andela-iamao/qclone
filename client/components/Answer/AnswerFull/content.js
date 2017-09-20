import { Button, Column, Columns } from 're-bulma';
import Social from './social';
import style from '../style';

export default function Content(props) {
  return (
    <div>
      <Column style={style.answerFull.content}>
        <p>If you are an Indie Folk fan you can try <b>Iron & Wine</b>’s Beast Epic album.</p>
        <p className="mute-link">7 views</p>
        <Columns>
          <Column>
            <Button state="isDisabled"><b>Upvotes | 0</b></Button>
          </Column>
          <Social
            share={props.handleShare}
            openTooltip={props.toggleTooltip}
            content="What is a good album to listen to, from start to finish?"
            tooltip={props.tooltip}
          />
        </Columns>
      </Column>
    </div>
  );
}
