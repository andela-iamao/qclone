import { Checkbox, Column, Radio } from 're-bulma';
// import { compose, graphql } from 'react-apollo';
import Leftbar from './Leftbar';
import Layout from '../Layout';
// import GraphQL from '../../GraphQL';
import withData from '../../../apollo/withData';


class PrivacyPage extends React.Component {
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
              <Leftbar active="privacy"/>
              <div className="settings-detail">
                <div className="settings-detail-head">
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Privacy Settings</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Allow search engines to index your name. <a href="#" className="mute-link">Learn more</a></span>
                      </Checkbox>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Allow other people to see when you are writing an answer.</span>
                      </Checkbox>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Allow adult content in your feed. <a href="#" className="mute-link">Learn more</a></span>
                      </Checkbox>
                    </div>
                  </div>
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Inbox Preferences</span><br />
                </div>
                <div className="settings-detail-content">
                  <br /><span className="mute-link">Which registered users would you like to receive messages from?</span><br /><br />
                  <Radio
                    data={[
                      { label: ' Allow any person on Quora to send me messages.', inputProps: { name: 'sample', onChange: () => null}},
                      { label: ' Allow any person on Quora I follow to send me messages.', inputProps: { name: 'sample', onChange: () => null}},
                      { label: ' Allow no one to send me messages.', inputProps: { name: 'sample', onChange: () => null}}
                    ]}
                  />
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Comment Preferences</span><br />
                </div>
                <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                  <div className="settings-detail-content-value">
                    <Checkbox>
                      <span> Allow other people to comment on your answers and posts.</span>
                    </Checkbox>
                  </div>
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Delete or Deactivate Your Account</span><br />
                </div>
                <div className="settings-detail-content-flex">
                  <div className="settings-detail-content-value">
                    <a href="#" className="quora-red">Deactivate Account</a>
                  </div>
                </div>
                <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                  <div className="settings-detail-content-value">
                    <a href="#" className="quora-red">Delete Account</a>
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

export default withData(PrivacyPage);
