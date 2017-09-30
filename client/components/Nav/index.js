import { Nav, Column, Columns } from 're-bulma';
import Progress from './Progress';
import NavItems from './Navitems';
import NavLogo from '../Logo/NavLogo';
import style from './style';

export default class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = { currentPath: '/', tooltip: false };
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  componentDidMount() {
    this.setState({ currentPath: window.location.pathname });
  }

  toggleTooltip() {
    this.setState({ tooltip: !this.state.tooltip });
  }

  render() {
    const { isAuth, isProgress, router, avatar } = this.props;
    return (
      <Nav style={style.navContainer} hasShadow>
        <Column size="is9" style={style.navCol}>
          <Columns>
            <Column size={isProgress ? 'is3' : 'is2'}>
              <NavLogo />
            </Column>
            {isProgress && <Progress />}
            { !isProgress && isAuth &&
              <NavItems
                toggleTooltip={this.toggleTooltip}
                tooltip={this.state.tooltip}
                router={router}
                currentPath={this.state.currentPath}
                avatar={avatar}
              />}
          </Columns>
        </Column>
      </Nav>
    );
  }
}
