import { Nav, Column, Columns } from 're-bulma';
import Progress from './Progress';
import NavItems from './Navitems';
import NavLogo from '../Logo/NavLogo';
import style from './style';

export default class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = { currentPath: '/' };
  }

  componentDidMount() {
    this.setState({ currentPath: window.location.pathname });
  }

  render() {
    const { isAuth, isProgress, router } = this.props;
    return (
      <Nav style={style.navContainer} hasShadow>
        <Column size="is9" style={style.navCol}>
          <Columns>
            <Column size={isProgress ? 'is3' : 'is2'}>
              <NavLogo />
            </Column>
            {isProgress && <Progress />}
            { !isProgress && isAuth && <NavItems router={router} currentPath={this.state.currentPath} />}
          </Columns>
        </Column>
      </Nav>
    );
  }
}
