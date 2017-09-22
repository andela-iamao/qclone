import { Column } from 're-bulma';

export default function Feeds() {
  return (
    <Column size="is3">
      <h3>Feeds</h3>
      <hr />
      <ul className="profile-feeds-list">
        <li className="active">Answers 0</li>
        <li>Questions 4</li>
        <li>Activity</li>
        <li>Posts 0</li>
        <li>Blogs 1</li>
        <li>Followers 1</li>
        <li>Following 2</li>
        <li>Topics 19</li>
        <li>Edits 24</li>
      </ul>
    </Column>
  );
}
