const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Question',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
    author_id: {
      type: GraphQLID
    },
    topics: {
      type: new GraphQLList(GraphQLID)
    },
    followers: {
      type: new GraphQLList(GraphQLString)
    },
    tweet_by: {
      type: new GraphQLList(GraphQLString)
    },
    downvote: {
      type: GraphQLID
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
