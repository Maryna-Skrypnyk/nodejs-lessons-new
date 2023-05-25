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

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, getContacts);

router.get("/:contactId", authenticate, isValidId, getContact);

router.post("/", authenticate, validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateContact
);

router.patch(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.statusContactSchema),
  updateStatusContact
);

module.exports = router;
