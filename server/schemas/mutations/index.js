const createQuestion = require('./question/createQuestion');
const followQuestion = require('./question/followQuestion');
const tweetQuestion = require('./question/tweetQuestion');
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
  tweetQuestion,
  passQuestion,
  followQuestion,
  registerUser,
  loginUser,
  updateUserInterest,
  updateRegistrationProgress,
  updateUserKnowledge,
  createTopic
};
