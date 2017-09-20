import React from 'react';
import AnswerFull from '../../client/components/Answer/AnswerFull';
import Bulma from '../../client/components/Bulma';

class UsersAnswerPage extends React.Component {

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
    const { url } = this.props;
    return (
      <Bulma>
        <AnswerFull
          query={{ answer: url.query.answerId, question: url.query.questionId }} />
      </Bulma>
    );
  }

}

export default UsersAnswerPage;
