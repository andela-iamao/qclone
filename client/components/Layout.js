import PropTypes from 'prop-types';

const css = `
  body {
    margin: 0 auto;
  }
  h1 {
    color: blue;
  }
`;

// const r = require('../styles/index.css');

export default function Layout({children}) {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.object
};
