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
    ownAnswer: {
      type: new GraphQLObjectType({
        name: 'OwnAnswer',
        fields: () => ({
          id: {
            type: GraphQLID
          },
          content: {
            type: GraphQLString
          }
        })
      })
    },
    answers: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'QuestionAnswers',
        fields: () => ({
          id: {
            type: GraphQLID
          },
          content: {
            type: GraphQLString
          },
          author: {
            type: new GraphQLObjectType({
              name: 'QuestionAnswerAuthor',
              fields: () => ({
                id: {
                  type: GraphQLID
                },
                firstname: {
                  type: GraphQLString
                },
                lastname: {
                  type: GraphQLString
                }
              })
            })
          }
        })
      }))
    },
    topics: {
      type: new GraphQLList(GraphQLID)
    },
    topicsInfo: {
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
