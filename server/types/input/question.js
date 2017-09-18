const { GraphQLInputObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'CreateQuestionInput',
  fields: {
    content: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    }
  }
});
