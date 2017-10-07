import Link from 'next/link';
import { Column, Modal, Button, Content, Hero, HeroBody, Container } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Leftbar from './LeftBar';
import AnswerDock from '../AnswerDock';
import Layout from '../../Layout';
import { toObj } from '../../Home/helper';
import withData from '../../../../apollo/withData';
import GraphQL from '../../../GraphQL';

const userList = ['id', 'firstname', 'lastname', 'profile_photo', 'profile_credential', 'passed_question', 'topic_knowledge { id, title, image }'];

const QUERY_LOGGED_IN_USER = GraphQL.QUERY_LOGGED_IN_USER(userList);

const QUERY_ALL_TOPICS = GraphQL.QUERY_ALL_TOPICS(['id', 'title', 'image']);

const QUERY_GET_USER_DRAFTS = GraphQL.QUERY_GET_USER_DRAFTS([
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

const MUTATION_DELETE_DRAFT = GraphQL.MUTATION_DELETE_DRAFT([
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
      question: '',
      drafts: {},
      askingQuestion: false,
      openModal: false,
      passedQuestions: [],
      tooltip: '',
      isEditing: false,
      currentAnswer: null,
      confirmDelete: false,
      deleting: {}
    };

    this.openTooltip = this.openTooltip.bind(this);
    this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDeleteDraft = this.handleDeleteDraft.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentWillMount() {
    if(this.props.data.getDrafts) {
      this.setState({
        drafts: toObj(this.props.data.getDrafts),
        questions: [...this.props.data.getDrafts].splice(0, 8).reverse().reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        moreQuestions: [...this.props.data.getDrafts].reverse().splice(8, 15).reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        viewAll: this.props.data.getDrafts[16] ? true : false,
        selectedKnowledge:this.props.authUser.getLoggedInUser.topic_knowledge
      });
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.getDrafts &&
      nextProps.data.getDrafts !== this.props.data.getDrafts) {
      this.setState({
        drafts: toObj(nextProps.data.getDrafts),
        questions: [...nextProps.data.getDrafts].reverse().splice(0, 8).reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        moreQuestions: [...nextProps.data.getDrafts].reverse().splice(8, 15).reduce((a, b) => {
          a[b.id] = b;
          return a;
        }, {}),
        viewAll: nextProps.data.getDrafts[16] ? true : false,
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

  confirmDelete(answer, question, all=false) {
    if (all) {
      return this.setState({
        confirmDelete: !this.state.confirmDelete,
        deleteAll: true
      });
    }
    return this.setState({
      confirmDelete: !this.state.confirmDelete,
      deleting: { question, answer },
      deleteAll: false
    });
    // this.handleDeleteDraft(question.ownAnswer.id, question.id)
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

  openTooltip(id) {
    return this.setState({ tooltip: id || false });
  }

  deleteAll() {
    Object.values(this.state.drafts).forEach((draft) => {
      this.handleDeleteDraft(draft.ownAnswer.id, draft.id);
    });
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

  async handleDeleteDraft(id, questionId) {
    try {
      await this.props.deleteDraft({
        variables: { id },
        update: (store) => {
          const data = store.readQuery({ query: QUERY_GET_USER_DRAFTS });
          data.getDrafts = data.getDrafts.filter((draft) => draft.id !== questionId);
          store.writeQuery({ query: QUERY_GET_USER_DRAFTS, data });
        }
      });
      this.confirmDelete(null, null);
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
    const { questions, deleting, deleteAll,  } = this.state;
    return (
      <Layout isAuth router={this.props.route} user={getLoggedInUser}>
        <Column style={{ backgroundColor: '#fafafa', height: '98vh', maxHeight: '98vh', overflowY: 'scroll' }}>
          <Column size="is9" style={{ margin: 'auto', position: 'relative' }}>
            {getLoggedInUser &&
              <div style={{ display: 'flex' }}>
                <Leftbar active="drafts" />
                <div style={{ width: 600, margin: 'auto' }}>
                  {Object.values(questions).length > 1 &&
                    <div className="answer-section-draft-info">
                      <div className="answer-section-draft-info-header"><span>{Object.values(questions).length} Drafts</span></div>
                      <div className="answer-section-draft-info-delete-all">
                        <span onClick={() => this.confirmDelete(null, null, true)}>Delete All Draft</span>
                      </div>
                    </div>
                  }
                  {Object.values(questions) && Object.values(questions).length > 1 ?
                    <div className="answer-timeline">
                      {Object.values(questions).map((question) => (
                        <div key={question.id} className="answer-section ">
                          <div className="answer-section-draft">
                            <h2>
                              <a href="" className="header-link">
                                {question.content}
                              </a>
                            </h2>
                            <div>
                              <p dangerouslySetInnerHTML={{ __html: question.ownAnswer.content }} />
                            </div>
                            <div className="answer-page-question-card-actions">
                              <span>
                                <a href="#" className="Button WriteAnswer" onClick={() => this.toggleAnswer(question.id)}>
                                  <span>{question.ownAnswer && question.ownAnswer.id ? 'Edit Answer' : 'Answer'}</span>
                                </a>
                                <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
                                  <a onClick={() => this.confirmDelete(question.ownAnswer.id, question.id)} className="mute-link">
                                    Delete Draft
                                  </a>
                                </span>
                              </span>
                            </div>
                          </div>

                          {this.state.drafts[question.id].open &&
                            <AnswerDock
                              id={question.id}
                              content={this.state.drafts[question.id].answerEditable}
                              submitAnswer={this.handleAnswerSubmit}
                              handleAnswerChange={this.handleAnswerChange}
                              openTooltip={this.openTooltip}
                              tooltip={this.state.tooltip}
                              user={{
                                name: fullname,
                                profileCredential: getLoggedInUser.profile_credential,
                                profilePhoto: getLoggedInUser.profile_photo
                              }}
                            />
                          }
                        </div>
                      ))
                      }
                    </div>
                    :
                    <div style={{ width: 600, margin: 'auto', textAlign: 'center' }}>
                      <Hero style={{ backgroundColor:'#FAFAFA' }}>
                        <HeroBody>
                          <Container>
                            <div style={{ margin: 'auto' }} className="icon-edit"></div>
                            <div className="answer-request-none">
                              <br />
                              <span className="answer-request-none-header">No Saved Drafts</span><br /><br />
                              <span className="answer-request-none-subtitle">Unfinished answer will be saved as drafts here.</span><br />
                            </div>
                            <br />
                            <Link href="/answer"><Button color="isPrimary">See Questions for You</Button></Link>
                          </Container>
                        </HeroBody>
                      </Hero>
                    </div>
                  }
                </div>
              </div>
            }
          </Column>
        </Column>
        <Modal
          type="card"
          headerContent={deleteAll ? 'Delete All Draft?' : 'Delete Draft'}
          footerContent={
            <div style={{ padding: '20px', textAlign: 'right', width: '100%' }} >
              <a style={{ lineHeight: '1.8em', marginRight: 10 }} className="mute-link" onClick={() => this.confirmDelete(null, null)}>Cancel</a>
              {!deleteAll ?
                <Button color="isPrimary" onClick={() => this.handleDeleteDraft(deleting.answer, deleting.question)}>
                  Delete
                </Button>
                :
                <Button color="isPrimary" onClick={this.deleteAll}>
                  Delete All Drafts
                </Button>
              }
            </div>
          }
          isActive={this.state.confirmDelete}
          onCloseRequest={() => this.confirmDelete(null, null)}
        >
          <Content style={{ padding: 15 }}>
            Deleting a draft will result in a permanent loss of your work. If your answer or post is already published, it will be unaffected.
          </Content>
        </Modal>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_LOGGED_IN_USER, { name: 'authUser' }),
  graphql(QUERY_GET_USER_DRAFTS),
  graphql(QUERY_ALL_TOPICS, { name: 'topics'}),
  graphql(MUTATION_FOLLOW_QUESTION, { name: 'followQuestion' }),
  graphql(MUTATION_PASS_QUESTION, { name: 'passQuestion' }),
  graphql(MUTATION_SHARE_QUESTION, { name: 'shareQuestion' }),
  graphql(MUTATION_CREATE_ANSWER, { name: 'createAnswer' }),
  graphql(MUTATION_UPDATE_ANSWER, { name: 'updateAnswer'}),
  graphql(MUTATION_DELETE_DRAFT, { name: 'deleteDraft'}),
  graphql(MUTATION_UPDATE_USER_KNOWLEDGE, { name: 'updateUserKnowledge' }),
)(AnswerPage));
