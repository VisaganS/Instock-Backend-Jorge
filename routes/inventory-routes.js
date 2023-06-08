const router = require("express").Router();
const inventoriesControllers = require("../controllers/inventory-controller")

router.route('/')
.get()
.post(inventoriesControllers.add) 

router.route('/:id')
.get()
.put(inventoriesControllers.edit)
.delete()


module.exports = router;
