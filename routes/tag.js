const routes = require('express').Router();
const TagController = require('../controllers/tagController')

routes.post('/', TagController.create)
routes.get('/', TagController.findAll)
routes.get('/:id', TagController.findOne)
routes.put('/:id', TagController.update)
routes.delete('/:id', TagController.delete)

module.exports = routes