const db = require('../db/connection')

exports.selectApi = () => {
    return db
    .query('SELECT * FROM * ')
    .then(({rows}) => {
        return rows[0]
    })
}
exports.selectTopic = (topics) => {
    return db
    ,query('SELECT * FROM topics')
    .then((result) => {
        console.log(result.rows);
        return result.rows
    })
}