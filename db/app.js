const express = require('express')
const db = require('../db/connection')
const endpointsJson = require("../endpoints.json");

const app = express()

app.get('/api', (req, res) => {
    res.status(200).send({endpointsJson});
})


module.exports = app