import { Nav, Column, Columns } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Progress from './Progress';
import NavItems from './Navitems';
import QuestionModal from '../CreateQuestion/QuestionModal';
import NavLogo from '../Logo/NavLogo';
import style from './style';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL'

const MUTATION_CREATE_QUESTION = GraphQL.MUTATION_CREATE_QUESTION([
  'id', 'author', 'content', 'followers', 'author_id', 'ownAnswer { id, content }', 'answers { id, content author { id firstname lastname }}'
]);

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPath: '/',
      tooltip: false,
      isAsking: false,
      askQuestion: false,
      question: ''
    };
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.toggleCreateQuestion = this.toggleCreateQuestion.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
  }

  componentDidMount() {
    this.setState({ currentPath: window.location.pathname });
  }

  toggleTooltip() {
    this.setState({ tooltip: !this.state.tooltip });
  }

  toggleCreateQuestion() {
    this.setState({ askQuestion: !this.state.askQuestion });
  }

  handleQuestionInput(event) {
    this.setState({ question: event.target.value });
  }

  async handleCreateQuestion() {
    const { user:  { firstname, lastname } } = this.props;
    const { question: content } = this.state;
    const author = `${firstname} ${lastname}`;
    this.setState({ isAsking: true });
    try {
      await this.props.createQuestion({
        variables: {
          content,
          author
        }
      });
      this.setState({ isAsking: false, question: '' });
      this.toggleCreateQuestion();
      window.location.replace('/');
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    const { isAuth, isProgress, router, user } = this.props;
    return (
      <Nav style={style.navContainer} hasShadow>
        <Column size="is9" style={style.navCol}>
          <Columns>
            <Column size={isProgress ? 'is3' : 'is2'}>
              <NavLogo />
            </Column>
            {isProgress && <Progress />}
            { !isProgress && isAuth &&
              <NavItems
                toggleTooltip={this.toggleTooltip}
                tooltip={this.state.tooltip}
                router={router}
                currentPath={this.state.currentPath}
                avatar={user.profile_photo}
                askQuestion={this.toggleCreateQuestion}
              />}
          </Columns>
        </Column>
        {isAuth &&
          <div style={{ textAlign: 'left' }}>
            <QuestionModal
              openModal={this.state.askQuestion}
              closeModal={this.toggleCreateQuestion}
              question={this.state.question}
              username={`${user.firstname} ${user.lastname}`}
              askingQuestion={this.state.isAsking}
              handleCreateQuestion={this.handleCreateQuestion}
              handleQuestionInput={this.handleQuestionInput}
            />
          </div>
        }
      </Nav>
    );
  }
}

export default withData(graphql(MUTATION_CREATE_QUESTION, { name: 'createQuestion' })(Navbar));
