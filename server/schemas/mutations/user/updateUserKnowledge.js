const { GraphQLNonNull } = require('graphql');
const UserKnowledgeType = require('../../../types/output/user/userKnowledge');
const UpdateUserKnowledgeInputType = require('../../../types/input/user/updateUserKnowledge');
const { User, Topic } = require('../../../db/schema');

module.exports = {
  type: UserKnowledgeType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UpdateUserKnowledgeInputType)
    }
  },
  resolve: async (root, { data }, { _, user }) => {
    const result = await User.findById(user.id);
    if (!result) {
      throw new Error('This user does not exist');
    }

    let { topic_knowledge } = result;

    const knowledge = _.union(topic_knowledge, data.topic_knowledge);

    result.topic_knowledge = knowledge;

    knowledge.forEach(async (interest) => {
      const topic = await Topic.findById(interest);
      let { followers } = topic;

      topic.followers = _.union(followers, [user.id]);
      topic.save();
    });

    return result.save();
  }
};
