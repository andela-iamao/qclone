import axios from 'axios';

export default {
  sendMessage(payload) {
    return new Promise((resolve) => {
      axios.post('/api/messages', payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => console.error(error));
    });
  },
  getConversations() {
    return new Promise((resolve) => {
      axios.get('/api/conversations')
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => console.error(error));
    });
  }
};
