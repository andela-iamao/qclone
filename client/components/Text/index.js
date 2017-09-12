import PropTypes from 'prop-types';
import style from './style';

export default function Text ({ text, children, size, weight }) {
  const content = text || children;
  return (
    <p style={style.text(size, weight)}>{content}</p>
  );
}

Text.propTypes = {
  text: PropTypes.string,
  children: PropTypes.object,
  size: PropTypes.number,
  weight: PropTypes.string
};
