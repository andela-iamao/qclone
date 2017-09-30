import { Column } from 're-bulma';

export default function Feeds(props) {
  return (
    <Column size="is3">
      <h3 style={{ marginTop: 0 }}>Feeds</h3>
      <hr />
      <ul className="profile-feeds-list">
        <li className={props.activeFeed === 'answers' ? 'active' : ''} onClick={() => props.changeFeed('answers')}>Answers {props.answers}</li>
        <li className={props.activeFeed === 'questions' ? 'active' : ''} onClick={() => props.changeFeed('questions')}>Questions {props.questions}</li>
        <li className={props.activeFeed === 'activity' ? 'active' : ''} onClick={() => props.changeFeed('activity')}>Activity</li>
        <li className={props.activeFeed === 'followers' ? 'active' : ''} onClick={() => props.changeFeed('followers')}>Followers {props.followers}</li>
        <li className={props.activeFeed === 'following' ? 'active' : ''} onClick={() => props.changeFeed('following')}>Following {props.following}</li>
        <li className={props.activeFeed === 'topics' ? 'active' : ''} onClick={() => props.changeFeed('topics')}>Topics {props.topics.length}</li>
        <li className={props.activeFeed === 'edits' ? 'active' : ''} onClick={() => props.changeFeed('edits')}>Edits 24</li>
      </ul>
    </Column>
  );
}
