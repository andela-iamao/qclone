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
    const currentUser = await db.User.findById(user.id);
    if (data.id) {
      let employment = db.Employment.findById(data.id);
      employment = { ...employment, ...data[data.credential] };
      await employment.save();
      return currentUser;
    } else {
      const employment = new db.Employment(data[data.credential]);
      const emp = await employment.save();
      currentUser.employment = _.union(currentUser.employment, [emp.id]);
      return  currentUser.save();
    }
  }
};
