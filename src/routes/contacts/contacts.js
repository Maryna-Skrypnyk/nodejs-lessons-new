const express = require("express");

const router = express.Router();
const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../../middlewares");
const { addSchema, updateSchema } = require("../../../schemas/contacts");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(addSchema), updateContact);

router.patch("/:contactId", validateBody(updateSchema), updateContact);

module.exports = router;
