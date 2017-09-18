import React from 'react';
import PropTypes from 'prop-types';

import GoogleAuthButton from '../Buttons/GoogleAuthButton';
import FacebookAuthButton from '../Buttons/FacebookAuthButton';


export default function SocialSignup({ changeType }) {
  return (
    <div>
      <GoogleAuthButton text="Continue with Google" onClick={() => console.info('clicked')}/>
      <FacebookAuthButton text="Continue with Facebook" onClick={() => console.info('clicked')}/>
      <div>
        <p><a onClick={() => changeType('email')}>Continue With Email</a>. <span className="mute-link">
          By signing up you indicate that you have read and agree to the <span>
            <a href="#" className="mute-link"> Terms of Service</a></span> and <span><a href="#" className="mute-link">Privacy Policy</a>.</span>
        </span></p>
      </div>
    </div>
  );
}

SocialSignup.propTypes = {
  changeType: PropTypes.func
};
