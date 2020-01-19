const routes = require('express').Router();
const newsController = require('./news.js')
const tagController = require('./tag.js')

routes.use('/news', newsController)
routes.use('/tag', tagController)

module.exports = routes