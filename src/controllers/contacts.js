const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json({ status: "success", code: 200, data: { contacts } });
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({ _id: contactId });
  const contact = await Contact.findById(contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${contactId} found!`,
    });
  }
  throw HttpError(404, `Contact with id ${contactId} not found!`);
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
    message: `Contact with name ${req.body.name} added successfully!`,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }); // new - для повернення оновленої версії
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${contactId} updated successful!`,
    });
  }
  throw HttpError(404, `Contact with id ${contactId} not found!`);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Status contact with name ${contact.name} updated!`,
    });
  }
  throw HttpError(404, `Contact with id ${contactId} not found!`);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findByIdAndDelete(contactId);
  const contact = await Contact.findByIdAndRemove(contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `Contact with id ${contactId} removed!`,
    });
  }
  throw HttpError(404, `Contact with id ${contactId} not found!`);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContact: ctrlWrapper(deleteContact),
};
