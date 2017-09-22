import { Icon, Column } from 're-bulma';

export default function Knowledge(props) {
  return (
    <Column>
      <h3>Knows About <span className="profile-mute-text profile-text-right" onClick={() => props.toggleCredentialAddModal('knowledge')}>Edit</span></h3>
      <hr />
      <Column>
        <div className="profile-no-knowledge-box" onClick={() => props.toggleCredentialAddModal('knowledge')}>
          <Icon icon="fa fa-plus-circle" size="isLarge" /><br />
          <span>What topics do you know about?</span>
        </div>
      </Column>
    </Column>
  );
}
