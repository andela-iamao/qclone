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
    const question = await db.Question.findById(id)
      .populate('topics')
      .populate('author_id')
      .populate({ path: 'answers', populate: { path: 'author' } })
      .exec();
    question.views = question.views + 1;
    await question.save();
    question.author_details = question.author_id;
    return question;
  }
};
