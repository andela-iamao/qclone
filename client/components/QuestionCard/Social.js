import { Column } from 're-bulma';
import style from './style';
import Tooltip from '../Tooltip';
import { getUserId } from '../../util/auth';

export default function Social({ id, content, author_id, share, openTooltip, tooltip, toggleQuestionModal }) {
  const url = `http://www.quora.com/${content.replace(/ /g, '-').replace('?', '')}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=Question%20on%20@Quora:%20${content}&url=${url}`;
  const shareFb = `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`;
  return (
    <Column style={style.social}>
      <span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a onClick={() => share(id, 'facebook')} className="fb-xfbml-parse-ignore fa fa-facebook-official mute-link" target="_blank" href={shareFb} />
        </span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a onClick={() => share(id, 'twitter')} target="_blank" href={shareTwitter} className="fa fa-twitter mute-link" />
        </span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a href="#" className="fa fa-share-square-o mute-link" />
        </span>
      </span>
      <span onClick={() => openTooltip(id)} style={{ lineHeight: 2.25, marginLeft: 10 }} className="toggle-tooltip">
        <a className="fa fa-ellipsis-h mute-link ellipse-link" />
        <Tooltip open={id === tooltip}>
          <ul>
            <li><a>...</a></li>
            {author_id === getUserId() &&
              <li onClick={() => toggleQuestionModal({id, content})}><a>Edit Question & Source</a></li>
            }
          </ul>
        </Tooltip>
      </span>
    </Column>
  );
}
