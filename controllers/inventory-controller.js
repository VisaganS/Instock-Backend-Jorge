const knex = require("knex")(require("../knexfile"));
const validator = require("validator");

const checkNumber = (quantity) => {
  return validator.isNumeric(quantity);
};

const add = (req, res) => {
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

  if (!checkNumber(req.body.quantity)) {
    return res.status(400).json({
      message: `Please enter a number for quantity`,
    });
  }

  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .first()
    .then((response) => {
      if (!response) {
        return res.status(400).json({
          message:
            "The warehouse with the provided id does not exist. Please try again.",
        });
      } else {
        knex("inventories").insert(req.body);
        return res
          .status(201)
          .json({ message: "Successfully added inventory item" });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "An error occurred while adding the inventory item" });
    });
};

const edit = (req, res) => {
  if (!req.body.warehouse_id) {
    return res.status(400).json({
      message: `No information found for warehouse_id, please enter this information and try again `,
    });
  } else if (!req.body.item_name) {
    return res.status(400).json({
      message: `No information found for item_name, please enter this information and try again `,
    });
  } else if (!req.body.description) {
    return res.status(400).json({
      message: `No information found for description, please enter this information and try again `,
    });
  } else if (!req.body.category) {
    return res.status(400).json({
      message: `No information found for category, please enter this information and try again `,
    });
  } else if (!req.body.status) {
    return res.status(400).json({
      message: `No information found for status, please enter this information and try again `,
    });
  } else if (!req.body.quantity) {
    return res.status(400).json({
      message: `No information found for quantity, please enter this information and try again `,
    });
  }

  if (!checkNumber(req.body.quantity)) {
    return res.status(400).json({
      message: `Please enter a number for quantity`,
    });
  }

  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .first()
    .then((response) => {
      if (!response) {
        return res.status(400).json({
          message: `The warehouse with the id ${req.body.warehouse_id} does not exist. Please try again.`,
        });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "An error occurred while adding the inventory item" });
    });

  knex("inventories")
    .where({ id: req.params.id })
    .then((response) => {
      if (response.length === 0) {
        return res.status(404).json({
          message: `Cannot find inventory item with id ${req.params.id}`,
        });
      } else {
        knex("inventories").where({ id: req.params.id }).update(req.body);
        return res.status(200).json({ message: `Inventory item updated` });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: "An error occured" });
    });
};

module.exports = {
  add,
  edit,
};
