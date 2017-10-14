import { Button } from 're-bulma';
import moment from 'moment';

export default function MessageList(props) {
  const target = (conversation) => props.user === conversation.starter._id ? conversation.target : conversation.starter;
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
      {props.allConversations.length > 0 &&
        <div className="message-list-content">
          {props.allConversations.map((conversation) => (
            <div
              onClick={() => props.handleSelectConversation(conversation, target(conversation))} key={conversation._id}
              className={`message-list-content-message ${conversation._id === props.conversation._id && 'message-list-content-message-active'}`}>
              <div className="message-list-content-message-avatar">
                <img src={target(conversation).profile_photo} />
              </div>
              <div className="message-list-content-message-user">
                <div className="message-list-content-message-user-name">
                  <span className="message-list-content-message-user-name-bold">
                    {target(conversation).firstname} {target(conversation).lastname}
                  </span>
                  <span className="mute-link">{moment(conversation.messages[conversation.messages.length - 1].created_at).fromNow()}</span>
                </div>
                <div className="message-list-content-message-user-message">
                  {conversation.messages[conversation.messages.length - 1].message}
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
