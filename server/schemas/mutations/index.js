const createQuestion = require('./question/createQuestion');
const followQuestion = require('./question/followQuestion');
const shareQuestion = require('./question/shareQuestion');
const updateQuestion = require('./question/updateQuestion');
const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const updateUserInterest = require('./updateUserInterest');
const updateRegistrationProgress = require('./auth/updateRegistrationProgress');

// USER
const updateUserKnowledge = require('./user/updateUserKnowledge');
const passQuestion = require('./user/passQuestion');
// END USER

// TOPIC
const createTopic = require('./topic/createTopic');
// END TOPIC


module.exports = {
  createQuestion,
  shareQuestion,
  passQuestion,
  followQuestion,
  updateQuestion,
  registerUser,
  loginUser,
  updateUserInterest,
  updateRegistrationProgress,
  updateUserKnowledge,
  createTopic
};
