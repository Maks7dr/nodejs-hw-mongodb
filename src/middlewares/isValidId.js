import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  const id = req.params.id || req.params.contactId;

  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
}
