const router = require("express").Router();
const inventoriesControllers = require("../controllers/inventory-controller")

router.route('/')
.get()
.post(inventoriesControllers.add) 

router.route('/:id')
.get()
.put()
.delete()


module.exports = router;
