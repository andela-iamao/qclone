import PropTypes from 'prop-types';
import Nav from '../Nav';

export default class Layout extends React.Component {

  static propTypes = {
    childern: PropTypes.object
  };

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
    const { children, router, isProgress } = this.props;
    if (!this.state.active) {
      return <div />;
    }
    return (
      <div>
        <Nav isAuth router={router} isProgress={isProgress} />
        {children}
      </div>
    );
  }
}
