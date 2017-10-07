import React from 'react';
import AnswerRequest from '../../client/components/Answer/AnswerPage/AnswerRequest';
import Bulma from '../../client/components/Bulma';

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
        <AnswerRequest />
      </Bulma>
    );
  }

}

export default AnswerPage;
