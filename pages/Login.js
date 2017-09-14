import React from 'react';
import { graphql, compose } from 'react-apollo';
import Layout from '../client/components/Layout';
import SelectInterests from '../client/components/SelectInterest';
import Fullscreen from '../client/components/FullScreen';
import Auth from '../client/components/Auth';
import Home from '../client/components/Home';
import Bulma from '../client/components/Bulma';
import GraphQL from '../client/GraphQL';
import withData from '../apollo/withData';

const bg = {
  background: 'url("http://qsf.ec.quoracdn.net/-3-images.home.illo_1920.png-26-c2ec7e7800f647b8.png")',
  backgroundSize: 'cover'
};

class LoginPage extends React.Component {

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
    // const { display } = this.state;
    return (
      <Bulma>
        <Fullscreen bg={bg}>
          {this.state.isLoggedIn ?
            <Home />
            :
            <Auth checkAuthStatus={this.checkAuthStatus}/>
          }
        </Fullscreen>
      </Bulma>
    );
  }

}

// export default withData(compose(
//   graphql(QUERY_LOGGED_IN_USER, { name: 'authUser' })
// )(LoginPage));
export default LoginPage;
