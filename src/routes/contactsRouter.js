import express from 'express';
import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController); // 👈 новий маршрут

export default router;
