const { GraphQLInputObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'LoginUserInput',
  fields: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
});
