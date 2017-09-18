import { Notification } from 're-bulma';
import PropTypes from 'prop-types';
import style from './style';

export default class FloatErrorMessage extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { open: props.open, toClose: false, message: '' };
    this.closeErrorBox = this.closeErrorBox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open && nextProps.message != this.state.message) {
      const { timeout, open, message } = nextProps;
      this.setState({ open: true, message });
      if (open) {
        setTimeout(() => {
          this.closeErrorBox();
        }, timeout || 5000);
      }
    } else if (!nextProps.message.length) {
      this.setState({ message: '' });
    }
  }

  closeErrorBox() {
    this.setState({ open: false });
  }

  render() {
    const { open, message } = this.state;
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
