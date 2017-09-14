const Crawler = require('crawler');
const { Topic } = require('../db/schema');

const c = new Crawler({
  maxConnections: 10
});

c.queue([{
  uri: 'http://localhost:3000/other/topic.html',

  // The global callback won't be called
  callback: function (error, res, done) {
    if(error) {
      console.info(error);
    } else {
      const $ = res.$;
      Object.keys($('.TopicNameSpan')).forEach((span) => {
        if ($('.TopicNameSpan')[span]['children'] && $('.TopicNameSpan')[span]['children'][0]) {
          let topic = new Topic({ title: $('.TopicNameSpan')[span]['children'][0].data, image: $('.topic_photo_img')[span].attribs.src });
          topic.save();
        }
      });
    }
    done();
  }
}]);

//topic_photo_img
