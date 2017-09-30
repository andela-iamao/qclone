import Settings from '../client/components/Settings';
import Bulma from '../client/components/Bulma';

class SettingsPage extends React.Component {

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
        <Settings id={this.props.url.query.id} />
      </Bulma>
    );
  }

}

export default SettingsPage;
