const { GraphQLID, GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'AnswerLater',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    question: {
      type: GraphQLID
    }
  })
});
