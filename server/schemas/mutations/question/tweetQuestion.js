const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const TweetQuestionInputType = require('../../../types/input/question/tweetQuestion');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(TweetQuestionInputType)
    }
  },
  resolve: async (root, { data }, { _, db, user }) => {
    const question = await db.Question.findById(data.id);
    let tweet_by = _.union(question.tweet_by, [user.id]);
    question.tweet_by = tweet_by;
    return question.save();
  }
};
