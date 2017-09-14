const { GraphQLNonNull } = require('graphql');
const EventType = require('../../types/userInterests');
const EventInputType = require('../../types/input/updateUserInterests');
const { User, Topic } = require('../../db/schema');

module.exports = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },
  resolve: async (root, { data }, { _, user }) => {
    const result = await User.findById(user.id);
    if (!result) {
      throw new Error('This user does not exist');
    }

    let { interests } = result;

    const newInterests = _.union(interests, data.interests);

    result.interests = newInterests;

    newInterests.forEach(async (interest) => {
      const topic = await Topic.findById(interest);
      let { followers } = topic;

      topic.followers = _.union(followers, [user.id]);

      topic.save();
    });

    return result.save();
  }
};
