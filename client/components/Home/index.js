import _ from 'lodash';
import { Column, Columns } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Layout from '../Layout';
import CreateQuestion from '../CreateQuestion';
import QuestionCard from '../QuestionCard';
import AnswerDock from '../Answer/AnswerDock';
import style from './style';
import helper, { toObj } from './helper';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';

const QUERY_LOGGED_IN_USER = GraphQL.QUERY_LOGGED_IN_USER(['id', 'firstname', 'lastname', 'profile_photo', 'profile_credential']);
const MUTATION_CREATE_QUESTION = GraphQL.MUTATION_CREATE_QUESTION([
  'id', 'author', 'content', 'followers', 'author_id', 'ownAnswer { id, content }', 'answers { id, content author { id firstname lastname }}'
]);
const MUTATION_UPDATE_QUESTION = GraphQL.MUTATION_UPDATE_QUESTION(['id', 'author', 'content']);
const QUERY_PERSONAL_QUESTIONS = GraphQL.QUERY_PERSONAL_QUESTIONS([
  'id', 'author', 'content', 'followers', 'author_id', 'ownAnswer { id, content }', 'answers { id, content author { id firstname lastname }}'
]);
const MUTATION_FOLLOW_QUESTION = GraphQL.MUTATION_FOLLOW_QUESTION(['id', 'author', 'content', 'followers', 'author_id']);
const MUTATION_PASS_QUESTION = GraphQL.MUTATION_PASS_QUESTION(['id', 'passed_question']);
const MUTATION_SHARE_QUESTION = GraphQL.MUTATION_SHARE_QUESTION();
const MUTATION_CREATE_ANSWER = GraphQL.MUTATION_CREATE_ANSWER([
  'id',
  'content',
  'author'
]);
const MUTATION_UPDATE_ANSWER = GraphQL.MUTATION_UPDATE_ANSWER([
  'id',
  'content',
  'author',
]);

