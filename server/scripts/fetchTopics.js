const Crawler = require('crawler');
const stopword = require('stopword');
const { Topic } = require('../db/schema');

const c = new Crawler({
  maxConnections: 10
});

c.queue([{
  uri: 'http://165.227.185.178/other/topic.html',

  // The global callback won't be called
  callback: function (error, res, done) {
    if(error) {
      console.info(error);
    } else {
      const $ = res.$;
      Object.keys($('.TopicNameSpan')).forEach((span) => {
        if ($('.TopicNameSpan')[span]['children'] && $('.TopicNameSpan')[span]['children'][0]) {
          let topic = new Topic({ title: $('.TopicNameSpan')[span]['children'][0].data, image: $('.topic_photo_img')[span].attribs.src });
          topic.keywords = stopword.removeStopwords($('.TopicNameSpan')[span]['children'][0].data.toLowerCase().split(' '));
          topic.save();
        }
      });
    }
    done();
  }
}]);

//topic_photo_img
