const { GraphQLString, GraphQLNonNull } = require('graphql');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const _ = require('lodash');
const { RegisterUserInputType } = require('../../../types/input/auth');
const { User } = require('../../../db/schema');
const { signToken } = require('../../../utils/auth');

module.exports = {
  type: GraphQLString,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(RegisterUserInputType)
    }
  },
  resolve: async (root, { data: user }, { SECRET }) => {
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
    user.registeration_progress = 1;
    const newUser = new User(user);
    const savedUser = await newUser.save();
    const token = signToken(_.pick(savedUser, ['id', 'firstname', 'lastname', 'profile_photo']), SECRET);
    return token;
  }
};
