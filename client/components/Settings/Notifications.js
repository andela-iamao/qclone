import { Checkbox, Column, Radio } from 're-bulma';
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
        <Column style={{ margin: 'auto', maxHeight: '90vh', height: '98vh', overflowY: 'scroll' }}>
          <Column size="is9" style={{ margin: 'auto' }}>
            <div className="settings-container">
              <Leftbar active="notifications"/>
              <div className="settings-detail">
                <div className="settings-detail-head">
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Content for You</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Quora Digests</span>
                      </Checkbox>
                      <span className="mute-link">Quora Digest emails consist of Top Stories and other popular content from your feed.</span><br />
                      <div className="radio-inline">
                        <span>Email Frequency: </span>
                        <Radio
                          data={[
                            { label: ' Up to once a day', inputProps: { name: 'sample', onChange: () => null}},
                            { label: ' Weekly', inputProps: { name: 'sample', onChange: () => null}},
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Questions You Asked or Followed</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when there are new answers to questions you asked or followed.</span>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Quora Session Recaps</span>
                      </Checkbox>
                      <span className="mute-link">Session Recap emails consist of the best answers from a Quora Session.</span>
                    </div>
                  </div>
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Upvotes and New Followers</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Upvotes</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when another person upvotes your content.</span><br />
                      <div className="radio-inline">
                        <span>Notify Me About: </span>
                        <Radio
                          data={[
                            { label: ' Everything', inputProps: { name: 'sample', onChange: () => null}},
                            { label: ' Smart Filter Approved Content', inputProps: { name: 'sample', onChange: () => null}},
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> New Followers</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when a new person starts following you.</span><br />
                      <div className="radio-inline">
                        <span>Notify Me About: </span>
                        <Radio
                          data={[
                            { label: ' Everything', inputProps: { name: 'sample', onChange: () => null}},
                            { label: ' Smart Filter Approved Content', inputProps: { name: 'sample', onChange: () => null}},
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> People You Might Know</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when we find people you might want to follow.</span><br />
                    </div>
                  </div>
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Messages, Mentions, and Comments</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> New Messages</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when someone sends you a new message on Quora.</span><br />
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Mentions</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when someone mentions you in an answer, comment, or post.</span><br />
                    </div>
                  </div>
                  <div className="settings-detail-content-flex">
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Comments</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when someone comments on your answers, questions, and posts.</span><br />
                      <div className="radio-inline">
                        <span>Notify Me About: </span>
                        <Radio
                          data={[
                            { label: ' Everything', inputProps: { name: 'sample', onChange: () => null}},
                            { label: ' Smart Filter Approved Content', inputProps: { name: 'sample', onChange: () => null}},
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Suggested Edits</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when someone suggests edits to your answers or posts.</span><br />
                    </div>
                  </div>
                </div>
                <div className="settings-detail-head" style={{ marginTop: 50 }}>
                  <span style={{ clear: 'both' }}/>
                  <span className="home-user-feeds">Topic Monitoring</span><br />
                </div>
                <div className="settings-detail-content">
                  <div className="settings-detail-content-flex" style={{ border: 'none' }}>
                    <div className="settings-detail-content-value">
                      <Checkbox>
                        <span> Topic FAQs</span>
                      </Checkbox>
                      <span className="mute-link">{'We\'ll'} email you when someone edits a Topic FAQ you monitor.</span><br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Column>
          <div style={{ clear: 'both', height: 150 }}/>
        </Column>
      </Layout>
    );
  }
}

export default withData(Settings);
