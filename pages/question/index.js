import React from 'react';
import Fullscreen from '../../client/components/FullScreen';
import Auth from '../../client/components/Auth';
import Question from '../../client/components/Question';
import Bulma from '../../client/components/Bulma';

const bg = {
  background: 'url("http://qsf.ec.quoracdn.net/-3-images.home.illo_1920.png-26-c2ec7e7800f647b8.png")',
  backgroundSize: 'cover'
};

class QuestionPage extends React.Component {

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
        <Question id={this.props.url.query.id}/>
      </Bulma>
    );
  }

}

export default QuestionPage;
