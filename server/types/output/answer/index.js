const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Answer',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: GraphQLString
    },
    // author: {
    //   type: new GraphQLObjectType({
    //     name: 'AnswerAuthor',
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
    //   })
    // },
    // question: {
    //   type: new GraphQLObjectType({
    //     name: 'AnswerQuestion',
    //     fields: () => ({
    //       id: {
    //         type: GraphQLID
    //       },
    //       content: {
    //         type: GraphQLString
    //       },
    //       author: {
    //         type: GraphQLString
    //       },
    //       author_id: {
    //         type: GraphQLID
    //       }
    //     })
    //   })
    // },
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
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
