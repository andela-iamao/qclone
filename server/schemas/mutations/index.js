const createQuestion = require('./createQuestion');
const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const updateUserInterest = require('./updateUserInterest');
const updateRegistrationProgress = require('./auth/updateRegistrationProgress');
const updateUserKnowledge = require('./profile/updateUserKnowledge');
const createTopic = require('./topic/createTopic');

module.exports = {
  createQuestion,
  registerUser,
  loginUser,
  updateUserInterest,
  updateRegistrationProgress,
  updateUserKnowledge,
  createTopic,
};
