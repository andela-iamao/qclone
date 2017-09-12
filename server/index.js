require('dotenv').config();

const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schemas');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

const server = createServer(app);

server.listen(PORT, (err) => {
  if (err) throw err;

  console.info('> Started on port', PORT);
});
