import { Column } from 're-bulma';
import style from './style';

export default function Social({ id, content, share }) {
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
      <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
        <a href="#" className="fa fa-ellipsis-h mute-link" />
      </span>
    </Column>
  );
}
