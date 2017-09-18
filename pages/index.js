import React from 'react';
import Fullscreen from '../client/components/FullScreen';
import Auth from '../client/components/Auth';
import Home from '../client/components/Home';
import Bulma from '../client/components/Bulma';

const bg = {
  background: 'url("http://qsf.ec.quoracdn.net/-3-images.home.illo_1920.png-26-c2ec7e7800f647b8.png")',
  backgroundSize: 'cover'
};

class IndexPage extends React.Component {

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
        {this.state.isLoggedIn ?
          <Home route={this.props.url}/>
          :
          <Fullscreen bg={bg}>
            <Auth checkAuthStatus={this.checkAuthStatus}/>
          </Fullscreen>
        }
      </Bulma>
    );
  }

}

export default IndexPage;
