const { GraphQLNonNull } = require('graphql');
const UserType = require('../../../types/output/user/getUser');
const AddCredentialInputType = require('../../../types/input/user/addCredentials');

module.exports = {
  type: UserType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(AddCredentialInputType)
    }
  },
  resolve: async (root, { data }, { _, user, db }) => {
    const currentUser = await db.User.findById(user.id)
      .populate('education')
      .populate('employment')
      .populate('location')
      .exec();

    if (data[data.credential].id) {
      let credentials = await db[_.upperFirst(data.credential)].findById(data[data.credential].id).exec();
      Object.keys(data[data.credential]).forEach((cred) => {
        credentials[cred] = data[data.credential][cred];
      });

      await credentials.save();
      return db.User.findById(user.id)
        .populate('education')
        .populate('employment')
        .populate('location')
        .exec();
    } else {
      const credentials = new db[_.upperFirst(data.credential)](data[data.credential]);
      const cred = await credentials.save();
      currentUser[data.credential] = _.union(currentUser[data.credential], [cred.id]);
      if (!currentUser.deafault_credentials) {
        currentUser.deafault_credentials = `${data.credential}-${data[data.credential]}`;
      }
      return  currentUser.save();
    }
  }
};
