import _ from 'lodash';
import { Tag, Column, Tile, Subtitle, Content, Title, Icon } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Sidebar from './Sidebar';
import Layout from '../Layout';
import Action from '../QuestionCard/Action';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';
import style from './style';

const QUERY_GET_QUESTION = GraphQL.QUERY_GET_QUESTION(
  ['id', 'author', 'content', 'followers', 'author_id', 'topics { id, title }']
);

class Question extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      question: '',
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
  }

  handleQuestionInput(event) {
    const { value } = event.target;
    this.setState({ question: _.upperFirst(value)});
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
    const { getQuestion: { getQuestion } } = this.props;
    return (
      <Layout isAuth>
        <Column size="is8" style={style.container}>
          {getQuestion &&
            <Tile context="isAncestor" style={style.container}>
              <Tile size="is8">
                <Column size="is12">
                  <Column>{getQuestion.topics.map((topic) => (
                    <Tag key={topic.id}>{topic.title}</Tag>
                  ))}
                  </Column>
                  <Column>
                    <h2>{getQuestion.content}</h2>
                    <div>
                      <Action noAnswer {...getQuestion} noPass />
                    </div>
                    <hr />
                  </Column>
                  <Column style={style.noAnswer}>
                    <Subtitle>
                      <Icon icon="fa fa-pencil" size="isLarge" />
                    </Subtitle>
                    <h3>No Answer Yet</h3>
                  </Column>
                </Column>
              </Tile>
              <Tile context="isParent">
                <Tile context="isChild" style={style}>
                  <Sidebar />
                </Tile>
              </Tile>
            </Tile>
          }
        </Column>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_QUESTION, { name: 'getQuestion', options: ({ id }) => ({ variables: { id } }) })
)(Question));
