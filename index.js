const Schema = require('./schema');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');


var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));