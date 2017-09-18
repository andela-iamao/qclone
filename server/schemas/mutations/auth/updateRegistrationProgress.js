const { GraphQLNonNull } = require('graphql');
const EventType = require('../../../types/registrationProgress');
const { UpdateRegisterationProgressInputType } = require('../../../types/input/auth');
const { User } = require('../../../db/schema');

module.exports = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UpdateRegisterationProgressInputType)
    }
  },
  resolve: async (root, { data: { registeration_progress } }, { user }) => {
    const result = await User.findById(user.id);
    if (!result) {
      throw new Error('This user does not exist');
    }

    result.registeration_progress = parseInt(registeration_progress ) + 1;

    return result.save();
  }
};
