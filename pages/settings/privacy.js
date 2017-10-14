import Privacy from '../../client/components/Settings/Privacy';
import Bulma from '../../client/components/Bulma';

class PrivacyPage extends React.Component {

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
        <Privacy />
      </Bulma>
    );
  }

}

export default PrivacyPage;
