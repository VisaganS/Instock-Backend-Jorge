const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller.js');

router.route('/')
.get(warehouseController.getAll)
.post(warehouseController.add)

router.route("/:id")
.get(warehouseController.findOne)
.put()
.delete(warehouseController.remove)


module.exports = router;