const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UserPassQuestionInputType',
  fields: {
    id: {
      type: GraphQLID
    }
  }
});
