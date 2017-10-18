import GraphQL from '../../GraphQL';

export default {
  MUTATION_SEARCH_USERS: GraphQL.MUTATION_SEARCH_USERS(
    ['id', 'profile_photo', 'profile_credential', 'firstname', 'lastname']),
  QUERY_LOGGED_IN_USER: GraphQL.QUERY_LOGGED_IN_USER(
    ['id', 'firstname', 'lastname', 'profile_photo', 'profile_credential'])
};
