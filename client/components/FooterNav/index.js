import PropTypes from 'prop-types';
import ownStyle from './style';

export default function FooterNav(props) {
  const style = props.style || ownStyle;
  return (
    <ul style={style.footerNav}>
      <li style={style.footerNavList}><a  className="mute-link" href="#">About</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Careers</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Businesses</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Sitemap</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Privacy</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">TermsContact</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Español</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Français</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Deutsch</a></li>
      <li style={style.footerNavList}><a  className="mute-link" href="#">Italiano</a></li>
    </ul>
  );
}

FooterNav.propTypes = {
  style: PropTypes.object
};
