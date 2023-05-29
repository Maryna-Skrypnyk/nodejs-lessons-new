const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner }).populate(
    "owner",
    "name email"
  );
  res.json({
    status: "success",
    code: 200,
    message: "Contacts list found!",
    data: { contacts },
  });
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({ _id: contactId });
  const contact = await Contact.findById(contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: `Contact with id ${contactId} found!`,
      data: { contact },
    });
  }
  throw HttpError(404, `Contact with id ${contactId} not found!`);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    message: `Contact with name ${req.body.name} added successfully!`,
    data: { contact },
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
      message: `Contact with id ${contactId} updated successful!`,
      data: { contact },
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
      message: `Status contact with name ${contact.name} updated successfully!`,
      data: { contact },
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
      message: `Contact with id ${contactId} removed!`,
      data: { contact },
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
