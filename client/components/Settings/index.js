import { Checkbox, Column } from 're-bulma';
// import { compose, graphql } from 'react-apollo';
import Leftbar from './Leftbar';
import Layout from '../Layout';
// import GraphQL from '../../GraphQL';
import withData from '../../../apollo/withData';


class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = { active: false };
  }
  componentDidMount() {
    this.setState({ active: true });
  }
  render() {
    if (!this.state.active) {
      return <div />;
    }
    return (
      <Layout isAuth>
        <Column style={{ margin: 'auto', backgroundColor: '' }}>
          <Column size="is9" style={{ margin: 'auto' }}>
            <div className="settings-container">
              <Leftbar active="account"/>
              <div className="settings-detail">
                <div className="settings-detail-head">
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Account</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-key">
                      <span>Primary Email</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <span>ashamao90@gmail.com</span><br />
                      <a href="#">Add Another Email Address</a>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-key">
                      <span>Change Password</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <a href="#">Change Password</a>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                    <div className="settings-detail-content-key">
                      <span>Logout</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <a href="#">Logout of all other browsers</a>
                    </div>
                  </div>
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Connected Accounts</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex">
                    <div className="google-icon-small"></div>
                    <div className="settings-detail-content-key">
                      <span>Google</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <span>ashamao90@gmail.com</span><span> <a href="#" className="mute-link">Disconnect</a></span>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="twitter-icon-small"></div>
                    <div className="settings-detail-content-key">
                      <span>Twitter</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <span>@ash__amao</span> <span><a href="#" className="mute-link">Disconnect</a></span><br /><br />
                      <Checkbox>Visible on profile</Checkbox>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="facebook-icon-small"></div>
                    <div className="settings-detail-content-key">
                      <span>Facebook</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <a href="#">Connect Facebook Account</a>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <span className="linkedin-icon-small"></span>
                    <div className="settings-detail-content-key">
                      <span>LinkedIn</span>
                    </div>
                    <div className="settings-detail-content-value">
                      <a href="#">Connect LinkedIn Account</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Column>
        </Column>
      </Layout>
    );
  }
}

export default withData(Settings);
