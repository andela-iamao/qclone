import { Column, Input, Button } from 're-bulma';
import Error from '../Error';
import style from './style';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <Input className="gray-input" type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
        <br />
        <Input className="gray-input" type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
        <Column style={style.noPadding}>
          <a href="#" className="mute-link">Forgot Password?</a>
          <Button color="isInfo" style={style.loginButton} state={!email.length ? 'isDisabled' : 'isActive'}>Login</Button>
        </Column>
        <Column>
          <br />
          <Error message={<p>Incorrect password. <u>Reset Password.</u></p>} isOutline />
        </Column>
      </form>
    );
  }
}
