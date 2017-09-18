import PropTypes from 'prop-types';

export default function Logo ({ style }) {
  return (
    <div style={style && {...style}} className="quora-logo">
      <a href="#" className="hidden">
        <span>Quora</span>
      </a>
    </div>
  );
}

Logo.propTypes = {
  style: PropTypes.object
};
