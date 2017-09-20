import { Column } from 're-bulma';
import style from '../style';
import Tooltip from '../../Tooltip';

export default function Social({question, share, openTooltip, tooltip }) {
  const url = 'http://google.com';
  const shareTwitter = `https://twitter.com/intent/tweet?text=Question%20on%20@Quora:%20${question}&url=${url}`;
  const shareFb = `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`;
  return (
    <Column style={style.answerFull.social}>
      <span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a onClick={() => share('facebook')} className="fb-xfbml-parse-ignore fa fa-facebook-official mute-link" target="_blank" href={shareFb} />
        </span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a onClick={() => share('twitter')} target="_blank" href={shareTwitter} className="fa fa-twitter mute-link" />
        </span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a href="#" className="fa fa-share-square-o mute-link" />
        </span>
      </span>
      <span onClick={() => openTooltip()} style={{ lineHeight: 2.25, marginLeft: 10 }} className="toggle-tooltip">
        <a className="fa fa-ellipsis-h mute-link ellipse-link" />
        <Tooltip open={tooltip}>
          <ul>
            <li><a>Edit Answer</a></li>
            <hr />
            <li><a>Edit Credentials</a></li>
            <li><a>Delete Answer</a></li>
            <li><a>Log</a></li>
          </ul>
        </Tooltip>
      </span>
    </Column>
  );
}
