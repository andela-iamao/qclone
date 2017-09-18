import RegisterLogin from './RegisterLogin';
import Interests from './Interests';
import Knowledge from './Knowledge';

export default class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      position: 0,
      sections: ['registerLogin', 'selectInterests', 'addKnowledge']
    };
    this._next = this._next.bind(this);
  }

  _next(pos=null) {
    const { position, sections } = this.state;
    if (pos !== null) {
      if (!sections[pos]) {
        return this.props.checkAuthStatus(true);
      }
      this.props.checkAuthStatus(false);
      return this.setState({ position: pos });
    }
    this.props.checkAuthStatus(false);
    return this.setState({ position: position + 1 });
  }

  render() {
    const { sections, position } = this.state;
    if (sections[position] === 'registerLogin') {
      return <RegisterLogin _next={this._next} />;
    } else if (sections[position] === 'selectInterests') {
      return <Interests _next={this._next}/>;
    } else if (sections[position] === 'addKnowledge'){
      return <Knowledge _next={this._next} />;
    }
    return (
      <div>Loading...</div>
    );
  }
}
