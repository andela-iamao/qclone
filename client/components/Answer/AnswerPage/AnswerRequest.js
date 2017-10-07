import Link from 'next/link';
import { Column, Hero, HeroBody, Container, Button  } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import TopQuestionsSection from './TopQuestionsSection';
import Leftbar from './LeftBar';
import SelectTopics from './SelectTopics';
import Layout from '../../Layout';
import { toObj } from '../../Home/helper';
import withData from '../../../../apollo/withData';
import GraphQL from '../../../GraphQL';

const userList = ['id', 'firstname', 'lastname', 'profile_photo', 'profile_credential', 'passed_question', 'topic_knowledge { id, title, image }'];

const QUERY_LOGGED_IN_USER = GraphQL.QUERY_LOGGED_IN_USER(userList);

const QUERY_GET_USER_ANSWER_REQUESTS = GraphQL.QUERY_GET_USER_ANSWER_REQUESTS([
  'id', 'target', 'by'
]);

const QUERY_ALL_TOPICS = GraphQL.QUERY_ALL_TOPICS(['id', 'title', 'image']);

const QUERY_QUESTIONS_TO_ANSWER = GraphQL.QUERY_QUESTIONS_TO_ANSWER([
  'id', 'author', 'content', 'followers', 'author_id', 'topicsInfo { id, title }', 'created_at', 'ownAnswer { id, content }', 'answers { id, content author { id firstname lastname }}'
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

const MUTATION_UPDATE_USER_KNOWLEDGE = GraphQL.MUTATION_UPDATE_USER_KNOWLEDGE(userList);

class AnswerPage extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      activeEditor: null,
      questions: {},
      moreQuestions: {},
      question: '',
      drafts: {},
      askingQuestion: false,
      openModal: false,
      passedQuestions: [],
      tooltip: '',
      isEditing: false,
      currentAnswer: null,
      viewAll: false,
      selectedKnowledge: [],
      searchResult: [],
      credentialAddModal: '',
      selectedQuery: ''
    };

    this.handleShowMore = this.handleShowMore.bind(this);
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
    this.toggleCredentialAddModal = this.toggleCredentialAddModal.bind(this);
    this.handleTopicSearch = this.handleTopicSearch.bind(this);
    this.handleSelectKnowledge = this.handleSelectKnowledge.bind(this);
  }

  componentWillMount() {
    if(this.props.data.getAnswerRequest) {
      this.setState({
        drafts: toObj(this.props.data.getAnswerRequest),
        questions: [...this.props.data.getAnswerRequest].splice(0, 8).reverse().reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        moreQuestions: [...this.props.data.getAnswerRequest].reverse().splice(8, 15).reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        viewAll: this.props.data.getAnswerRequest[16] ? true : false,
        selectedKnowledge:this.props.authUser.getLoggedInUser.topic_knowledge
      });
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.getAnswerRequest &&
      nextProps.data.getAnswerRequest !== this.props.data.getAnswerRequest) {
      this.setState({
        drafts: toObj(nextProps.data.getAnswerRequest),
        questions: [...nextProps.data.getAnswerRequest].reverse().splice(0, 8).reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        moreQuestions: [...nextProps.data.getAnswerRequest].reverse().splice(8, 15).reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        viewAll: nextProps.data.getAnswerRequest[16] ? true : false,
        selectedKnowledge:nextProps.authUser.getLoggedInUser.topic_knowledge
      });
    }
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

  handleShowMore() {
    const newQuestions = { ...this.state.questions, ...this.state.moreQuestions };

    this.setState({ questions: newQuestions, moreQuestions:{} });
  }

  handleTopicSearch(event) {
    if (event.target.value === '') {
      return this.setState({ searchResult: [], searchQuery: event.target.value });
    }
    let { allTopics } = this.props.topics;
    let { selectedKnowledge } = this.state;
    selectedKnowledge = [...selectedKnowledge].reduce((a, b) => {
      a[b.id] = b;
      return a;
    }, {});
    const result = allTopics.filter((topic) => {
      if(topic.title.toLowerCase().match(event.target.value.toLowerCase()) &&
        !selectedKnowledge[topic.id]
      ) {
        return topic;
      }
    });
    this.setState({ searchQuery: event.target.value, searchResult: result });
  }

  toggleCredentialAddModal() {
    this.setState({
      credentialAddModal: this.state.credentialAddModal === 'knowledge' ? '' : 'knowledge'
    });
  }

  async handleSelectKnowledge(topic, remove=false) {
    try {
      await this.props.updateUserKnowledge({
        variables: {
          topic_knowledge: [topic.id],
          remove
        },
        update: (store, d) => {
          const data = store.readQuery({ query: QUERY_LOGGED_IN_USER, variables: { id: this.props.id } });
          data.getUser = d.updateUserKnowledge;
          store.writeQuery({ query: QUERY_LOGGED_IN_USER, variables: { id: this.props.id }, data });
        }
      });
      if (!remove) {
        return this.setState({ selectedKnowledge: [...this.state.selectedKnowledge, topic], searchResult: [] });
      }
      this.setState({ selectedKnowledge: this.state.selectedKnowledge.filter((selected) => selected.id !== topic.id), searchResult: [] });
    } catch(error) {
      console.info(error.graphQLErrors[0]);
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
          const data = store.readQuery({ query: QUERY_LOGGED_IN_USER, variables: { id: this.props.id } });
          data.getPersonalQuestions.push(d.data.createQuestion);
          store.writeQuery({ query: QUERY_LOGGED_IN_USER, variables: { id: this.props.id }, data });
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
          const data = store.readQuery({ query: QUERY_LOGGED_IN_USER });
          if (!draft) {
            data.getPersonalQuestions = data.getPersonalQuestions.filter((q) => q.id !== question);
          }
          store.writeQuery({ query: QUERY_LOGGED_IN_USER, data });
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
    const fullname = getLoggedInUser ? `${getLoggedInUser.firstname} ${getLoggedInUser.lastname}` : '';
    const { questions } = this.state;
    return (
      <Layout isAuth router={this.props.route} user={getLoggedInUser}>
        <Column style={{ backgroundColor: '#fafafa', height: '98vh', maxHeight: '98vh', overflowY: 'scroll' }}>
          <Column size="is9" style={{ margin: 'auto', position: 'relative' }}>
            {getLoggedInUser &&
              <div style={{ display: 'flex' }}>
                <Leftbar active="requests" />
                {Object.keys(questions).length < 1 ?
                  <div style={{ width: 600, margin: 'auto', textAlign: 'center' }}>
                    <Hero style={{ backgroundColor:'#FAFAFA' }}>
                      <HeroBody>
                        <Container>
                          <div style={{ margin: 'auto' }} className="icon-edit"></div>
                          <div className="answer-request-none">
                            <br />
                            <span className="answer-request-none-header">No Top Answer Requests</span><br /><br />
                            <span className="answer-request-none-subtitle">Top Answer Requests you receive will show up here.</span><br />
                          </div>
                          <br />
                          <Link href="/answer"><Button color="isPrimary">See Questions for You</Button></Link>
                        </Container>
                      </HeroBody>
                    </Hero>
                  </div>
                  :
                  <div style={{ width: 600, margin: 'auto' }}>
                    {Object.values(questions) &&
                      <TopQuestionsSection
                        questions={Object.values(questions)}
                        toggleAnswer={this.toggleAnswer}
                        activeEditor={this.state.activeEditor}
                        drafts={this.state.drafts}
                        passQuestion={this.passQuestion}
                        handleFollowQuestion={this.handleFollowQuestion}
                        username={fullname}
                        profile_photo={getLoggedInUser.profile_photo}
                        userId={getLoggedInUser.id}
                        profile_credential={getLoggedInUser.profile_credential}
                        passedQuestions={getLoggedInUser.passed_question}
                        openTooltip={this.openTooltip}
                        handleAnswerSubmit={this.handleAnswerSubmit}
                        handleAnswerChange={this.handleAnswerChange}
                        tooltip={this.state.tooltip}
                        moreQuestions={Object.values(this.state.moreQuestions)}
                        showMore={this.handleShowMore}
                        viewAll={this.state.viewAll}
                      />
                    }
                  </div>}
              </div>
            }
          </Column>
        </Column>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_LOGGED_IN_USER, { name: 'authUser' }),
  graphql(QUERY_QUESTIONS_TO_ANSWER),
  graphql(QUERY_ALL_TOPICS, { name: 'topics'}),
  graphql(QUERY_GET_USER_ANSWER_REQUESTS, { options: () => ({ variables: { target: 1 } })}),
  graphql(MUTATION_FOLLOW_QUESTION, { name: 'followQuestion' }),
  graphql(MUTATION_PASS_QUESTION, { name: 'passQuestion' }),
  graphql(MUTATION_SHARE_QUESTION, { name: 'shareQuestion' }),
  graphql(MUTATION_CREATE_ANSWER, { name: 'createAnswer' }),
  graphql(MUTATION_UPDATE_ANSWER, { name: 'updateAnswer'}),
  graphql(MUTATION_UPDATE_USER_KNOWLEDGE, { name: 'updateUserKnowledge' }),
)(AnswerPage));
