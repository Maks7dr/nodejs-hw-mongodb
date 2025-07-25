import createError from 'http-errors';
import {
  getContacts,
  createContactService,
  patchContactService,
  deleteContactService,
} from '../services/contacts.js';

import { Contact } from '../models/contact.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved contacts',
    data: contacts,
  });
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'success',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, contactType',
    );
  }

  let photoUrl;
  if (req.file) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file);
    } else {
      photoUrl = await saveFileToUploadDir(req.file);
    }
  }

  const contactData = {
    name,
    phoneNumber,
    contactType,
    userId: req.user._id,
    ...(photoUrl && { photo: photoUrl }),
  };

  const newContact = await createContactService(contactData, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const updateFields = { ...req.body };

  if (Object.keys(updateFields).length === 0 && !req.file) {
    throw createError(400, 'Missing fields for update');
  }

  if (req.file) {
    let photoUrl;
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file);
    } else {
      photoUrl = await saveFileToUploadDir(req.file);
    }
    updateFields.photo = photoUrl;
  }

  const updatedContact = await patchContactService(
    contactId,
    updateFields,
    req.user._id,
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactService(contactId, req.user._id);

  if (!deletedContact) {
    next(createError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
