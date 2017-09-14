import { gql, graphql, compose } from 'react-apollo';
import withData from '../../../../apollo';
import { Column, Container, Tile } from 're-bulma';
import Login from '../../Login';
import Signup from '../../Signup';
import Logo from '../../Logo';
import Text from '../../Text';
import FooterNav from '../../FooterNav';
import style from '../style';

const LOGIN_MUTATION = gql`
  mutation LoginUserInput($email: String, $password: String) {
    loginUser (data: {
      email: $email
      password: $password
    })
  }
`;

const SIGNUP_MUTATION = gql`
  mutation RegisterUserInput(
    $email: String,
    $password: String,
    $firstname: String,
    $lastname: String
  ) {
    registerUser (data: {
      email: $email,
      password: $password,
      firstname: $firstname,
      lastname: $lastname
    })
  }
`;

const MUTATION_UPDATE_REGISTRATION_PROGRESS = gql`
  mutation UpdateRegistrationProgressInput(
    $registration_progress: ID
  ) {
    updateRegistrationProgress(data: {
      registration_progress: $registration_progress
    })
  }
`;

const QUERY_GET_REGISTRATION_PROGRESS = gql`
  query {
    getRegistrationProgress {
      registeration_progress
    }
  }
`;

class RegisterLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: {
        email: '',
        password: '',
        errors: {
          type: null,
          message: ''
        }
      },
      'signup': {
        type: 'social',
        registration: {
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          recaptcha: '',
        },
        registeration_progress: 0,
        errors: {
          email: false,
          password: false,
          message: ''
        },
        showSignup: false
      }
    };
    this._changeState = this._changeState.bind(this);
    // LOGIN: Bind methods required in Login component
    this.loginHandleInputChange = this.loginHandleInputChange.bind(this);
    this.loginHandleSubmit = this.loginHandleSubmit.bind(this);

    // SIGNUP: Bind methods required in Signup component
    this.signupHandleInputChange = this.signupHandleInputChange.bind(this);
    this.signupHandleTypeChange = this.signupHandleTypeChange.bind(this);
    this.signupHandleRecaptchaChange = this.signupHandleRecaptchaChange.bind(this);
    this.signupValidateEmail = this.signupValidateEmail.bind(this);
    this.signupValidatePassword = this.signupValidatePassword.bind(this);
    this.signupHandleSubmit = this.signupHandleSubmit.bind(this);
    this.signupToggleButton = this.signupToggleButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.error) {
      console.info(data.error.graphQLErrors);
    } else if (nextProps.data.getRegistrationProgress) {
      const { registeration_progress } = nextProps.data.getRegistrationProgress;
      this._changeState('signup', 'registeration_progress', parseInt(registeration_progress));
      this.props._next(parseInt(registeration_progress));
    }
  }

  // LOGIN: Methods required in Login component
  loginHandleInputChange(event) {
    const { name, value } = event.target;
    this._changeState('login', name, value);
  }

  async loginHandleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state.login;
    try {
      const result = await this.props.loginUserInput({
        variables: {
          email,
          password
        }
      });
      console.info(result);
      this._setToken(result.data.loginUser);
    } catch(error) {
      const { message } = error.graphQLErrors[0];
      this._changeState('login', 'errors', {
        type: message.search('password') > -1 ? 'password' : 'email',
        message
      });
    }
  }
  // LOGIN: END login methods

  // SIGNUP: Methods required in signup component
  signupHandleInputChange(event) {
    const { registration } = this.state.signup;
    const { name, value } = event.target;
    this._changeState('signup', 'registration', {
      ...registration, [name]: value
    });
    this.signupToggleButton();
  }

  signupValidateEmail() {
    let { email } = this.state.signup.registration;
    const { errors } = this.state.signup;
    email = email.split('');
    if (!email.length || (email.includes('@') && email.includes('.'))) {
      this._changeState('signup', 'errors', { ...errors, email: false });
      return this.signupToggleButton();
    }
    this._changeState('signup', 'errors', { ...errors, email: true });
    return this.signupToggleButton();
  }

  signupValidatePassword() {
    let { password } = this.state.signup.registration;
    const { errors } = this.state.signup;
    if (!password.length || password.length > 5) {
      this._changeState('signup', 'errors', { ...errors, password: false });
      return this.signupToggleButton();
    }
    this._changeState('signup', 'errors', { ...errors, password: true });
    return this.signupToggleButton();
  }

  signupHandleTypeChange(type) {
    this._changeState('signup', 'type', type);
  }

  signupHandleRecaptchaChange(recaptcha) {
    const { registration } = this.state.signup;
    this._changeState('signup', 'registration', { ...registration, recaptcha });
    return this.signupToggleButton();
  }

  signupToggleButton() {
    const { registration: { email, password, firstname, lastname, recaptcha } , errors } = this.state.signup;
    if (!errors.message.length) {
      let clean = true;
      if (!email.length) {
        clean = false;
      } else if (!password.length) {
        clean = false;
      } else if (!firstname.length) {
        clean = false;
      } else if (!lastname.length) {
        clean = false;
      } else if (!recaptcha.length) {
        clean = false;
      }
      if (clean) {
        this._changeState('signup', 'showSignup', true);
      }
    }
  }

  validateSignup() {
    const { registration } = this.state.signup;
    if (!registration.recaptcha.length) {
      this._changeState('signup', 'errors', { email: false, message: '' });
    }
  }

  async signupHandleSubmit(event) {
    event.preventDefault();
    const { errors } = this.state.signup;

    this._changeState('signup', 'errors', { ...errors, message:''});

    const { email, password, firstname, lastname } = this.state.signup.registration;

    try {
      const result = await this.props.signupUserInput({
        variables: {
          email,
          password,
          firstname,
          lastname
        }
      });
      console.info(result);
      this._setToken(result.data.registerUser);
      this.props._next(1);
    } catch(error) {
      const { message } = error.graphQLErrors[0];
      this._changeState('signup', 'errors', {
        ...errors,
        message
      });
    }
  }
  // SIGNUP: END SIGNUP methods

  async _changeState(state, key, values) {
    const currentState = await this.setState((prevState) => {
      const newState = { ...prevState };
      newState[state][key] = values;
      return newState;
    });
    return currentState;
  }

  _setToken(token) {
    localStorage.setItem('token', token);
  }

  render() {
    const { login, signup } = this.state;
    return (
      <div>
        <Container style={style.boxWrapper}>
          <Column size="is7" style={style.formWrapper}>
            <Container style={style.headerContainer}>
              <Logo style={style.quoraLogo} />
              <p style={style.tagline}>A place to share knowledge and better understand the world</p>
            </Container>
            <Container>
              <Tile isVertical>
                <Tile>
                  <Tile context="isParent" isVertical style={style.signupBox}>
                    <Tile context="isChild" style={style.formBox}>
                      <Signup handleSubmit={this.signupHandleSubmit} handleRecaptchaChange={this.signupHandleRecaptchaChange} handleTypeChange={this.signupHandleTypeChange} handleChange={this.signupHandleInputChange} validateEmail={this.signupValidateEmail} validatePassword={this.signupValidatePassword} state={{ ...signup }}/>
                    </Tile>
                  </Tile>
                  <Tile context="isParent">
                    <Tile context="isChild" style={style.formBox}>
                      <Text size={14} weight="bold">Login</Text>
                      <Login handleSubmit={this.loginHandleSubmit} handleChange={this.loginHandleInputChange} changeSignupType={this.signupHandleTypeChange} state={{ ...login }} />
                    </Tile>
                  </Tile>
                </Tile>
              </Tile>
            </Container>
            <br />
            <Container >
              <a style={style.languageBox} className="darken-link-bg-hover" href="#">Suchst Du Quora auf Deutsch? <i className="fa fa-chevron-right"/></a>
              <a style={style.languageBox} className="darken-link-bg-hover" href="#">Stai cercando Quora in italiano? <i className="fa fa-chevron-right"/></a>
            </Container>
          </Column>
          <Column size="is7" style={style.footerBox}>
            <FooterNav />
          </Column>
        </Container>
      </div>
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_REGISTRATION_PROGRESS),
  graphql(LOGIN_MUTATION, { name: 'loginUserInput' }),
  graphql(MUTATION_UPDATE_REGISTRATION_PROGRESS, { name: 'updateRegProgress' }),
  graphql(SIGNUP_MUTATION, { name: 'signupUserInput' }),
)(RegisterLogin));
