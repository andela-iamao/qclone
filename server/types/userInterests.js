const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserInterests',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    interests: {
      type: new GraphQLList(GraphQLID)
    }
  })
});
