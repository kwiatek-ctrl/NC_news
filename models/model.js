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
exports.selectPostCommentByArticleId = (article_id, username, body) => {
    return db
    .query('INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *', [article_id, username, body])
    .then(({rows}) => {
        return rows[0]
    })
    .catch((err) => {
        if (err.code === '23503') {
            return Promise.reject({ status: 404, msg: 'Article not found!' })
        }
        return Promise.reject(err)
    })
}
