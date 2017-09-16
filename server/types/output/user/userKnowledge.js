const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserKnowledge',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    topic_knowledge: {
      type: new GraphQLList(GraphQLString)
    }
  })
});
