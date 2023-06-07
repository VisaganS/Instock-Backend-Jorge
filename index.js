const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;

const warehouseRoutes = require('./routes/warehouses-routes');
app.use(express.json());
// all users routes
app.use('/warehouses', warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});