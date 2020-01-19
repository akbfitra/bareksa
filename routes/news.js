const routes = require('express').Router();
const NewsController = require('../controllers/newsController.js')

routes.post('/', NewsController.create)
routes.get('/', NewsController.findAll)
routes.get('/filter', NewsController.filter)
routes.get('/:id', NewsController.findOne)
routes.put('/:id', NewsController.update)
routes.patch('/:id', NewsController.updateStatus)
routes.delete(':id', NewsController.delete)

module.exports = routes