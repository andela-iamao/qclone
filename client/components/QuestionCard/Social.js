import { Column } from 're-bulma';
import style from './style';

export default function Social({ content }) {
  const shareTwitter = `https://twitter.com/intent/tweet?text=Question%20on%20@Quora:%20${content}&url=http://www.quora.com/${content.replace(/ /g, '-').replace('?', '')}`;
  return (
    <Column style={style.social}>
      <span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a href="#" className="fa fa-facebook-official mute-link" />
        </span>
        <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
          <a target="_blank" href={shareTwitter} className="fa fa-twitter mute-link" />
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
