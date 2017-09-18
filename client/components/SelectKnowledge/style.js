module.exports = {
  col: {
    margin: 'auto',
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    marginTop: 60,
    position: 'relative',
    left: 0,
    right: 0
  },
  actionCol: {
    textAlign: 'right'
  },
  searchCol: {
    paddingLeft: 0
  },
  knowledgeCol: (border) =>  ({
    height: '40vh',
    maxHeight: '40vh',
    overflowY: 'scroll',
    margin: 0,
    padding: 10,
    border: border ? '1px dashed #C0C0C0': 'none'
  }),
  searchResultCol: {
    maxHeight: '70vh',
    padding: 0,
    position: 'fixed',
    backgroundColor: '#FFF',
    overflowY: 'scroll',
    overflowX: 'hidden',
    top: 245,
    boxShadow: '0 2px 5px 0 rgba(200,200,200,0.6)'
  },
  searchResultAddTopic: {
  },
  searchResultUL: {
    margin: 0,
    padding: 0
  },
  searchList: {
    borderBottom: '1px solid #EFEFEF',
    listStyle: 'none',
    padding: 8,
    fontSize: 13,
    position: 'relative'
  },
  searchListSpan: {
    margin: 5
  },
  thumb: {
    position: 'absolute',
    width: 24,
    top: 10,
    right: 10
  },
  topicIcon: {
    width: 60
  },
  topicBox: {
    height: 60,
    margin: 5
  }
};
