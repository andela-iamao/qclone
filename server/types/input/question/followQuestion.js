const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'FollowQuestionInput',
  fields: {
    id: {
      type: GraphQLID
    }
  }
});
