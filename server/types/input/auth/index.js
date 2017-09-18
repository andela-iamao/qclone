const loginUser = require('./loginUser');
const registerUser = require('./registerUser');
const updateRegistrationProgress = require('./updateRegistrationProgress');

module.exports = {
  LoginUserInputType: loginUser,
  RegisterUserInputType: registerUser,
  UpdateRegisterationProgressInputType: updateRegistrationProgress
};
