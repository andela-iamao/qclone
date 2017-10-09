import React from 'react';
import Notification from '../../client/components/Notification/NotificationFilterPage';
import Bulma from '../../client/components/Bulma';

class NotificationPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null
    };
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
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
        <Notification page="request" />
      </Bulma>
    );
  }

}

export default NotificationPage;
