const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'RegistrationProgress',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    registeration_progress: {
      type: GraphQLID
    }
  })
});
