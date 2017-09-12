import { Notification } from 're-bulma';
import PropTypes from 'prop-types';
import style from './style';

export default function Error({message}) {
  return (
    <Notification
      closeButtonProps={{ onClick: () => console.info('clicked') }}
      style={style.notificationBox}
    >
      {message}
    </Notification>
  );
}

Error.propTypes = {
  message: PropTypes.object
};
