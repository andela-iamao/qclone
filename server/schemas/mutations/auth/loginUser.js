const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { LoginUserInputType } = require('../../../types/input/auth');
const { User } = require('../../../db/schema');
const { signToken } = require('../../../utils/auth');

module.exports = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(LoginUserInputType)
    }
  },
  resolve: async (root, { data: { email, password } }, { SECRET }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No user with that email');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }
    const token = signToken(_.pick(user, ['id', 'firstname', 'lastname', 'profile_photo']), SECRET);
    return token;
  }
};
