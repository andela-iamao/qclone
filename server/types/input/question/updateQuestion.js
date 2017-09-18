const { GraphQLInputObjectType, GraphQLID, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateQuestionInput',
  fields: {
    id: {
      type: GraphQLID
    },
    content: {
      type: GraphQLString
    }
  }
});
