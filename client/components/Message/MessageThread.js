import moment from 'moment';

import ReplyMessage from './ReplyMessage';

export default function MessageThread(props) {
  const partner = props.newMessage.receiver;
  const sender = (id) => id === partner._id ? partner : props.user;
  return (
    <div className="message-thread-container">
      <div className="message-thread-header">
        {props.conversation && <a href="#">
          {partner.firstname} {partner.lastname}
        </a> }
      </div>
      <div className="message-thread-content">
        {!props.conversation ?
          <div className="message-thread-content-empty">
            No Message Thread Selected
          </div>
          :
          <div >
            <div className="message-thread-content-all-messages">
              {props.conversation.messages.map((message) => (
                <div key={message._id} className="message-thread-content-all-messages-message">
                  <div className="message-thread-content-all-messages-message-avatar">
                    <img src={sender(message.sender).profile_photo} />
                  </div>
                  <div className="message-thread-content-all-messages-message-user">
                    <div className="message-thread-content-all-messages-message-user-info">
                      <div className="message-thread-content-all-messages-message-user-info-name">
                        <a href="#" className="header-link">
                          {sender(message.sender).firstname} {sender(message.sender).lastname}
                        </a>
                      </div>
                      <div className="message-thread-content-all-messages-message-user-date">
                        <span className="mute-link">
                          {moment(message.created_at).fromNow()}
                        </span>
                      </div>
                    </div>
                    <div className="message-thread-content-all-messages-message-user-message">
                      {message.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#F9F9F9' }}>
              <ReplyMessage {...props}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
