const { GraphQLNonNull, GraphQLID } = require('graphql');
const EventType = require('../../../types/output/user/getUser');

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, { id }, { db }) => {
    const authUser = await db.User.findById(id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();
    return authUser;
  }
};
