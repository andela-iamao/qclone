const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Topic',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    followers: {
      type: new GraphQLList(GraphQLID)
    },
    image: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
