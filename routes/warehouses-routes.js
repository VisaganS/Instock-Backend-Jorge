const router = require('express').Router();
const userController = require('../controllers/warehouses-controller.js');

router.route('/').get(userController.getAll);


module.exports = router;