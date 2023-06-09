const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller.js');

router.route('/')
.get(warehouseController.getAll)
.post(warehouseController.add)

router.route("/:id")
.get(warehouseController.findOne)
.put(warehouseController.edit)
.delete(warehouseController.remove)

router.route("/:id/inventories")
.get()

module.exports = router;