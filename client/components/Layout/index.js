import PropTypes from 'prop-types';
import Nav from '../Nav';

export default class Layout extends React.Component {

  static propTypes = {
    childern: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, router, isProgress } = this.props;
    return (
      <div>
        <Nav isAuth router={router} isProgress={isProgress} />
        {children}
      </div>
    );
  }
}
