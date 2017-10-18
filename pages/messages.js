import React from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import Message from '../client/components/Message/MessagePage';
import Bulma from '../client/components/Bulma';
import { initStore, getConversations } from '../client/store';

class MessagePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null
    };
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  componentDidMount() {
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
        <Message conversations={this.props.conversations} updatedConversation={this.props.updatedConversation} />
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
