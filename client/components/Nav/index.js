import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav, Column, Columns } from 're-bulma';
import { graphql, compose } from 'react-apollo';

import query from './query';
import style from './style';
import Progress from './Progress';
import NavItems from './Navitems';

import NavLogo from '../Logo/NavLogo';
import QuestionModal from '../CreateQuestion/QuestionModal';

import GraphQL from '../../GraphQL';
import { addUnread, getUnread } from '../../store';

import withData from '../../../apollo/withData';

const MUTATION_CREATE_QUESTION = GraphQL.MUTATION_CREATE_QUESTION([
  'id', 'author', 'content', 'followers', 'author_id', 'ownAnswer { id, content }', 'answers { id, content author { id firstname lastname }}'
]);

const MUTATION_UPDATE_NOTIFICATION = GraphQL.MUTATION_UPDATE_NOTIFICATION();
const MUTATION_FOLLOW_QUESTION = GraphQL.MUTATION_FOLLOW_QUESTION(['id', 'author', 'content', 'followers', 'author_id']);

const QUERY_GET_NOTIFICATIONS = GraphQL.QUERY_GET_NOTIFICATIONS(['id', 'owner', 'question { id, content, followers }', 'user { id, firstname, lastname, profile_photo, profile_credential }', 'read', 'type', 'answer { id }', 'created_at']);

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPath: '/',
      tooltip: false,
      isAsking: false,
      askQuestion: false,
      showNotifications: false,
      question: '',
      unread: props.unread
    };
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.toggleCreateQuestion = this.toggleCreateQuestion.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.handleReadAllNotifications = this.handleReadAllNotifications.bind(this);
    this.handleReadNotification = this.handleReadNotification.bind(this);
    this.handleFollowQuestion = this.handleFollowQuestion.bind(this);
    this.showNotifications = this.showNotifications.bind(this);
  }

  componentDidMount() {
    this.props.getUnread();
    this.setState({ currentPath: window.location.pathname });
    document.addEventListener('click', (event) => {
      if((event.target.className === 'nav-link-title' && event.target.innerText === 'Notification'
        || (event.target.className === 'nav-link' && event.target.children[0].innerText === 'Notification')
      )) {
        return this.showNotifications();
      }
      const tooltipElements = document.getElementsByClassName('navbar-notification-box-container')[0];
      let isClickInside = tooltipElements.contains(event.target);
      if (!isClickInside && Object.values(event.target.classList).indexOf('ellipse-link') < 0) {
        this.showNotifications();
      }
    });
    this.socket = io(window.localStorage.getItem('socketURI'));
    this.socket.on('message', (message) => {
      if(this.props.data.getUser.id === message.receiver) {
        this.props.addUnread(message);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.unread.length > this.props.unread.length) {
      this.setState({ unread: nextProps.unread });
    }
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

  handleReadAllNotifications(notifications) {
    notifications.forEach((notification) => this.handleReadNotification(notification));
  }

  showNotifications() {
    this.setState({ showNotifications: !this.state.showNotifications });
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

  async handleReadNotification(notification) {
    try {
      await this.props.updateNotification({
        variables: {
          read: true,
          id: notification
        }
      });
    } catch(e) {
      console.error(e);
    }
  }

  async handleFollowQuestion(id) {
    try {
      await this.props.followQuestion({
        variables: { id },
        update: async (store, d) => {
          const data = store.readQuery({ query: QUERY_GET_NOTIFICATIONS });
          let notificationId;
          data.getNotifications = [...data.getNotifications].map((notification) => {
            if (notification.question.id === d.data.followQuestion.id) {
              notificationId = notification.id;
              notification.question.followers = d.data.followQuestion.followers;
              return notification;
            }
            return notification;
          });
          store.writeQuery({ query: QUERY_GET_NOTIFICATIONS, data });
          await this.handleReadNotification(notificationId);
        }
      });
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    if (!this.props.data.getUser) {
      return <div />;
    }
    const { isAuth, isProgress, router, data: { getUser: user } } = this.props;
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
                unread={this.state.unread}
                toggleTooltip={this.toggleTooltip}
                tooltip={this.state.tooltip}
                router={router}
                currentPath={this.state.currentPath}
                avatar={user.profile_photo}
                askQuestion={this.toggleCreateQuestion}
                notifications={this.props.notification.getNotifications}
                actions={{
                  readNotification: this.handleReadNotification,
                  readAllNotification: this.handleReadAllNotifications,
                  followQuestion: this.handleFollowQuestion,
                  showNotifications: this.showNotifications
                }}
                showNotifications={this.state.showNotifications}
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

function mapStateToProps({ message }) {
  return {
    unread: message.unread
  };
}

const  mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ addUnread, getUnread }, dispatch),
});

export default withData(compose(
  graphql(MUTATION_CREATE_QUESTION, { name: 'createQuestion' }),
  graphql(MUTATION_UPDATE_NOTIFICATION, { name: 'updateNotification' }),
  graphql(MUTATION_FOLLOW_QUESTION, { name: 'followQuestion' }),
  graphql(QUERY_GET_NOTIFICATIONS, { name: 'notification' }),
  graphql(query.QUERY_GET_USER, { options: ({ id }) => ({ variables: { id } })})
)(connect(mapStateToProps, mapDispatchToProps)(Navbar)));
