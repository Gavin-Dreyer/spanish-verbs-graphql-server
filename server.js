const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/graphql', graphqlHTTP({ schema }));

server.get('/', (req, res) => {
	res.status(200).json({ message: 'graphQl' });
});

module.exports = server;
