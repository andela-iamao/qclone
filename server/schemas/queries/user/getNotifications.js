const { GraphQLList } = require('graphql');
const EventType = require('../../../types/output/notification/getNotification');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { _, db, user }) => {
    // const authUser = await db.User.findById(user.id)
    //   .populate('employment')
    //   .populate('education')
    //   .populate('location')
    //   .populate('topic_knowledge')
    //   .populate('answers')
    //   .populate('questions')
    //   .populate('followers')
    //   .populate('following')
    //   .exec();
    const notification = await db.Notification.find({ owner: user.id })
      .populate('question')
      .populate('answer')
      .populate('user')
      .exec();
    return notification;
    // return authUser;
  }
};
