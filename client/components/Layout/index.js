import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import Nav from '../Nav';
import GraphQL from '../../GraphQL';
import { initStore } from '../../store';
import withData from '../../../apollo/withData';
import { getUserId } from '../../util/auth';

const userList = [
  'id',
  'firstname',
  'lastname',
  'profile_photo',
  'profile_credential',
  'description',
  'employment { id, position, company, start, end }',
  'education { id, school, concentration, secondary_concentration, degree_type, graduation_year }',
  'location { id, start, end, location, active }',
  'topic_knowledge { id, title, image }',
  'interests { id, title, image }',
  'questions { id, author, content, followers }',
  'answers { id, content, question { id, content }, upvotes, created_at, views }',
  'followers { id, firstname, lastname }',
  'following { id, firstname, lastname }'
];

const QUERY_GET_USER = GraphQL.QUERY_GET_USER(userList);


class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    user: {
      profile_photo: '',
      id: ''
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount() {
    this.setState({ active: true });
  }

  render() {
    const { children, router, isProgress, user } = this.props;
    if (!this.state.active) {
      return <div />;
    }
    return (
      <div>
        <Nav id={getUserId()} isAuth router={router} isProgress={isProgress} />
        {children}
      </div>
    );
  }
}


export default withRedux(initStore, null, null)(Layout);