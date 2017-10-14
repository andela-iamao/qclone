const UserType = require('../../types/user');
const { User } = require('../../db/schema');

module.exports = {
  type: UserType,
  resolve: async (root, args, { user }) => {
    if (!user) {
      throw new Error('This token has expired or the user is not logged in');
    }
    return await User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();
  }
};
