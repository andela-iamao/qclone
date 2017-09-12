import PropTypes from 'prop-types';

const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden'
};

export default function FullScreen({bg, children}) {
  return (
    <div style={{...style, ...bg}}>
      {children}
    </div>
  );
}

FullScreen.propTypes = {
  bg: PropTypes.object,
  children: PropTypes.object
};
