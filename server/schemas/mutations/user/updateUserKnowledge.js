const { GraphQLNonNull } = require('graphql');
const UserKnowledgeType = require('../../../types/output/user/getUser');
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
    const result = await User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();

    if (!result) {
      throw new Error('This user does not exist');
    }

    let { topic_knowledge } = result;
    if (data.remove) {
      const knowledge = _.remove(topic_knowledge, (knowledge) => data.topic_knowledge[0] !== knowledge.id);

      result.topic_knowledge = knowledge;

      const topic = await Topic.findById(data.topic_knowledge[0]);

      topic.followers = _.remove(topic.followers, (id) => user.id !== id);
      await topic.save();
    } else {
      const knowledge = _.union(topic_knowledge.map((a) => a.id), data.topic_knowledge);

      result.topic_knowledge = knowledge;

      knowledge.forEach(async (interest) => {
        const topic = await Topic.findById(interest);
        let { followers } = topic;

        topic.followers = _.union(followers, [user.id]);
        topic.save();
      });
    }

    await result.save();
    const authUser = await User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();
    return authUser;
  }

};
