import SocialSignup from './SocialSignup';
import EmailSignup from './EmailSignup';
import FloatErrorMessage from '../Error/FloatErrorMessage';

export default function Signup(props) {
  const { registration, type, errors, showSignup } = props.state;
  return (
    <div>
      <FloatErrorMessage message={errors.message} open={!!errors.message.length} />
      {type === 'social' ?
        <SocialSignup changeType={props.handleTypeChange} />
        :
        <EmailSignup
          recaptchaChange={props.handleRecaptchaChange}
          changeType={props.handleTypeChange}
          values={{ ...registration, showSignup }}
          handleChange={props.handleChange}
          handleSubmit={props.handleSubmit}
          validateEmail={props.validateEmail}
          validatePassword={props.validatePassword}
          errors={errors}
        />
      }
    </div>
  );
}
