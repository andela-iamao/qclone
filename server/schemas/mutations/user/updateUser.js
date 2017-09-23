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
    const currentUser = await db.User.findById(user.id);
    Object.keys(data).forEach((field) => {
      if (data[field]) {
        currentUser[field] = data[field];
      }
    });
    return currentUser.save();
  }
};
