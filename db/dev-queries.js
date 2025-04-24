const db = require('./connection')

db.query('SELECT * FROM users;')
    .then(({rows}) => {
        console.log('All users:', rows)
        return db.query("SELECT * FROM articles WHERE topic = 'coding';")
    })
    .then(({rows}) => {
        console.log('Articles on coding:', rows)
        return db.query('SELECT * FROM comments WHERE votes < 0;')
    })
    .then(({rows}) => {
        console.log('Negative vote comments:', rows)
        return db.query('SELECT * FROM topics;')
    })
    .then(({rows}) => {
        console.log('Topic:', rows)
        return db.query("SELECT * FROM articles WHERE author = 'grumpy19';")
    })
    .then(({rows}) => {
        console.log('Articles by grumpy19:', rows)
        return db.query('SELECT * FROM comments WHERE votes > 10;')
    })
    .then(({rows}) => {
        console.log('Popular comments:', rows)
    })