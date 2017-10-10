import { Column, Button, Modal, Input, Textarea } from 're-bulma';

export default function CreateMessage(props) {
  return (
    <Modal
      type="card"
      headerContent="Compose Message"
      footerContent={
        <div style={{ padding: '20px', textAlign: 'right', width: '100%' }} >
          <a style={{ lineHeight: '1.8em', marginRight: 10 }} className="mute-link" onClick={props.toggleMessageModal}>Cancel</a>
          <Button
            onClick={props.sendMessage}
            color="isPrimary"
            state={props.newMessage.receiver ? 'isActive' : 'isDisabled'}
          >
            Send
          </Button>
        </div>
      }
      isActive={props.messageModal}
      onCloseRequest={props.toggleMessageModal}
    >
      <Column>
        <div className="message-list-create-reciever">
          <span>To: </span>
          {props.newMessage.receiver ?
            <div className="message-list-create-reciever-selected">
              <div className="message-list-create-reciever-selected-avatar">
                <img src="https://qph.ec.quoracdn.net/main-thumb-25959888-100-ryvqajpwwlqfquyjwobcooapbkpdcoyc.jpeg" />
              </div>
              <div className="message-list-create-reciever-selected-info">
                <span><a href="">Larry Dixon</a><span>, Fantasy&SF writer, artist, designer, editor, falconer, SpFX guy, race driver, former firefighter.</span></span>
                <br />
                <a href="#" className="mute-link" onClick={props.handleEditReceiver}>Edit</a>
              </div>
            </div>
            :
            <div >
              <Input placeholder="Find People" style={{ marginBottom: 0 }}/>
              <div className="message-list-create-search-box">
                {props.searchResult.length > 0 &&
                  <div className="message-list-create-search-results">
                    <div className="message-list-create-search-result-one" onClick={() => props.handleSelectReceiver({})}>
                      <div className="message-list-create-search-result-one-info">
                        <div className="message-list-create-search-result-one-info-name">Larry Dixon</div>
                        <div className="message-list-create-search-result-one-credential">
                          Fantasy&SF writer, artist, designer, editor, falconer, SpFX guy, race driver, former firefighter.
                        </div>
                      </div>
                      <div className="message-list-create-search-result-one-avatar">
                        <img src="https://qph.ec.quoracdn.net/main-thumb-25959888-100-ryvqajpwwlqfquyjwobcooapbkpdcoyc.jpeg"/>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
        <div>
          <br/>
          <Textarea
            color="isInfo"
            placeholder="Type a message..."
            onChange={props.handleMessageInput}
          />
        </div>

      </Column>
    </Modal>
  );
}
