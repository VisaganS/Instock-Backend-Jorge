const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller.js');

router.route('/').get(warehouseController.getAll);
router.route("/:id").get(warehouseController.findOne);
router.route("/").get(warehouseController.getAll).post(warehouseController.add);

module.exports = router;