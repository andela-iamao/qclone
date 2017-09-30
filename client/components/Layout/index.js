import PropTypes from 'prop-types';
import Nav from '../Nav';

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    user: {
      profile_photo: '',
      id: ''
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount() {
    this.setState({ active: true });
    
  }

  render() {
    const { children, router, isProgress, user } = this.props;
    if (!this.state.active) {
      return <div />;
    }
    return (
      <div>
        <Nav id={user.id} isAuth router={router} isProgress={isProgress} avatar={user.profile_photo}/>
        {children}
      </div>
    );
  }
}
