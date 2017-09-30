const { GraphQLNonNull } = require('graphql');
const UserType = require('../../../types/output/user/getUser');
const UpdateUserInputType = require('../../../types/input/user/followUser');

module.exports = {
  type: UserType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UpdateUserInputType)
    }
  },
  resolve: async (root, { data }, { _, user, db }) => {
    const currentUser = await db.User.findById(user.id);
    const targetUser = await db.User.findById(data.id);
    if (_.intersection(currentUser.following, [data.id]).lenth > 0) {
      currentUser.following = _.remove(currentUser.following, data.id);
      targetUser.followers = _.remove(targetUser.followers, user.id);
      await targetUser.save();
      return currentUser.save();
    }
    currentUser.following = _.union(currentUser.following, [data.id]);
    targetUser.followers = _.union(targetUser.followers, [user.id]);
    await targetUser.save();
    return currentUser.save();
  }
};
