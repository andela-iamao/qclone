import { Columns, Column, Input } from 're-bulma';
import style from '../style';

export default function Comment() {
  return (
    <Columns style={style.answerFull.comment}>
      <Column size="is1">
        <img style={style.answerFull.commentAvatar} src="https://qph.ec.quoracdn.net/main-thumb-138684411-50-wtqmfujaumbklivtgndzihiqhpwfkhrs.jpeg" />
      </Column>
      <Column size="is8">
        <Input placeholder="Add a comment..."/>
      </Column>
      <Column size="is3" style={style.answerFull.commentThird}>
        <p>
          <b>Recommended  All</b>
        </p>
      </Column>
    </Columns>
  );
}
