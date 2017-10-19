const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const RegisterUserInputType = require('../../../types/input/question');
const { Topic, Question } = require('../../../db/schema');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(RegisterUserInputType)
    }
  },
  resolve: async (root, { data }, { db, user }) => {
    let conversation;
    let message;
    conversation = await db.Conversation.find({ starter: user.id, target: data.receiver });
    if (!conversation) {
      conversation = await db.Conversation.find({ target: user.id, starter: data.receiver });
      if(!conversation) {
        conversation = new db.Conversation({ target: data.receiver, starter: user.id });
        await conversation.save();
      }
    }
    message = new db.Message({
      message: data.message,
      receiver: data.receiver,
      sender: user.id,
      conversation: conversation.id
    });
    return message.save();
  }
};
