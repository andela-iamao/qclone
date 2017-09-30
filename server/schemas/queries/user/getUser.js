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
  resolve: async (root, args, { db, user }) => {
    const authUser = await db.User.findById(user.id)
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