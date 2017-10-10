import ReplyMessage from './ReplyMessage';

export default function MessageThread(props) {
  return (
    <div className="message-thread-container">
      <div className="message-thread-header">
        {props.conversation && <a href="#">Larry Dixon</a> }
      </div>
      <div className="message-thread-content">
        {!props.conversation ?
          <div className="message-thread-content-empty">
            No Message Thread Selected
          </div>
          :
          <div >
            <div className="message-thread-content-all-messages">
              <div className="message-thread-content-all-messages-message">
                <div className="message-thread-content-all-messages-message-avatar">
                  <img src="https://qph.ec.quoracdn.net/main-thumb-25959888-100-ryvqajpwwlqfquyjwobcooapbkpdcoyc.jpeg" />
                </div>
                <div className="message-thread-content-all-messages-message-user">
                  <div className="message-thread-content-all-messages-message-user-info">
                    <div className="message-thread-content-all-messages-message-user-info-name">
                      <a href="#" className="header-link">Ash Amao</a>
                    </div>
                    <div className="message-thread-content-all-messages-message-user-date">
                      <span className="mute-link">63 min ago</span>
                    </div>
                  </div>
                  <div className="message-thread-content-all-messages-message-user-message">
                    Hello
                  </div>
                </div>
              </div>

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
