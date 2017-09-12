import PropTypes from 'prop-types';
import style from './style';

export default function FacebookAuthButton({text, onClick}) {
  return (
    <a href="#" className="facebook-button submit-button" onClick={onClick}>
      <span style={style.googleAuthButton.text}>
        {text}
      </span>
    </a>
  );
}

FacebookAuthButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};
