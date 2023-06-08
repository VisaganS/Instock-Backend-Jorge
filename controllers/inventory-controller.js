const knex = require("knex")(require("../knexfile"));

const getAll = (_req, res) => {
  knex("inventories")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Data: ${err}`))
};

const findOne = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .then((itemFound) => {
      if (itemFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Inventory with ID: ${req.params.id} not found` });
      }

      const itemData = itemFound[0];

      res.status(200).json(itemData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve Inventory data for Item with ID: ${req.params.id}`,
      });
    });
};

const add = (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .send("Please provide all info for the new Inventory in the request");
  }

  knex("inventories")
    .insert(req.body)
    .then((result) => {
      return knex("inventories").where({ id: result[0] });
    })
    .then((createdInventory) => {
      res.status(201).json(createdInventory);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to creat new Inventory Item" });
    })
};



  const remove = (req, res) => {
    knex("inventories")
      .where({ id: req.params.id })
      .del()
      .then((result) => {
        if (result === 0) {
          return res.status(400).json({
            message: `Inventory with ID: ${req.params.id} to be deleted not found`,
          })
        }
        res.status(204);
      })
      .catch(() => {
        res.status(500).json({ message: "Unable to delete Inventory" });
      });
  };

  const edit = (req, res) => {
    if (
      !req.body.item_name ||
      !req.body.description ||
      !req.body.category ||
      !req.body.status ||
      !req.body.quantity
    ) {
      return res.status(400).json({
        message: `Unable to update ${req.body.item_name} Inventory please ensure all fields have been filled out`,
      });
    }

    knex("inventories")
      .where({ id: req.params.id })
      .then(() => {
        return knex("inventories").where({ id: req.params.id });
      })
      .then((editedInventory) => {
        if (editedInventory.length === 0) {
          return res.status(404).json({ message: "Inventory no found" });
        }
        res.status(200).json(editedInventory);
      })
      .catch((error) => {
        res.status(500).json(error)
      });
  };

  module.exports = {
    getAll,
    findOne,
    add,
    remove,
    edit
  };