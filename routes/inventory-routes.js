const router = require("express").Router();
const inventoryController = require('../controllers/inventory-controller.js')

router.route('/')
.get(inventoryController.getAll)
.post(inventoryController.add) 

router.route('/:id')
.get(inventoryController.findOne)
.put(inventoryController.edit)
.delete(inventoryController.remove)


module.exports = router;
