const express = require("express");
const server = express();

const db = require("../data/dbConfig.js");

server.use(express.json());





server.get('/', (req, res) => {
    res.send('Server is working')
})

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json({ accounts: accounts })
    })
    .catch(err => console.log(err))
})

server.get(`/api/accounts/:id`, (req, res) => {
    db.select('*').from('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => console.log(err))
})

server.post('/api/accounts', (req, res) => {
    db.select('*').from('accounts')
    .insert(req.body, "id")
    .then( item => {
        if (item){
            res.status(201).json({ new_post_id: item })
        } else {
            res.status(500).json({ error: "error adding account" })
        }
    })
    .catch(err => console.log(err))
})

server.put(`/api/accounts/:id`, (req, res) => {
    db.select('*').from('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(item => {
        if (item > 0){
            res.status(200).json({ message: "updated successfully" })
        } else {
            res.status(404).json({ error: "404 error not found" })
        }
    })
    .catch(err => console.log(err))
})

server.delete(`/api/accounts/:id`, (req, res) => {
    db.select('*').from('accounts')
    .where({ id: req.params.id })
    .del()
    .then(item => {
        if (item > 0){
            res.status(200).json({ message: "item deleted successfully" })
        } else {
            res.status(404).json({ message: "404 error not found" })
        }
    })
    .catch(err => console.log(err))
})


module.exports = server;
