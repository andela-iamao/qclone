const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'DeleteQuestionInput',
  fields: {
    id: {
      type: GraphQLID
    }
  }
});
