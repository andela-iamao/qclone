import React from 'react';
import Answer from '../client/components/Answer/AnswerPage';
import Bulma from '../client/components/Bulma';

class AnswerPage extends React.Component {

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
        <Answer />
      </Bulma>
    );
  }

}

export default AnswerPage;
