import Profile from '../client/components/Profile';
import Bulma from '../client/components/Bulma';

class ProfilePage extends React.Component {

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
    console.log(this.props);
    return (
      <Bulma>
        <Profile id={this.props.url.query.id} />
      </Bulma>
    );
  }

}

export default ProfilePage;
