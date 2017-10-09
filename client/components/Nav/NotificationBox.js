import Link from 'next/link';
import moment from 'moment';
import { Button } from 're-bulma';

export default function NotificationBox(props) {
  if (!props.notifications) {
    return <div />;
  }
  const notifications = [...props.notifications.filter((notification) => !notification.read)].reverse().slice(0, 7);
  return (
    <div className="navbar-notification-box-container">
      <div className="navbar-notification-box">
        <div className="navbar-notification-box-header">
          <div className="navbar-notification-box-header-see-all">
            <Link href="/notifications"><span>See All Notifications  <i className="fa fa-angle-right" /></span></Link>
          </div>
          <div className="navbar-notification-box-header-action">
            <Button onClick={() => props.actions.readAllNotification([...props.notifications].map((note) => note.id))}>Mark these as Read</Button>
          </div>
        </div>
        {[...notifications].map((notification) => (
          <div key={notification.id} className="navbar-notification-box-notification">
            <div className="navbar-notification-box-notification-unread">
              <div className="navbar-notification-box-notification-unread-icon"></div>
            </div>
            <div className="navbar-notification-box-notification-avatar">
              <img src={notification.user.profile_photo} />
            </div>
            <div className="navbar-notification-box-notification-details" onClick={() => props.actions.readNotification([notification.id])}>
              {notification.type.toLowerCase() === 'answer' &&
                <Link href={`/question/answer?questionId=${notification.question.id}&answerId=${notification.answer.id}`} as={`/question/${notification.question.id}/answer/${notification.answer.id}`}>
                  <div>
                    <span className="notification-card-notification-container-user">{notification.user.firstname} {notification.user.lastname}</span><span> {notification.user.profile_credential} </span>
                    <span>answered: </span>
                    <span className="notification-card-notification-container-question">{notification.question.content}</span>
                    <span className="mute-link">  {moment(notification.created_at).fromNow()}</span>
                    <br />
                    <span className="notification-card-notification-container-actions-mute-link">
                      {notification.question.followers.includes(notification.owner) ?
                        <span onClick={() => props.actions.handleFollowQuestion(notification.question.id)}>Following Question</span>
                        :
                        <span onClick={() => props.actions.handleFollowQuestion(notification.question.id)}>Follow Question</span>
                      }
                    </span>
                  </div>
                </Link>
              }
            </div>
            <div className="navbar-notification-box-notification-check">
              {!notification.read && <span className="fa fa-check"/>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
