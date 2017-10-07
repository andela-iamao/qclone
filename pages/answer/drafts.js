import React from 'react';
import Drafts from '../../client/components/Answer/AnswerPage/Drafts';
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
        <Drafts />
      </Bulma>
    );
  }

}

export default AnswerPage;
