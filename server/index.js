require('dotenv').config();

const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const apolloUploadExpress = require('apollo-upload-server').apolloUploadExpress;
const schema = require('./schemas');
const path = require('path');
const db = require('./db/schema');

const next = require('next');
const _ = require('lodash');
const stopword = require('stopword');
const { verifyToken } = require('./middlewares');
const apiRoutes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const app = express();

const server = createServer(app);

let socketIO;

io(server).on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });
  socketIO = socket;
});

app.use(bodyParser.json({limit:1024*1024*2000, type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding'}));

nextApp.prepare()
  .then(() => {
    app.use(express.static(path.join(__dirname, '../client/static')));
    app.use(express.static(path.join(__dirname, '/temp/uploads')));

    app.use(verifyToken);

    app.use(apolloUploadExpress({
      // Optional, defaults to OS temp directory
      uploadDir: path.join(__dirname, '/temp/uploads')
    }));



    app.use('/graphql', graphqlExpress((req) => ({
      schema,
      context: {
        SECRET,
        _,
        stopword,
        user: req.user,
        db,
        socketIO
      }
    })));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));

    app.get('/question/:id', (req, res) => {
      const actualPage = '/question';
      const queryParams = { id: req.params.id };
      nextApp.render(req, res, actualPage, queryParams);
    });

    app.get('/question/:questionId/answer/:answerId', (req, res) => {
      const actualPage = '/question/answer';
      const queryParams = {
        questionId: req.params.questionId,
        answerId: req.params.answerId
      };
      nextApp.render(req, res, actualPage, queryParams);
    });

    app.get('/profile/:id', (req, res) => {
      const actualPage = '/profile';
      const queryParams = { id: req.params.id };
      nextApp.render(req, res, actualPage, queryParams);
    });

    apiRoutes(app);

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.info(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
