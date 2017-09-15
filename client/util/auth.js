// import jwt from 'jsonwebtoken';

module.exports = {
  getUserId() {
    if(localStorage.getItem('token')) {
      try {
        const item = localStorage.getItem('token').split('.')[1];
        const token = JSON.parse(atob(item));
        return token.user.id;
      } catch (error) {
        console.info(error);
      }
    }
  }
};
