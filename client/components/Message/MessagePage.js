import { Column, Notification } from 're-bulma';

import CreateMessage from './CreateMessage';
import MessageList from './MessageList';
import MessageThread from './MessageThread';

import Layout from '../Layout';

export default class MessagePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      thread: false,
      active: false,
      messageModal: false,
      newMessage: {
        receiver: null,
        message: null
      },
      search: {
        query: '',
        result: []
      },
      notification: {
        show: true,
        message: 'Your message has been sent'
      },
      conversation: null
    };

    this.handleSelectReceiver = this.handleSelectReceiver.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    this.setState({ active: true });
  }

  toggleMessageModal() {
    this.setState({ messageModal: !this.state.messageModal });
  }

  showNotification(message, delay = 2500) {
    if (!this.state.notification.show) {
      setTimeout(() => {
        this.setState({ notification: { message: '', show: false }});
      }, delay);
      return this.setState({ notification: { message, show: true }});
    }
    return this.setState({ notification: { message: '', show: false } });
  }

  handleSearchInput({ target: { value }}) {
    this.setState({ search: { ...this.state.search, query: value }});
  }

  handleSelectReceiver(receiver) {
    this.setState({
      newMessage: { ...this.state.newMessage, receiver },
      search: { query: '', result: [] }
    });
  }

  handleEditReceiver() {
    this.setState({ newMessage: { ...this.state.newMessage, receiver: null } });
  }

  handleMessageInput({ target: { value }}) {
    this.setState({ newMessage: { ...this.state.newMessage, message: value }});
  }

  handleSelectConversation(conversation, partner) {
    this.setState({
      newMessage: { ...this.state.newMessage, receiver: partner },
      conversation: {}
    });
  }

  async handleSendMessage() {

  }

  render() {
    if (!this.state.active) {
      return <div />;
    }

    return (
      <Layout isAuth>
        <Column style={{ backgroundColor: '#fafafa', height: '98vh', maxHeight: '98vh', overflowY: 'scroll' }}>
          <Column size="is9" style={{ margin: 'auto', position: 'relative' }}>
            <div className="message-container">
              <MessageList
                toggleMessageModal={this.toggleMessageModal.bind(this)}
              />
              <MessageThread
                conversation={this.state.conversation}
                newMessage={this.state.newMessage}
                handleMessageInput={this.handleMessageInput.bind(this)}
                SendMessage={this.handleSendMessage.bind(this)}
              />
            </div>
            <CreateMessage
              searchResult={this.state.search.result}
              handleSearchInput={this.handleSearchInput.bind(this)}
              toggleMessageModal={this.toggleMessageModal.bind(this)}
              messageModal={this.state.messageModal}
              newMessage={this.state.newMessage}
              handleSelectReceiver={this.handleSelectReceiver}
              handleMessageInput={this.handleMessageInput.bind(this)}
              handleEditReceiver={this.handleEditReceiver.bind(this)}
              SendMessage={this.handleSendMessage.bind(this)}
              modal
            />
            {this.state.notification.show &&
              <div className="message-notification-container">
                <Notification
                  color="isWarning"
                  closeButtonProps={{ onClick: () => this.showNotification('') }}
                  style={{ marginBottom: '5px' }}
                  enableCloseButton
                >
                  {this.state.notification.message}
                </Notification>
              </div>
            }
          </Column>
        </Column>
      </Layout>
    );
  }
}
