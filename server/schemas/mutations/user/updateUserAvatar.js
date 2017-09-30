const { GraphQLNonNull } = require('graphql');
const UserType = require('../../../types/output/user/getUser');
const UploadAvatarInputType = require('../../../types/input/user/updateAvatar');

module.exports = {
  type: UserType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UploadAvatarInputType)
    }
  },
  resolve: async (root, { data: { avatar, remove } }, { user, db }) => {
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
    currentUser.profile_photo = !remove ? `/${avatar.path.split('/').reverse()[0]}` : '';
    return currentUser.save();
  }
};
