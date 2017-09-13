const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const UserInputType = require('../../types/input/loginUser');
const { User } = require('../../db/schema');

module.exports = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UserInputType)
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
    const token = jwt.sign(
      { user: _.pick(user, ['id', 'firstname', 'lastname']) },
      SECRET,
      { expiresIn: '1h' }
    );
    return token;
  }
};
