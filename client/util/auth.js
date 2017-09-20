// import jwt from 'jsonwebtoken';
import _ from 'lodash';

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
  },
  getUserInfo(info) {
    if(localStorage.getItem('token')) {
      try {
        const item = localStorage.getItem('token').split('.')[1];
        const token = JSON.parse(atob(item));
        return _.pick(token.user, info);
      } catch (error) {
        console.info(error);
      }
    }
  }
};
