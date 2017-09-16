const { GraphQLInputObjectType, GraphQLID, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'ShareQuestionInput',
  fields: {
    id: {
      type: GraphQLID
    },
    social: {
      type: GraphQLString
    }
  }
});
