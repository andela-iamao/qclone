import { Nav, Progress, Column, Columns } from 're-bulma';
import NavLogo from '../Logo/NavLogo';
import style from './style';

export default function Navbar() {
  return (
    <Nav style={style.navContainer} hasShadow>
      <Column size="is8" style={style.navCol}>
        <Columns>
          <Column size="is2">
            <NavLogo />
          </Column>
          <Column align="center" size="is8" style={style.progessCol}>
            <h4 style={style.hTags}>Start</h4>
            <Progress color="isInfo" value="45" size="isSmall" max="100" style={style.progress} />
            <h4 style={style.hTags}>Finish</h4>
          </Column>
        </Columns>
      </Column>
    </Nav>
  );
}
