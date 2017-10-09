// import dynamic from 'next/dynamic';
// import Link from 'next/link';
import { Column } from 're-bulma';
import { graphql, compose } from 'react-apollo';
// import Content from './content';
// import Comment from './comment';
// import Header from './header';
// import About from './about';
import NotificationCard from './NotificationCard';
import Leftbar from './Leftbar';
import Layout from '../Layout';
// import style from '../style';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';



const userList = ['id', 'firstname', 'lastname', 'profile_photo', 'profile_credential', 'passed_question', 'topic_knowledge { id, title, image }'];

const QUERY_LOGGED_IN_USER = GraphQL.QUERY_LOGGED_IN_USER(userList);
const QUERY_GET_NOTIFICATIONS = GraphQL.QUERY_GET_NOTIFICATIONS(['id', 'owner', 'question { id, content, followers }', 'user { id, firstname, lastname, profile_photo, profile_credential }', 'read', 'type', 'answer { id }', 'created_at']);
const MUTATION_FOLLOW_QUESTION = GraphQL.MUTATION_FOLLOW_QUESTION(['id', 'author', 'content', 'followers', 'author_id']);

class NotificationPeoplePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleFollowQuestion = this.handleFollowQuestion.bind(this);
  }

  async handleFollowQuestion(id) {
    try {
      await this.props.followQuestion({
        variables: { id },
        update: (store, d) => {
          const data = store.readQuery({ query: QUERY_GET_NOTIFICATIONS });
          data.getNotifications = [...data.getNotifications].map((notification) => {
            if (notification.question.id === d.data.followQuestion.id) {
              notification.question.followers = d.data.followQuestion.followers;
              return notification;
            }
            return notification;
          });
          store.writeQuery({ query: QUERY_GET_NOTIFICATIONS, data });
        }
      });
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    if (!this.props.data.getLoggedInUser) {
      return <div />;
    }
    const notifications = [...this.props.notifications.getNotifications].filter((note) => note.type.toLowerCase() === 'people');
    return (
      <Layout isAuth>
        <Column style={{ backgroundColor: '#fafafa', height: '98vh', maxHeight: '98vh', overflowY: 'scroll' }}>
          <Column size="is9" style={{ margin: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex' }}>
              <Leftbar active="answer" />
              <div style={{ width: 600, margin: 'auto' }}>
                <div className="answer-section-draft-info">
                  <div className="answer-section-draft-info-header"><span>All Notifications</span></div>
                  <div className="answer-section-draft-info-delete-all">
                    <span onClick={() => this.confirmDelete(null, null, true)}>Mark All As Read</span>
                  </div>
                </div>
                {[...notifications].reverse().map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    actions={{
                      handleFollowQuestion: this.handleFollowQuestion
                    }}
                  />
                ))}
              </div>
            </div>
          </Column>
        </Column>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_NOTIFICATIONS, { name: 'notifications'}),
  graphql(QUERY_LOGGED_IN_USER),
  graphql(MUTATION_FOLLOW_QUESTION, { name: 'followQuestion'})
)(NotificationPeoplePage));
