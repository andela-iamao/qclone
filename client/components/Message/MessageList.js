import { Button } from 're-bulma';

export default function MessageList(props) {
  return (
    <div className="message-list-container">
      <div className="message-list-header">
        <div className="message-list-header-title">
          <span>Messages</span>
        </div>
        <div className="message-list-header-action">
          <Button color="isPrimary" onClick={props.toggleMessageModal}>New Message</Button>
        </div>
      </div>
      <div className="message-list-content">
        <div className="message-list-content-message message-list-content-message-active">
          <div className="message-list-content-message-avatar">
            <img src="https://qph.ec.quoracdn.net/main-thumb-25959888-100-ryvqajpwwlqfquyjwobcooapbkpdcoyc.jpeg" />
          </div>
          <div className="message-list-content-message-user">
            <div className="message-list-content-message-user-name">
              <span className="message-list-content-message-user-name-bold">Ash Amao</span>
              <span className="mute-link">Just Now</span>
            </div>
            <div className="message-list-content-message-user-message">
              Leonard Norman Cohen CC GOQ (September 21, 1934 – November 7, 2016) was a Canadian singer, songwriter, musician, poet, novelist, and painter. His work explored religion, politics, isolation, sexuality, and personal relationships.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
