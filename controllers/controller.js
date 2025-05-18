const {selectTopics, selectArticleById, selectArticles, selectUsers, selectCommentsByArticleId, selectPostCommentByArticleId} = require('../models/model')
const endpoints = require('../endpoints.json')

exports.getApi = (req, res) => {
    res.status(200).send({endpoints})
}
exports.getTopics = (req, res, next) => {
    return selectTopics()
    .then((topics) => {
        res.status(200).send({topics})
    })
    .catch((err) => {
        next(err)
    })
}
exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params
    return selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}
exports.getArticles = (req, res, next) => {
    return selectArticles()
    .then((articles) => {
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}
exports.getUsers = (req, res, next) => {
    return selectUsers()
    .then((users) => {
        res.status(200).send({users})
    })
    .catch((err) => {
        next(err)
    })
}
exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
    return selectCommentsByArticleId(article_id)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}
exports.postCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const {username, body} = req.body
    if (!username || !body) {
        return next({status: 400, msg: 'Username and body are required'})
    }
    if (typeof username !== 'string' || typeof body !== 'string') {
        return next({status: 400, msg: 'Username and body must be strings'})
    }
    return selectPostCommentByArticleId(article_id, username, body)
    .then((comment) => {
        res.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}