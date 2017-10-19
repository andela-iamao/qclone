import React from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../client/store';
import Auth from '../client/components/Auth';
import Home from '../client/components/Home';
import Bulma from '../client/components/Bulma';

const SOCKET_URI = process.env.API_URI;

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null
    };
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  componentWillMount() {
    if (SOCKET_URI) {
      this.setState({ socketURI: SOCKET_URI });
    }
  }

  componentDidMount() {
    if (this.state.socketURI) {
      window.localStorage.setItem('socketURI', this.state.socketURI);
    }
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
        {this.state.isLoggedIn ?
          <Home route={this.props.url}/>
          :
          <Auth checkAuthStatus={this.checkAuthStatus}/>
        }
      </Bulma>
    );
  }

}

export default withRedux(initStore, null, null)(IndexPage);
