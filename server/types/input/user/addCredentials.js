
const { GraphQLID, GraphQLString, GraphQLInputObjectType } = require('graphql');
const Employment = require('./addEmploymentCredentials');

module.exports = new GraphQLInputObjectType({
  name: 'AddCredential',
  fields: {
    id: {
      type: GraphQLID
    },
    credential: {
      type: GraphQLString
    },
    employment: {
      type: Employment
    }
  }
});
