const express = require('express')
const db = require('../db/connection')
const endpointsJson = require("../endpoints.json");
const app = express()
const {getApi, getTopics, getArticleById, getArticles, getCommentsByArticleId, postCommentByArticleId} = require('../controllers/controller')

app.get('/api', getApi)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

module.exports = app