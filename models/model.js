const db = require('../db/connection')

exports.selectTopics = (topics) => {
    return db
    .query('SELECT * FROM topics')
    .then((result) => {
        return result.rows
    })
}
exports.selectArticleById = (article_id) => {
    return db
    .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Article not found!'})
        } else {
            return rows[0]
        }
    })
}
exports.selectArticles = (articles) => {
    return db
    .query('SELECT * FROM articles')
    .then((result) => {
        return result.rows
    })
}
exports.selectCommentsByArticleId = (article_id) => {
    return db
    .query('SELECT * FROM comments WHERE article_id = $1', [article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Article not found!'})
        } else {
            return rows
        }
    })
}