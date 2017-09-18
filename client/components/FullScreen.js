import PropTypes from 'prop-types';

const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'absolute'
};

export default function FullScreen({bg, children}) {
  return (
    <div style={{...style, ...bg}}>
      <div style={{ position: 'relative', overflowY: 'hidden', height: '100vh', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}

FullScreen.propTypes = {
  bg: PropTypes.object,
  children: PropTypes.object
};
