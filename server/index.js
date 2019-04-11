const express = require('express');
const server = express();
server.use(express.json());

const db = require('../data/dbConfig.js');

server.get('/', (req,res) => {
    db('users')
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err));
})


module.exports = server;