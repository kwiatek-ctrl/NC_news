const express = require('express')
const db = require('../db/connection')
const endpointsJson = require("../endpoints.json");
const app = express()
const {getApi, getTopics} = require('../controllers/controller')

app.get('/api', getApi)
app.get('/api/topics', getTopics)

module.exports = app