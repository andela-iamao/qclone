const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

// const User = require('../user/getUser');

module.exports = new GraphQLObjectType({
  name: 'Answers',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: new GraphQLObjectType({
        name: 'AnswersAuthor',
        fields: () => ({
          id: {
            type: GraphQLID
          },
          firstname: {
            type: GraphQLString
          },
          lastname: {
            type: GraphQLString
          },
          profile_photo: {
            type: GraphQLString
          },
          profile_credential: {
            type: GraphQLString
          }
        })
      })
    },
    question: {
      type: new GraphQLObjectType({
        name: 'AnswersQuestion',
        fields: () => ({
          id: {
            type: GraphQLID
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
          followers: {
            type: new GraphQLList(GraphQLString)
          },
          answers: {
            type: new GraphQLList(GraphQLString)
          }
        })
      })
    },
    upvotes: {
      type: new GraphQLList(GraphQLID)
    },
    tweet_by: {
      type: new GraphQLList(GraphQLID)
    },
    facebook_by: {
      type: new GraphQLList(GraphQLID)
    },
    views: {
      type: GraphQLID
    },
    downvote: {
      type: new GraphQLList(GraphQLID)
    },
    draft: {
      type: GraphQLBoolean
    },
    active: {
      type: GraphQLBoolean
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
