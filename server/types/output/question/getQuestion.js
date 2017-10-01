const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const TopicType = require('../../topic');

module.exports = new GraphQLObjectType({
  name: 'GetQuestion',
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
    answers_by: {
      type: new GraphQLList(GraphQLString)
    },
    answers: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'AnswersForQuestion',
        fields: () => ({
          id: {
            type: GraphQLID
          },
          content: {
            type: GraphQLString
          },
          created_at: {
            type: GraphQLString
          },
          author: {
            type: new GraphQLObjectType({
              name: 'QuestionAnswersAuthor',
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
                profile_credential: {
                  type: GraphQLString
                },
                profile_photo: {
                  type: GraphQLString
                }
              })
            })
          },
          views: {
            type: GraphQLID
          },
          upvotes: {
            type: new GraphQLList(GraphQLString)
          }
        })
      }))
    },
    author_id: {
      type: GraphQLID
    },
    author_details: {
      type: new GraphQLObjectType({
        name: 'AuthorDetails',
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
          profile_credential: {
            type: GraphQLString
          },
          profile_photo: {
            type: GraphQLString
          }
        })
      })
    },
    topics: {
      type: new GraphQLList(TopicType)
    },
    views: {
      type: GraphQLID
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
