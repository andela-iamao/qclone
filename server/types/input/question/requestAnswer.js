const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'RequestAnswerInput',
  fields: {
    userId: {
      type: GraphQLID
    },
    questionId: {
      type: GraphQLID
    }
  }
});
