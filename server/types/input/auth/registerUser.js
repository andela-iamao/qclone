const { GraphQLInputObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'RegisterUserInput',
  fields: {
    firstname: {
      type: GraphQLString
    },
    lastname: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
});
