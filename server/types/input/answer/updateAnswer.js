const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateAnswerInput',
  fields: {
    content: {
      type: GraphQLString
    },
    id: {
      type: GraphQLID
    },
    draft: {
      type: GraphQLBoolean
    }
  }
});
