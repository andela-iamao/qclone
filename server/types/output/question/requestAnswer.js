const { GraphQLID, GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'AnswerRequest',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    target: {
      type: GraphQLID
    },
    by: {
      type: GraphQLID
    },
    question: {
      type: GraphQLID
    }
  })
});
