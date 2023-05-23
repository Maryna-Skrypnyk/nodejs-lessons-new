const Contacts = require("../../models/contacts");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.json({ status: "success", code: 200, data: { contacts } });
};

const getContact = async (req, res) => {
  const contact = await Contacts.getContactById(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${req.params.contactId} found!`,
    });
  }
  throw HttpError(404, `Contact with id ${req.params.contactId} not found!`);
};

const addContact = async (req, res) => {
  const contact = await Contacts.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
    message: `Contact with name ${req.body.name} added successfully!`,
  });
};

const updateContact = async (req, res) => {
  const contact = await Contacts.updateContact(req.params.contactId, req.body);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${req.params.contactId} updated successful!`,
    });
  }
  throw HttpError(404, `Contact with id ${req.params.contactId} not found!`);
};

const deleteContact = async (req, res) => {
  const contact = await Contacts.removeContact(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${req.params.contactId} removed!`,
    });
  }
  throw HttpError(404, `Contact with id ${req.params.contactId} not found!`);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
