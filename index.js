const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.use(cors());
const warehouseRoutes = require('./routes/warehouses-routes');
app.use(express.json());
// all users routes
app.use('/warehouses', warehouseRoutes);

app.use(cors());
const inventoryRoutes = require('./routes/inventory-routes');
app.use(express.json());

app.use('/inventory', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});