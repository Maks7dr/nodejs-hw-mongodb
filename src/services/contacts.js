import { Contact } from '../models/contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const fullFilter = { ...filter, userId };

  const ContactsQuery = Contact.find(fullFilter);
  const ContactsCount = await Contact.countDocuments(fullFilter);

  const Contacts = await ContactsQuery.skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(ContactsCount, perPage, page);

  return {
    data: Contacts,
    ...paginationData,
  };
};

export const createContactService = async (data, userId) => {
  const newContact = await Contact.create({ ...data, userId });
  return newContact;
};

export const patchContactService = async (contactId, updateData, userId) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    updateData,
    {
      new: true,
    },
  );
  return updatedContact;
};

export const deleteContactService = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
};
// new
export const getContactByIdService = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};
