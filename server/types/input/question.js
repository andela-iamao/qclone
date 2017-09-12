const { GraphQLInputObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'QuestionInput',
  fields: {
    content: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    }
  }
});
