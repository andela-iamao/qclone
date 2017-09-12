import { Columns, Column, Input, Button, Label } from 're-bulma';
import ReCAPTCHA from 'react-google-recaptcha';
import Text from '../Text';
import style from './style';

export default function EmailSignup({ errors, values, handleChange, changeType, recaptchaChange, validateEmail }) {
  const { email, password, firstname, lastname } = values;
  return (
    <div>
      <Text size={14} weight="bold">Signup</Text>
      <form>
        <Columns>
          <Column size="isHalf">
            <Label><Text size={12} weight="bold" color="#666">FIRST NAME</Text></Label>
            <Input className="gray-input" type="text" name="firstname" value={firstname} onChange={handleChange} />
          </Column>
          <Column size="isHalf">
            <Label><Text size={12} weight="bold" color="#666">LAST NAME</Text></Label>
            <Input className="gray-input" type="text" name="lastname" value={lastname} onChange={handleChange} />
          </Column>
        </Columns>
        <Label><Text size={12} weight="bold" color="#666">EMAIL</Text></Label>
        {errors.email ?
          <Input className="danger-input" type="email" name="email" value={email} onChange={handleChange} onBlur={validateEmail} color="isDanger" icon="fa fa-exclamation-circle" hasIconRight />
          :
          <Input className="gray-input" type="email" name="email" value={email} onChange={handleChange} onBlur={validateEmail} />
        }
        <Label><Text size={12} weight="bold" color="#666">PASSWORD</Text></Label>
        <Input className="gray-input" type="password" name="password" value={password} onChange={handleChange} />
      </form>
      <div>
        <p>
          <span className="mute-link">By clicking <q>Sign Up</q> you indicate that you have read and agree to the <span>
            <a href="#" className="mute-link"> Terms of Service</a></span> and <span><a href="#" className="mute-link">Privacy Policy</a>.</span>
          </span>
        </p>
      </div>
      <ReCAPTCHA
        sitekey="6LdSajAUAAAAAMyD9roll3nFsGc-NIMJ28bMB5j9"
        onChange={recaptchaChange}
      />
      <Column style={style.signupActions}>
        <span>
          <Button color="isInfo" style={style.cancelEmailSignup} onClick={() => changeType('social')}><a href="#">Cancel</a></Button>
          <Button color="isInfo" state={!email.length ? 'isDisabled' : 'isActive'}>Signup</Button>
        </span>
      </Column>
    </div>
  );
}
