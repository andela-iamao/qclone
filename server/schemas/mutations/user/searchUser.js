const { GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const EventType = require('../../../types/output/user/getUser');

module.exports = {
  type: new GraphQLList(EventType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, { query }, { db }) => {
    const users = await db.User.find(
      { $or:[
        { firstname: { $regex: query, $options: 'i' } },
        { lastname: { $regex: query, $options: 'i' } }]
      });
    return users;
  }
};
