import { Notification } from 're-bulma';
import PropTypes from 'prop-types';
import style from './style';

export default class FloatErrorMessage extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { open: props.open, toClose: false };
    this.closeErrorBox = this.closeErrorBox.bind(this);
  }

  closeErrorBox() {
    this.setState({ open: false, toClose: false });
  }

  render() {
    const { open, toClose } = this.state;
    const { message, timeout } = this.props;
    if (open && !toClose) {
      setTimeout(() => {
        this.setState({ toClose: true });
        this.closeErrorBox();
      }, timeout || 5000);
    }
    return (
      <div>
        {open &&
          <Notification
            color="isDanger"
            closeButtonProps={{ onClick: () => console.info('clicked') }}
            style={style.floatErrorMessage.errorBox}
          >
            {message}
          </Notification>
        }
      </div>
    );
  }
}
