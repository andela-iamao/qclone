const { GraphQLNonNull, GraphQLID } = require('graphql');
const EventType = require('../../../types/output/answer/getAnswer');

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, { id }, { db }) => {
    const answer = await db.Answer.findById(id)
      .populate('topics')
      .populate('question')
      .populate('author')
      .exec();
    answer.views = answer.views + 1;
    return answer.save();
  }
};
