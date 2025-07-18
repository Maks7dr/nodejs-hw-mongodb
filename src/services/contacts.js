import { Contact } from '../models/contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ContactsQuery = Contact.find();
  const studentsCount = await Contact.find()
    .merge(ContactsQuery)
    .countDocuments();

  const Contacts = await ContactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

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
