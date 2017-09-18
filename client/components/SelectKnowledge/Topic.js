import { Columns, Column } from 're-bulma';
import style from './style';
export default function Topic(props) {
  return (
    <div style={style.topicBox}>
      <Columns>
        <Column size="is2">
          <img src={props.image} style={style.topicIcon}/>
        </Column>
        <Column size="is9">
          <h4>{props.title}</h4>
        </Column>
        <Column>
          <h4 className="fa fa-close pointer" onClick={() => props.onRemove(props.id)}/>
        </Column>
      </Columns>
    </div>
  );
}
