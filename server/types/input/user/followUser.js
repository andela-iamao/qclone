const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'FollowUser',
  fields: {
    id: {
      type: GraphQLID
    }
  }
});
