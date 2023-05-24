const express = require("express");

const router = express.Router();
const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
} = require("../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", getContacts);

router.get("/:contactId", isValidId, getContact);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  updateContact
);

router.patch(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.statusContactSchema),
  updateStatusContact
);

module.exports = router;
