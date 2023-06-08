const knex = require("knex")(require("../knexfile"));

const add = (req, res) => {
  const checkNumber = Number(req.body.quantity);

  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).json({
      message: `Please ensure all fields for the inventory item are included `,
    });
  }

  if (!checkNumber) {
    return res.status(400).json({
      message: `Please enter a number for quantity`,
    });
  }

  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .first()
    .then((response) => {
      if (!response) {
        return res
          .status(400)
          .json(
            "The warehouse with the provided id does not exist. Please try again."
          );
      } else {
        knex("inventories").insert(req.body);
        return res.status(201).json("Successfully added inventory item");
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json("An error occurred while adding the inventory item");
    });
};

module.exports = {
  add,
};
