import createError from 'http-errors';
import {
  createContactService,
  patchContactService,
  deleteContactService,
} from '../services/contacts.js';

export const getAllContacts = async (req, res) => {
  res.json({ message: 'Get all contacts' });
};

export const getContactById = async (req, res) => {
  res.json({ message: `Get contact by ID: ${req.params.id}` });
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, contactType',
    );
  }

  const newContact = await createContactService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const updateFields = req.body;

  if (Object.keys(updateFields).length === 0) {
    throw createError(400, 'Missing fields for update');
  }

  const updatedContact = await patchContactService(contactId, updateFields);

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactService(contactId);

  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
