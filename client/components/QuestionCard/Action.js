import { Column, Button } from 're-bulma';
import { getUserId } from '../../util/auth';

export default function Action(props) {
  let passed = false;
  if (props.passedQuestions) {
    passed = props.noPass ? false : props.passedQuestions.indexOf(props.id) > -1;
  }
  if (passed) {
    return (
      <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
        <a href="#" className="mute-link">Downvote</a>
      </span>
    );
  }
  return (
    <Column size="is8">
      {props.noAnswer ?
        <span>
          {!props.removeAnswer &&
            <a href="#" className="Button WriteAnswer" onClick={() => props.toggleAnswer(props.id)}>
              <span>{(!props.ownAnswer || !props.ownAnswer.id) || props.editing.length < 3 ?
                'Answer': 'Edit Draft'
              }</span>
            </a>
          }
          {!props.noPass &&
            <Button style={{ marginLeft: 10 }} onClick={() => props.passQuestion(props.id)}>Pass</Button>
          }
          <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
            <a onClick={() => props.handleFollowQuestion(props.id)} className="mute-link">
              {props.followers.indexOf(getUserId()) > -1 ? 'Following' : 'Follow'}
            </a>
          </span>
        </span>
        :
        <Button color="isPrimary">Upvote</Button>
      }
      <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
        <a href="#" className="mute-link">Downvote</a>
      </span>
    </Column>
  );
}
