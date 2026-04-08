import Contact from '../models/contact.js';
import { asyncHandler, validateObjectId } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

export const getAllContactsPage = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render('contacts/index', { contacts });
});

export const createContactPage = (req, res) => {
  res.render('contacts/create');
};

export const createContact = asyncHandler(async (req, res) => {
  await Contact.create(req.body);
  res.redirect('/');
});

export const viewContactPage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('errors/400', {
      message: 'Invalid Contact ID',
    });
  }

  const contact = await Contact.findById(req.params.id);

  if (!contact) return res.status(404).render('errors/404');
  res.render('contacts/view', { contact });
});

export const editContactPage = asyncHandler(async (req, res) => {
  validateObjectId('id');

  const contact = await Contact.findById(req.params.id);

  if (!contact) return res.status(404).render('errors/404');
  res.render('contacts/edit', { contact });
});

export const editContact = asyncHandler(async (req, res) => {
  validateObjectId('id');

  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

export const deleteContact = asyncHandler(async (req, res) => {
  validateObjectId('id');

  await Contact.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
