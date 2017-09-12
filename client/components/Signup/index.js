import SocialSignup from './SocialSignup';
import EmailSignup from './EmailSignup';
import FloatErrorMessage from '../Error/FloatErrorMessage';

export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'social',
      registration: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
      },
      recaptcha: '',
      errors: {
        email: false,
        message: 'Your email is not correct'
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleRecaptchaChange = this.handleRecaptchaChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const nextState = {...prevState};
      nextState.registration[name] = value;
      return nextState;
    });
  }

  validateEmail() {
    let { email } = this.state.registration;
    const { errors } = this.state;
    email = email.split('');
    if (!email.length || (email.includes('@') && email.includes('.'))) {
      return this.setState({ errors: { ...errors, email: false } });
    }
    return this.setState({ errors: { ...errors, email: true } });
  }

  validateRecaptcha() {

  }

  handleTypeChange(type) {
    this.setState({ type });
  }

  handleRecaptchaChange(recaptcha) {
    this.setState({ recaptcha });
  }

  render() {
    const { registration, type, errors } = this.state;
    return (
      <div>
        <FloatErrorMessage message={errors.message} open={!!errors.message}/>
        {type === 'social' ?
          <SocialSignup changeType={this.handleTypeChange} />
          :
          <EmailSignup
            recaptchaChange={this.handleRecaptchaChange}
            changeType={this.handleTypeChange}
            values={{...registration}}
            handleChange={this.handleChange}
            validateEmail={this.validateEmail}
            errors={errors}
          />
        }
      </div>
    );
  }
}
