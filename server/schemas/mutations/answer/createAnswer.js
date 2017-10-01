const { GraphQLNonNull } = require('graphql');
const AnswerType = require('../../../types/output/answer/createAnswer');
const AnswerInputType = require('../../../types/input/answer/createAnswer');

module.exports = {
  type: AnswerType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(AnswerInputType)
    }
  },
  resolve: async (root, { data }, { _, user, db }) => {
    const question = await db.Question.findById(data.question);

    const answerData = {...data};
    answerData.author = user.id;
    answerData.draft = data.draft;
    answerData.topics = question.topics;

    const answer = new db.Answer(answerData);
    const save = await answer.save();

    const authUser = await db.User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();
    if (!authUser) {
      throw new Error('user does not exist');
    }
    authUser.answers = _.union(authUser.answers.map((a) => a.id), [save.id]);
    await authUser.save();

    // if (data.draft) {
    //   question.drafts_by = _.union(question.drafts_by, [user.id]);
    //   question.drafts = _.union(question.drafts, [save.id]);
    // } else {
    question.answers_by = _.union(question.answers_by, [user.id]);
    question.answers = _.union(question.answers, [save.id]);
    // }
    await question.save();

    return save;
  }
};
