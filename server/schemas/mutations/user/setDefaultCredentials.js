const { GraphQLNonNull } = require('graphql');
const UserType = require('../../../types/output/user/getUser');
const AddDefaultCredentialInputType = require('../../../types/input/user/addCredentials');

module.exports = {
  type: UserType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(AddDefaultCredentialInputType)
    }
  },
  resolve: async (root, { data }, { user, db }) => {
    const currentUser = await db.User.findById(user.id)
      .populate('education')
      .populate('employment')
      .populate('location')
      .exec();

    let defaultCredentials = db.DefaultCredential.findById(data.id);
    if (defaultCredentials) {
      defaultCredentials = { ...defaultCredentials, ...data.default[data.default.credential] };
      await defaultCredentials.save();
    } else {
      const defaultCredentials = new db.DefaultCredential.findById({
        [data.default.credential]: data.default[data.default.credential].id,
        user: user.id
      });
      await defaultCredentials.save();
    }

    return  currentUser.save();
  }
};
