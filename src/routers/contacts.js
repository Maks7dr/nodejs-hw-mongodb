import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../controllers/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactSchema,
  UpdateContactSchema,
} from '../validation/validation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:id', isValidId, ctrlWrapper(getContactById));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContact));
router.patch(
  '/:contactId',
  isValidId,
  validateBody(UpdateContactSchema),
  ctrlWrapper(patchContact),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