class Home extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      question: '',
      drafts: {},
      askingQuestion: false,
      openModal: false,
      passedQuestions: [],
      tooltip: '',
      isEditing: false,
      currentAnswer: null
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
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.data.getPersonalQuestions) {
      this.setState({
        drafts: toObj(this.props.data.getPersonalQuestions),
        questions: this.props.data.getPersonalQuestions.reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {})
      });
    }
  }

  componentDidMount() {
    helper(this.openTooltip);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.getPersonalQuestions &&
      nextProps.data.getPersonalQuestions !== this.props.data.getPersonalQuestions) {
      this.setState({
        drafts: toObj(nextProps.data.getPersonalQuestions),
        questions: nextProps.data.getPersonalQuestions.reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {})
      });
    }
  }

  handleQuestionInput(event) {
    const { value } = event.target;
    this.setState({ question: _.upperFirst(value)});
  }

  handleAnswerChange (html, id) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.drafts[id].answerEditable = html;
      return newState;
    });
  }

  toggleAnswer(question, update=true) {
    if (this.state.currentAnswer && this.state.currentAnswer !== question && update) {
      this.handleAnswerSubmit(this.state.currentAnswer);
    }
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.drafts[question].open = !update ? false : !prevState.drafts[question].open;
      newState.currentAnswer = question;
      return newState;
    });
  }

  handleAnswerSubmit(question, draft=true) {
    const { questions, drafts } = this.state;
    if (drafts[question].answerEditable.length > 0) {
      if (!questions[question].ownAnswer || !questions[question].ownAnswer.id) {
        this.handleSubmitAnswer(question, draft);
      } else if (drafts[question].answerEditable !==  questions[question].ownAnswer.content) {
        this.handleUpdateAnswer(question, questions[question].ownAnswer.id, draft);
      }
    }
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
        },
        update: (store, d) => {
          const data = store.readQuery({ query: QUERY_PERSONAL_QUESTIONS, variables: { id: this.props.id } });
          data.getPersonalQuestions.push(d.data.createQuestion);
          store.writeQuery({ query: QUERY_PERSONAL_QUESTIONS, variables: { id: this.props.id }, data });
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

  async handleSubmitAnswer(question, draft=true) {
    const { drafts } = this.state;
    try {
      const result = await this.props.createAnswer({
        variables: {
          question,
          content: drafts[question].answerEditable,
          draft
        },
        update: (store) => {
          const data = store.readQuery({ query: QUERY_PERSONAL_QUESTIONS });
          if (!draft) {
            data.getPersonalQuestions = data.getPersonalQuestions.filter((q) => q.id !== question);
          }
          store.writeQuery({ query: QUERY_PERSONAL_QUESTIONS, data });
        }
      });
      if(!draft) {
        this.props.route.push(`/question/${question}/answer/${result.data.createAnswer.id}`);
      }
    } catch(error) {
      console.info(error);
    }
  }

  async handleUpdateAnswer(question, id, draft=true) {
    const { drafts } = this.state;
    try {
      const result = await this.props.updateAnswer({
        variables: {
          id,
          content: drafts[question].answerEditable,
          draft
        }
      });
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    if (!this.props.authUser.getLoggedInUser) {
      return <div />;
    }
    const { authUser: { getLoggedInUser } } = this.props;
    const { question, openModal, askingQuestion, passedQuestions, tooltip, isEditing, drafts, questions } = this.state;
    const fullname = getLoggedInUser ? `${getLoggedInUser.firstname} ${getLoggedInUser.lastname}` : '';
    return (
      <Layout isAuth router={this.props.route} user={getLoggedInUser}>
        <Column style={style.homeCol}>
          <Column size="is9" style={{ margin: 'auto' }}>
            {getLoggedInUser &&
              <Columns>
                <Column size="is3">
                  <div className="home-user-feeds-head">
                    <span style={{ clear: 'both' }}/>
                    <span className="home-user-feeds">Feeds</span>
                    <span className="home-user-edit-feeds" style={{ textAlign: 'right' }}>Edit</span>
                    <span style={{ clear: 'both' }}/>
                  </div>
                  <div className="home-feeds-list">
                    <ul>
                      <li className="active">Top Stories</li>
                    </ul>
                  </div>
                </Column>
                <Column style={style.timeline} size="is7">
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
                  {Object.values(questions) && Object.values(questions).reverse().map((q) => (
                    <div key={q.id}>
                      <QuestionCard
                        {...q}
                        handleFollowQuestion={this.handleFollowQuestion}
                        passQuestion={this.passQuestion}
                        passedQuestions={passedQuestions}
                        shareQuestion={this.shareQuestion}
                        openTooltip={this.openTooltip}
                        tooltip={tooltip}
                        editing={drafts[q.id].answerEditable}
                        toggleQuestionModal={this.toggleQuestionModal}
                        toggleAnswer={this.toggleAnswer}
                        answer={q.answers.length > 0 ? q.answers[0].content : null}
                      />
                      {drafts[q.id].open &&
                        <AnswerDock
                          id={q.id}
                          content={drafts[q.id].answerEditable}
                          submitAnswer={this.handleAnswerSubmit}
                          handleAnswerChange={this.handleAnswerChange}
                          openTooltip={this.openTooltip}
                          tooltip={tooltip}
                          user={{
                            name: fullname,
                            profileCredential: getLoggedInUser.profile_credential,
                            profilePhoto: getLoggedInUser.profile_photo
                          }}
                        />
                      }
                    </div>
                  ))}
                </Column>
              </Columns>
            }
          </Column>
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
  graphql(MUTATION_CREATE_ANSWER, { name: 'createAnswer' }),
  graphql(MUTATION_UPDATE_ANSWER, { name: 'updateAnswer'}),
  graphql(QUERY_PERSONAL_QUESTIONS)
)(Home));
