import React from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import Message from '../client/components/Message/MessagePage';
import Bulma from '../client/components/Bulma';
import { initStore, getConversations } from '../client/store';

const SOCKET_URI = process.env.API_URI;

class MessagePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      socketURI: null
    };
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  componentWillMount() {
    if (SOCKET_URI) {
      this.setState({ socketURI: SOCKET_URI });
    }
    if (this.props.conversations.length > 0) {
      this.props.getConversations();
    }
  }

  componentDidMount() {
    if (this.state.socketURI) {
      window.localStorage.setItem('socketURI', this.state.socketURI);
    }
    this.props.getConversations();
  }

  checkAuthStatus(loggedIn) {
    if (loggedIn) {
      return this.setState({ isLoggedIn: true });
    }
    return this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <Bulma>
        <Message  conversations={this.props.conversations} updatedConversation={this.props.updatedConversation} />
      </Bulma>
    );
  }

}

function mapStateToProps({ message}) {
  return {
    conversations: message.conversations,
    updatedConversation: message.updatedConversation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getConversations: bindActionCreators(getConversations, dispatch)
  };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MessagePage);
