import Notifications from '../../client/components/Settings/Notifications';
import Bulma from '../../client/components/Bulma';

class NotificationsSettingsPage extends React.Component {

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
        <Notifications />
      </Bulma>
    );
  }

}

export default NotificationsSettingsPage;
