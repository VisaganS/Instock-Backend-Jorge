const knex = require("knex")(require("../knexfile"));
const validator = require('validator');

const getAll = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Users: ${err}`));
};

const findOne = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((usersFound) => {
      if (usersFound.length === 0) {
        return res
          .status(404)
          .json({ message: `User with ID: ${req.params.id} not found` });
      }

      const userData = usersFound[0];

      res.status(200).json(userData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve user data for user with ID: ${req.params.id}`,
      });
    });
};

const add = (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send("Please provide all info for the new warehouse in the request");
  }
  if (!validator.isEmail(req.body.contact_email) ) {
    return res.status(400).send("Invalid email address format");
  }
  if (req.body.contact_phone.length < 10 ) {
    return res.status(400).send("Invalid phone number format");
  }

  knex("warehouses")
    .insert(req.body)
    .then((result) => {
      return knex("warehouses").where({ id: result[0] });
    })
    .then((createdWarehouse) => {
      res.status(201).json(createdWarehouse);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to create new warehouse" });
    });
};

const remove = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Warehouse with ID: ${req.params.id} to be deleted not found`,
        });
      }
      res.sendStatus(204);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete warehouse" });
    });
};

module.exports = {
  getAll,
  findOne,
  add,
  remove
};
