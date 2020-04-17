const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.status(200).json({ message: 'graphQl' });
});

module.exports = server;
