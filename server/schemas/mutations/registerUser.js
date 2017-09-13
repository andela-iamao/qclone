const { GraphQLNonNull } = require('graphql');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const RegisterUser = require('../../types/user');
const UserInputType = require('../../types/input/registerUser');
const { User } = require('../../db/schema');

module.exports = {
  type: RegisterUser,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UserInputType)
    }
  },
  resolve: async (root, { data: user }) => {
    if (!validator.validate(user.email)) {
      throw new Error('The email address you entered is not valid.');
    } else if (user.password.length < 5) {
      throw new Error('Please use a password at least 5 characters long.');
    }
    const result = await User.findOne({ email: user.email });
    if (result) {
      throw new Error('An account with these credentials already exists.');
    }
    user.password = await bcrypt.hash(user.password, 12);
    const newUser = new User(user);
    return newUser.save();
  }
};
