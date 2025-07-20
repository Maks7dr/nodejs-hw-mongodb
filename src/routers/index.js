import { Router } from 'express';
import ContactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use('/contacts', ContactsRouter);
router.use('/auth', authRouter);

export default router;
