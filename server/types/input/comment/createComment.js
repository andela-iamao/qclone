const { GraphQLInputObjectType, GraphQLString, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'CreateCommentInput',
  fields: {
    comment: {
      type: GraphQLString
    },
    answer: {
      type: GraphQLID
    }
  }
});
