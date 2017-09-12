import insertCss from 'insert-css';
import css from 're-bulma/build/css';

try {
  if (typeof document !== 'undefined' || document !== null) insertCss(css, { prepend: true });
} catch (e) {
  console.error(e);
}

const Bulma = ({children}) => (
  <div>
    {children}
  </div>
);

export default Bulma;
