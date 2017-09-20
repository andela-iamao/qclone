const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'CreateAnswerInput',
  fields: {
    content: {
      type: GraphQLString
    },
    question: {
      type: GraphQLID
    },
    draft: {
      type: GraphQLBoolean
    }
  }
});
