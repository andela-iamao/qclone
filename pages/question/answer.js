import React from 'react';
import Answer from '../../client/components/Answer/AnswerFull';
import Bulma from '../../client/components/Bulma';

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
        <Answer query={{ answer: this.props.url.query.answerId, question: this.props.url.query.questionId }} />
      </Bulma>
    );
  }

}

export default QuestionPage;
