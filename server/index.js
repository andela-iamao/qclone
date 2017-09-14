require('dotenv').config();

const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schemas');
const path = require('path');

const next = require('next');
const _ = require('lodash');
const { verifyToken } = require('./middlewares');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;


nextApp.prepare()
  .then(() => {
    const app = express();

    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '../client/static')));

    app.use(verifyToken);

    app.use('/graphql', graphqlExpress((req) => ({
      schema,
      context: {
        SECRET,
        _,
        user: req.user
      }
    })));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    const server = createServer(app);

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.info('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
