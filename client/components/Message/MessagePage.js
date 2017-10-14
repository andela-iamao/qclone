import io from 'socket.io-client';
import { Column, Notification } from 're-bulma';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateMessage from './CreateMessage';
import MessageList from './MessageList';
import MessageThread from './MessageThread';

import query from './query';
import requests from './requests';

import Layout from '../Layout';

import { getConversations } from '../../store';

import withData from '../../../apollo/withData';

class MessagePage extends React.Component {
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
        show: false,
        message: 'Your message has been sent'
      },
      conversation: null,
      allConversations: props.conversations
    };

    this.handleSelectReceiver = this.handleSelectReceiver.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.handleSelectConversation = this.handleSelectConversation.bind(this);
    this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
  }

  async componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', this.handleReceiveMessage);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.conversations.length > props.conversations.length) {
      this.setState({ allConversations: [...nextProps.conversations] });
    }
    if(nextProps.authUser !== props.authUser) {
      this.setState({ active: true });
    }
  }

  componentWillUnmount() {
    this.socket.close();
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
    this.handleSearchUser(value);
  }

  handleSelectReceiver(receiver) {
    this.setState({
      newMessage: { ...this.state.newMessage, receiver },
      search: { query: '', result: [] }
    });
  }

  handleEditReceiver() {
    this.setState({ newMessage: { ...this.state.newMessage, receiver: null }, conversation: null });
  }

  handleMessageInput({ target: { value }}) {
    this.setState({ newMessage: { ...this.state.newMessage, message: value }});
  }

  handleSelectConversation(conversation, partner) {
    this.setState({
      newMessage: { ...this.state.newMessage, receiver: partner },
      conversation
    });
  }

  async handleReceiveMessage(message) {
    const { conversation, allConversations } = this.state;
    const { conversations } = await requests.getConversations();

    if (!allConversations.map((c) => c.id).includes(message.conversation)) {
      this.setState({
        allConversations: conversations,
      });
    }
    if (conversation && conversation._id === message.conversation) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.conversation.messages.push(message);
        return newState;
      });
    }
  }

  async handleSendMessage() {
    const { newMessage, allConversations, messageModal, conversation } = this.state;
    const {message} = await requests.sendMessage({
      message: newMessage.message,
      receiver: newMessage.receiver.id || newMessage.receiver._id
    });
    this.showNotification('Your message has been sent');
    if(messageModal) {
      this.toggleMessageModal();
    }

    const { conversations } = await requests.getConversations();

    if (!allConversations.map((c) => c.id).includes(message.conversation)) {
      this.setState({
        allConversations: conversations,
      });
    }
    if (conversation && conversation._id === message.conversation) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.conversation.messages.push(message);
        return newState;
      });
    }

    this.socket.emit('message', message);

    this.setState({
      newMessage: { receiver: newMessage.receiver, message: ''},
      conversation: conversations.filter((c) => c._id === message.conversation)[0],
    });
  }

  async handleSearchUser(query) {
    try {
      const result = await this.props.searchUser({
        variables: {
          query
        }
      });
      this.setState({ search: { query, result: result.data.searchUser } });
    } catch(error) {
      console.error(error);
    }
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
                allConversations={this.state.allConversations}
                user={this.props.authUser.getLoggedInUser.id}
                handleSelectConversation={this.handleSelectConversation}
                conversation={this.state.conversation || {}}
              />
              <MessageThread
                conversation={this.state.conversation}
                newMessage={this.state.newMessage}
                handleMessageInput={this.handleMessageInput.bind(this)}
                sendMessage={this.handleSendMessage.bind(this)}
                user={this.props.authUser.getLoggedInUser}
              />
            </div>
            <CreateMessage
              searchResult={this.state.search.result}
              searchQuery={this.state.search.query}
              handleSearchInput={this.handleSearchInput.bind(this)}
              toggleMessageModal={this.toggleMessageModal.bind(this)}
              messageModal={this.state.messageModal}
              newMessage={this.state.newMessage}
              handleSelectReceiver={this.handleSelectReceiver}
              handleMessageInput={this.handleMessageInput.bind(this)}
              handleEditReceiver={this.handleEditReceiver.bind(this)}
              sendMessage={this.handleSendMessage.bind(this)}
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

function mapDispatchToProps(dispatch) {
  return {
    getConversations: bindActionCreators(getConversations, dispatch)
  };
}

export default withData(compose(
  graphql(query.MUTATION_SEARCH_USERS, { name: 'searchUser' }),
  graphql(query.QUERY_LOGGED_IN_USER, { name: 'authUser' }),
)(connect(null, mapDispatchToProps)(MessagePage)));
