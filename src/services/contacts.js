import { Contact } from '../models/contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ContactsQuery = Contact.find();
  const ContactsCount = await Contact.find()
    .merge(ContactsQuery)
    .countDocuments();

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

export const createContactService = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

export const patchContactService = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    {
      new: true,
    },
  );
  return updatedContact;
};

export const deleteContactService = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete({
    _id: contactId,
  });
  return deletedContact;
};
