const EventType = require('../../../types/output/notification/getNotification');
const NotificationInputType = require('../../../types/input/notification/updateNotification');

module.exports = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: NotificationInputType
    }
  },
  resolve: async (root, { data }, { db }) => {
    const notification = await db.Notification.findById(data.id);

    Object.keys(data).forEach((field) => {

      if (data[field] && field !== 'id') {
        notification[field] = data[field];
      }
    });
    return notification.save();
  }
};
