const {selectApi, selectTopics} = require('../models/model')
const endpoint = require('../endpoints.json')

exports.getApi = (req, res, next) => {
    return selectApi()
    .then((articles) => {
        res(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}
exports.getTopics = (req, res, next) => {
    return selectTopics()
    .then((topics) => {
        res(200).send({topics})
    })
    .catch((err) => {
        next(err)
    })
}