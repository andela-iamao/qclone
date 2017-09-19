import _ from 'lodash';
import { Column } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Layout from '../Layout';
import CreateQuestion from '../CreateQuestion';
import QuestionCard from '../QuestionCard';
import AnswerDock from '../Answer/AnswerDock';
import style from './style';
import helper, { toObj } from './helper';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';

const QUERY_LOGGED_IN_USER = GraphQL.QUERY_LOGGED_IN_USER(['id', 'firstname', 'lastname']);
const MUTATION_CREATE_QUESTION = GraphQL.MUTATION_CREATE_QUESTION(['id', 'author', 'content']);
const MUTATION_UPDATE_QUESTION = GraphQL.MUTATION_UPDATE_QUESTION(['id', 'author', 'content']);
const QUERY_PERSONAL_QUESTIONS = GraphQL.QUERY_PERSONAL_QUESTIONS(['id', 'author', 'content', 'followers', 'author_id']);
const MUTATION_FOLLOW_QUESTION = GraphQL.MUTATION_FOLLOW_QUESTION(['id', 'author', 'content', 'followers', 'author_id']);
const MUTATION_PASS_QUESTION = GraphQL.MUTATION_PASS_QUESTION(['id', 'passed_question']);
const MUTATION_SHARE_QUESTION = GraphQL.MUTATION_SHARE_QUESTION();

class Home extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      question: '',
      drafts: {},
      askingQuestion: false,
      openModal: false,
      passedQuestions: [],
      tooltip: '',
      isEditing: false
    };
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.toggleQuestionModal = this.toggleQuestionModal.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.handleFollowQuestion = this.handleFollowQuestion.bind(this);
    this.passQuestion = this.passQuestion.bind(this);
    this.shareQuestion = this.shareQuestion.bind(this);
    this.openTooltip = this.openTooltip.bind(this);
    this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
  }

  componentWillMount() {
    if(this.props.timeline.getPersonalQuestions) {
      this.setState({ drafts: toObj(this.props.timeline.getPersonalQuestions) });
    }
  }

  componentDidMount() {
    helper(this.openTooltip);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timeline.getPersonalQuestions !== this.props.timeline.getPersonalQuestions) {
      this.setState({ drafts: toObj(nextProps.timeline.getPersonalQuestions) });
    }
  }

  handleQuestionInput(event) {
    const { value } = event.target;
    this.setState({ question: _.upperFirst(value)});
  }

  handleAnswerChange (html) {
    this.setState({ answer: html });
  }

  toggleAnswer(question) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.drafts[question].open = !prevState.drafts[question].open;
      return newState;
    });
  }

  async handleFollowQuestion(id) {
    try {
      const result = await this.props.followQuestion({ variables: { id } });
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  async toggleQuestionModal(question={}) {
    await this.setState({ question: '' });
    if (question.content) {
      return this.setState({
        question: question.content,
        openModal: !this.state.openModal,
        isEditing: question.id
      });
    }
    return this.setState({ openModal: !this.state.openModal, isEditing: false });
  }

  openTooltip(id) {
    return this.setState({ tooltip: id || false });
  }

  async passQuestion(id) {
    try {
      const result = await this.props.passQuestion({ variables: { id } });
      console.info(result);
      this.setState({ passedQuestions: result.data.passQuestion.passed_question });
    } catch(error) {
      console.info(error);
    }
  }

  async shareQuestion(id, social) {
    try {
      const result = await this.props.shareQuestion({ variables: { id, social } });
      console.info(result);
    } catch(error) {
      console.info(error);
    }
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
      this.setState({ askingQuestion: false, question: '' });
      this.toggleQuestionModal();
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  async handleUpdateQuestion() {
    const { question: content, isEditing: id } = this.state;
    this.setState({ askingQuestion: true });
    try {
      const result = await this.props.updateQuestion({
        variables: {
          id,
          content
        }
      });
      this.setState({ askingQuestion: false, question: '' });
      this.toggleQuestionModal();
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    const { authUser: { getLoggedInUser }, timeline: { getPersonalQuestions: questions } } = this.props;
    const { question, openModal, askingQuestion, passedQuestions, tooltip, isEditing, drafts } = this.state;
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
                toggleQuestioModal={this.toggleQuestionModal}
                openModal={openModal}
                askingQuestion={askingQuestion}
                handleCreateQuestion={this.handleCreateQuestion}
                isEditing={isEditing}
                handleUpdateQuestion={this.handleUpdateQuestion}
              />
              <br />
              {questions && questions.map((q) => (
                <div key={q.id}>
                  <QuestionCard
                    {...q}
                    handleFollowQuestion={this.handleFollowQuestion}
                    passQuestion={this.passQuestion}
                    passedQuestions={passedQuestions}
                    shareQuestion={this.shareQuestion}
                    openTooltip={this.openTooltip}
                    tooltip={tooltip}
                    toggleQuestionModal={this.toggleQuestionModal}
                    toggleAnswer={this.toggleAnswer}
                  />
                  {drafts[q.id].open &&
                    <AnswerDock
                      id={q.id}
                      handleAnswerChange={this.handleAnswerChange}
                      openTooltip={this.openTooltip}
                      tooltip={tooltip}
                    />
                  }
                </div>
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
  graphql(MUTATION_UPDATE_QUESTION, { name: 'updateQuestion' }),
  graphql(MUTATION_FOLLOW_QUESTION, { name: 'followQuestion' }),
  graphql(MUTATION_PASS_QUESTION, { name: 'passQuestion' }),
  graphql(MUTATION_SHARE_QUESTION, { name: 'shareQuestion' }),
  graphql(QUERY_PERSONAL_QUESTIONS, { name: 'timeline' })
)(Home));
