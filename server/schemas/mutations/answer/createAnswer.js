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

    question.answers_by = _.union(question.answers_by, [user.id]);
    question.answers = _.union(question.answers, [save.id]);
    await question.save();

    return save;
  }
};
