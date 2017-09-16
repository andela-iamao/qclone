
const { GraphQLInputObjectType, GraphQLString, GraphQLList } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateUserKnowledgeInput',
  fields: {
    topic_knowledge: {
      type: new GraphQLList(GraphQLString)
    }
  }
});
