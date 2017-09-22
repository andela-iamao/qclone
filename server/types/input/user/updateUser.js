
const { GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require('graphql');

const Upload = require('./upload');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateUser',
  fields: {
    profile_credential: {
      type: GraphQLString
    }
  }
});
