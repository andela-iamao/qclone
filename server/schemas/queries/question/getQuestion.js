const { GraphQLNonNull, GraphQLID } = require('graphql');
const EventType = require('../../../types/output/question/getQuestion');

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, { id }, { db }) => {
    const question = await db.Question.findById(id).populate('topics').exec();
    return question;
  }
};
