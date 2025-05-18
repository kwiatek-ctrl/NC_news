const express = require('express')
const db = require('./db/connection')
const endpointsJson = require("./endpoints.json");
const app = express()
const {getApi, getTopics, getArticleById, getArticles, getUsers, getCommentsByArticleId, postCommentByArticleId} = require('./controllers/controller')

app.get('/api', getApi)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/users', getUsers)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)


app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    if (err.code === '22P02'){
        res.status(400).send({msg: 'Invalid article_id'})
    } else if (err.code === '23503'){
        res.status(404).send({msg: 'Article not found!'})
    } else {
        res.status(500).send({msg: 'Internal server error'})
    }
})
app.use((req, res, next) => {
    res.status(404).send({msg: 'Path not found!'})
})

module.exports = app
