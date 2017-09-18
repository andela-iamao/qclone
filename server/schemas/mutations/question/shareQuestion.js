const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const ShareQuestionInputType = require('../../../types/input/question/shareQuestion');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(ShareQuestionInputType)
    }
  },
  resolve: async (root, { data }, { _, db, user }) => {
    const question = await db.Question.findById(data.id);
    if (data.social === 'twitter') {
      question.tweet_by = _.union(question.tweet_by, [user.id]);
    } else if (data.social === 'facebook') {
      question.facebook_by = _.union(question.facebook_by, [user.id]);
    }
    return question.save();
  }
};
