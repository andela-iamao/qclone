import { Column, Button } from 're-bulma';
import { getUserId } from '../../util/auth';

export default function Action(props) {
  const passed = props.passedQuestions.indexOf(props.id) > -1;
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
          <Button color="isPrimary">Answer <i className="fa fa-pencil"/></Button>
          <Button style={{ marginLeft: 10 }} onClick={() => props.passQuestion(props.id)}>Pass</Button>
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
