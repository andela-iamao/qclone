const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GetAnswer',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: new GraphQLObjectType({
        name: 'AnswerAuthor',
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
        name: 'AnswerQuestion',
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
    // followers: {
    //   type: new GraphQLList(new GraphQLObjectType({
    //     name: 'AnswerFollowers',
    //     fields: () => ({
    //       id: {
    //         type: GraphQLID
    //       },
    //       firstname: {
    //         type: GraphQLString
    //       },
    //       lastname: {
    //         type: GraphQLString
    //       },
    //       email: {
    //         type: GraphQLString
    //       }
    //     })
    //   }))
    // },
    upvotes: {
      type: new GraphQLList(GraphQLID)
    },
    // topics: {
    //   type: new GraphQLList(new GraphQLObjectType({
    //     name: 'AnswerTopics',
    //     fields: () => ({
    //       id: {
    //         type: GraphQLID
    //       },
    //       title: {
    //         type: GraphQLString
    //       }
    //     })
    //   }))
    // },
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
