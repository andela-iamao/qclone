import { Card, Columns, CardContent } from 're-bulma';
import Social from './Social';
import Answer from './Answer';
import Header from './Header';
import Action from './Action';
import style from './style';

export default function QuestionCard(props) {
  const content = null;
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
          />
          <Social content={props.content} />
        </Columns>
      </CardContent>
    </Card>
  );
}
