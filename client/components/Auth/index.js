import { Column, Container, Tile, Input, Button, Columns } from 're-bulma';
import Login from '../Login';
import Logo from '../Logo';
import Text from '../Text';
import FooterNav from '../FooterNav';
import style from './style';

export default class Auth extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Column size="is7" style={style.formWrapper}>
            <Container style={style.headerContainer}>
              <Logo style={style.quoraLogo} />
              <p style={style.tagline}>A place to share knowledge and better understand the world</p>
            </Container>
            <Container>
              <Tile isVertical>
                <Tile>
                  <Tile context="isParent" isVertical style={style.signupBox}>
                    <Tile context="isChild" style={style.formBox}>
                      <Text size={14} weight="bold">Signup</Text>
                      <form>
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Columns>
                          <Column size="isThreeQuarters">
                            <a href="#" className="mute-link">Forgot password?</a>
                          </Column>
                          <Column>
                            <Button color="isInfo">Login</Button>
                          </Column>
                        </Columns>
                      </form>
                    </Tile>
                  </Tile>
                  <Tile context="isParent">
                    <Tile context="isChild" style={style.formBox}>
                      <Text size={14} weight="bold">Login</Text>
                      <Login />
                    </Tile>
                  </Tile>
                </Tile>
              </Tile>
            </Container>
            <br />
            <Container >
              <a style={style.languageBox} className="darken-link-bg-hover" href="#">Suchst Du Quora auf Deutsch? <i className="fa fa-chevron-right"/></a>
              <a style={style.languageBox} className="darken-link-bg-hover" href="#">Stai cercando Quora in italiano? <i className="fa fa-chevron-right"/></a>
            </Container>
          </Column>
          <Column size="is7" style={style.footerBox}>
            <FooterNav />
          </Column>
        </Container>
      </div>
    );
  }
}
