const UserType = require('../../types/user');
const { User } = require('../../db/schema');
const getProjection = require('../../utils/projection');

module.exports = {
  type: UserType,
  resolve: (root, args, { user }, fieldASTs) => {
    if (!user) {
      throw new Error('This token has expired or the user is not logged in');
    }
    return new Promise((resolve, reject) => {
      const projection = getProjection(fieldASTs);
      User.findById(user.id)
        .select(projection)
        .exec()
        .then((data) => resolve(data))
        .catch((errors) => reject(errors));
    });
  }
};
