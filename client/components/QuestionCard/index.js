import { Card, Columns, CardContent } from 're-bulma';
import Social from './Social';
import Answer from './Answer';
import Header from './Header';
import Action from './Action';
import style from './style';

export default function QuestionCard(props) {
  const content = props.answer;
  return (
    <Card isFullwidth style={style.question}>
      <CardContent>
        <Header {...props} noAnswer={!content} />
        {content &&
          <Answer content={content}/>
        }
        <Columns>
          <Action
            noAnswer={!content}
            {...props}
            editing={props.editing}
          />
          <Social
            id={props.id}
            content={props.content}
            share={props.shareQuestion}
            tooltip={props.tooltip}
            openTooltip={props.openTooltip}
            toggleQuestionModal={props.toggleQuestionModal}
            author_id={props.author_id}
          />
        </Columns>
      </CardContent>
    </Card>
  );
}
