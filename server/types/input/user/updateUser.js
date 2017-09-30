const { GraphQLString, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateUser',
  fields: {
    profile_credential: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});
