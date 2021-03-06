import { Button, Textarea } from 're-bulma';

export default function ReplyMessage(props) {
  return (
    <div className="message-reply-message-box">
      <div className="message-reply-message-box-avatar">
        <img src={props.user.profile_photo} />
      </div>
      <div className="message-reply-message-textarea">
        <div>
          <Textarea
            color="isInfo"
            value={props.newMessage.message}
            placeholder="Type a message..."
            onChange={props.handleMessageInput}
          />
        </div>
        <div style={{ marginTop: 10, textAlign: 'right', width: '100%' }} >
          <Button
            onClick={props.sendMessage}
            color="isPrimary"
            state={props.newMessage.receiver ? 'isActive' : 'isDisabled'}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
