import { Nav, Column, Columns } from 're-bulma';
import Progress from './Progress';
import NavItems from './Navitems';
import NavLogo from '../Logo/NavLogo';
import style from './style';

export default function Navbar({ isAuth, isProgress, router }) {
  // let navigate = router;
  return (
    <Nav style={style.navContainer} hasShadow>
      <Column size="is8" style={style.navCol}>
        <Columns>
          <Column size={isProgress ? 'is3' : 'is2'}>
            <NavLogo />
          </Column>
          {isProgress && <Progress />}
          {isAuth && <NavItems router={router} />}
        </Columns>
      </Column>
    </Nav>
  );
}
