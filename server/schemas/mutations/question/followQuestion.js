const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const FollowQuestionInputType = require('../../../types/input/question/followQuestion');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(FollowQuestionInputType)
    }
  },
  resolve: async (root, { data }, { _, db, user }) => {
    const question = await db.Question.findById(data.id);
    let followers;
    if (question.followers.indexOf(user.id) > -1) {
      followers = _.remove(question.followers, (follower) => follower !== user.id);
    } else {
      followers = _.union(question.followers, [user.id]);
    }
    question.followers = followers;
    return question.save();
  }
};
