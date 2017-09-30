const { GraphQLNonNull } = require('graphql');
const UserType = require('../../../types/output/user/getUser');
const UpdateUserInputType = require('../../../types/input/user/updateUser');

module.exports = {
  type: UserType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UpdateUserInputType)
    }
  },
  resolve: async (root, { data }, { user, db }) => {
    const currentUser = await db.User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();

    Object.keys(data).forEach((field) => {
      if (data[field]) {
        currentUser[field] = data[field];
      }
    });
    return currentUser.save();
  }
};
