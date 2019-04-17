const express = require('express');
const server = express();
server.use(express.json());

const db = require('../data/dbConfig.js');

server.get('/', (req,res) => {
    db('users')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
})

server.post('/', (req,res) => {
    db('users')
        .insert(req.body)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(500).json(err));
})

server.delete('/', (req,res) => {
    const id = req.body.id;
    db('users')
        .delete()
        .where({id})
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
})


module.exports = server;