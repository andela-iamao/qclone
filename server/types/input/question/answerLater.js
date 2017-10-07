const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'AnswerLaterInput',
  fields: {
    questionId: {
      type: GraphQLID
    }
  }
});
