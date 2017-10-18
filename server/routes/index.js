const _ = require('lodash');
const db = require('../db/schema');

module.exports = async function (app) {
  app.post('/api/messages', async (req, res) => {
    let conversation;
    let message;
    conversation = await db.Conversation.findOne({ starter: req.user.id, target: req.body.receiver });
    if (!conversation) {
      conversation = await db.Conversation.findOne({ target: req.user.id, starter: req.body.receiver });
      if(!conversation) {
        conversation = new db.Conversation({ target: req.body.receiver, starter: req.user.id });
        await conversation.save();
      }
    }
    message = new db.Message({
      message: req.body.message,
      receiver: req.body.receiver,
      sender: req.user.id,
      conversation: conversation.id
    });
    await message.save();
    conversation.messages = _.union(conversation.messages, [message.id]);
    conversation.updated_at = Date.now();
    await conversation.save();
    return res.status(200).json({ message: message });
  });

  app.get('/api/messages/unread', async(req, res) => {
    const messages = await db.Message.find({ receiver: req.user.id, read: false });
    return res.status(200).json({ messages });
  });

  app.put('/api/messages/:id/read', async(req, res) => {
    const message = await db.Message.findById(req.params.id);
    message.read = true;
    await message.save();
    return res.status(204);
  });

  app.get('/api/conversations', async(req, res) => {
    const conversation = await db.Conversation.find({$or:[
      { starter: req.user.id },
      { target: req.user.id }
    ]})
      .sort({ 'updated_at': -1 })
      .populate('messages')
      .populate('target')
      .populate('starter')
      .exec();
    // const conversation = _.union(conversation_starter, conversation_target);
    return res.status(200).json({ conversations: _.union(conversation) });
  });

  app.get('/api/conversations/:id', async(req, res) => {
    let conversation;
    conversation = await db.Conversation.find({$or:[
      { starter: req.user.id, target: req.body.receiver },
      { target: req.user.id, starter: req.body.receiver }
    ]}
    )
      .populate('messages')
      .populate('target')
      .populate('starter')
      .exec();
    return res.status(200).json({ conversation });
  });

  app.put('/api/conversations/:id/read', async(req, res) => {
    const conversation = await db.Conversation.findById(req.params.id);

    try {
      await db.Message.bulkWrite([{
        updateMany: {
          filter: { _id: { $in: [...conversation.messages] }, receiver: req.user.id },
          update: { read: true }
        }
      }]);
    } catch(err) {
      console.error(err);
    }

    const updatedConversation = await db.Conversation.findById(req.params.id)
      .populate('messages')
      .populate('target')
      .populate('starter')
      .exec();

    return res.status(200).json({ conversation: updatedConversation });
  });
};
