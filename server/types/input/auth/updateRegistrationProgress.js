const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateRegistrationProgressInput',
  fields: {
    registeration_progress: {
      type: GraphQLID
    }
  }
});
