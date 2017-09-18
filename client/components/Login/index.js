import { Column, Input, Button } from 're-bulma';
import Error from '../Error';
import style from './style';

export default function Login(props) {
  const { email, password, errors } = props.state;
  const { handleChange, handleSubmit, changeSignupType } = props;
  return (
    <form>
      <Input className="gray-input" type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
      <br />
      <Input className="gray-input" type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
      <Column style={style.noPadding}>
        <a href="#" className="mute-link">Forgot Password?</a>
        <Button color="isInfo" style={style.loginButton} state={!email.length ? 'isDisabled' : 'isActive'} onClick={handleSubmit}>Login</Button>
      </Column>
      {errors.type &&
        <Column>
          <br />
          <Error message={
            <p>{errors.message}.
              <u className="cursor-pointer">{
                errors.type === 'password' ?
                  'Reset Password.'
                  :
                  <i onClick={() => changeSignupType('email')}>Sign up for Quora.</i>
              }</u>
            </p>
          } isOutline />
        </Column>
      }
    </form>
  );
}
