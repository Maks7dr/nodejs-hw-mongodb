import { Contact } from '../models/contact.js';

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
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};
