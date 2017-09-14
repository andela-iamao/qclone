const { GraphQLInputObjectType, GraphQLID, GraphQLList } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateUserInterestInput',
  fields: {
    interests: {
      type: new GraphQLList(GraphQLID)
    }
  }
});
