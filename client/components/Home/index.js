import _ from 'lodash';
import { Column } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Layout from '../Layout';
import CreateQuestion from '../CreateQuestion';
import QuestionCard from '../QuestionCard';
import style from './style';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';

const QUERY_LOGGED_IN_USER = GraphQL.QUERY_LOGGED_IN_USER(['id', 'firstname', 'lastname']);
const MUTATION_CREATE_QUESTION = GraphQL.MUTATION_CREATE_QUESTION(['id', 'author', 'content']);
const QUERY_PERSONAL_QUESTIONS = GraphQL.QUERY_PERSONAL_QUESTIONS(['id', 'author', 'content', 'followers']);
const MUTATION_FOLLOW_QUESTION = GraphQL.MUTATION_FOLLOW_QUESTION(['id', 'author', 'content', 'followers']);
const MUTATION_PASS_QUESTION = GraphQL.MUTATION_PASS_QUESTION(['id', 'passed_question']);
const MUTATION_TWEET_QUESTION = GraphQL.MUTATION_TWEET_QUESTION();

class Home extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      question: '',
      askingQuestion: false,
      openModal: false,
      passedQuestions: []
    };
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.toggleQuestioModal = this.toggleQuestioModal.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.handleFollowQuestion = this.handleFollowQuestion.bind(this);
    this.passQuestion = this.passQuestion.bind(this);
    this.tweetQuestion = this.tweetQuestion.bind(this);
  }

  handleQuestionInput(event) {
    const { value } = event.target;
    this.setState({ question: _.upperFirst(value)});
  }

  async handleCreateQuestion() {
    const { authUser: { getLoggedInUser: { firstname, lastname } } } = this.props;
    const { question: content } = this.state;
    const fullname = `${firstname} ${lastname}`;
    this.setState({ askingQuestion: true });
    try {
      const result = await this.props.createQuestion({
        variables: {
          content,
          author: fullname
        }
      });
      this.setState({ askingQuestion: false });
      this.toggleQuestioModal();
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  async handleFollowQuestion(id) {
    try {
      const result = await this.props.followQuestion({
        variables: {
          id
        }
      });
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  toggleQuestioModal() {
    this.setState({ openModal: !this.state.openModal });
  }

  async passQuestion(id) {
    try {
      const result = await this.props.passQuestion({
        variables: {
          id
        }
      });
      console.info(result);
      this.setState({ passedQuestions: result.data.passQuestion.passed_question });
    } catch(error) {
      console.info(error);
    }
  }

  async tweetQuestion(id) {
    try {
      const result = await this.props.tweetQuestion({
        variables: {
          id
        }
      });
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    const { authUser: { getLoggedInUser }, timeline: { getPersonalQuestions: questions } } = this.props;
    const { question, openModal, askingQuestion, passedQuestions } = this.state;
    const fullname = getLoggedInUser ? `${getLoggedInUser.firstname} ${getLoggedInUser.lastname}` : '';
    return (
      <Layout isAuth router={this.props.route}>
        <Column style={style.homeCol}>
          {getLoggedInUser &&
            <Column style={style.timeline} size="is5">
              <CreateQuestion
                username={fullname}
                handleQuestionInput={this.handleQuestionInput}
                question={question}
                toggleQuestioModal={this.toggleQuestioModal}
                openModal={openModal}
                askingQuestion={askingQuestion}
                handleCreateQuestion={this.handleCreateQuestion}
              />
              <br />
              {questions && questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  {...q}
                  handleFollowQuestion={this.handleFollowQuestion}
                  passQuestion={this.passQuestion}
                  passedQuestions={passedQuestions}
                  tweetQuestion={this.tweetQuestion}
                />
              ))}
            </Column>
          }
        </Column>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_LOGGED_IN_USER, { name: 'authUser' }),
  graphql(MUTATION_CREATE_QUESTION, { name: 'createQuestion' }),
  graphql(MUTATION_FOLLOW_QUESTION, { name: 'followQuestion' }),
  graphql(MUTATION_PASS_QUESTION, { name: 'passQuestion' }),
  graphql(MUTATION_TWEET_QUESTION, { name: 'tweetQuestion' }),
  graphql(QUERY_PERSONAL_QUESTIONS, { name: 'timeline' })
)(Home));
