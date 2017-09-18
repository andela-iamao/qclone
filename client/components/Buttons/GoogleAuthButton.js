import PropTypes from 'prop-types';
import style from './style';

export default function GoogleAuthButton({text, onClick}) {
  return (
    <a href="#" className="google-button submit-button" onClick={onClick}>
      <span id="google-text" style={style.googleAuthButton.text}>
        {text}
      </span>
    </a>
  );
}

GoogleAuthButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};
