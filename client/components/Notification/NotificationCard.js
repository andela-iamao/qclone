import Link from 'next/link';
import moment from 'moment';

export default function NotificationCard(props) {
  const { actions, notification } = props;
  return (
    <div className="notification-card">
      {!notification.read &&
        <div className="notification-card-unread">
        </div>
      }
      <div className="notification-card-image-container">
        <img src={props.notification.user.profile_photo} />
      </div>
      <div className="notification-card-notification-container">
        {props.notification.type.toLowerCase() === 'answer' &&
          <span>
            <span className="notification-card-notification-container-user">{notification.user.firstname} {notification.user.lastname}</span><span> {props.notification.user.profile_credential} </span>
            <span>answered: </span>
            <Link href={`/question/answer?questionId=${notification.question.id}&answerId=${notification.answer.id}`} as={`/question/${notification.question.id}/answer/${notification.answer.id}`}>
              <span className="notification-card-notification-container-question">{notification.question.content}</span>
            </Link>
            <span className="mute-link">  {moment(props.notification.created_at).fromNow()}</span>
            <br /><br />
            <span className="notification-card-notification-container-actions-mute-link">
              {props.notification.question.followers.includes(notification.owner) ?
                <span onClick={() => actions.handleFollowQuestion(notification.question.id)}>Following Question</span>
                :
                <span onClick={() => actions.handleFollowQuestion(notification.question.id)}>Follow Question</span>
              }
            </span>
          </span>
        }
      </div>
    </div>
  );
}
