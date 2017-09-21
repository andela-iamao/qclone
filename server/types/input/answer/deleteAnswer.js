const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'DeleteAnswerInput',
  fields: {
    id: {
      type: GraphQLID
    }
  }
});
