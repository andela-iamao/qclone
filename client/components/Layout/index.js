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
    const { children } = this.props;
    return (
      <div>
        <Nav />
        {children}
      </div>
    );
  }
}
