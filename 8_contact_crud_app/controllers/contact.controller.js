import Contact from '../models/contact.js';
import { asyncHandler, validateObjectId } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

export const getAllContactsPage = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const total = await Contact.countDocuments();
  const contacts = await Contact.find().skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalPages = Math.ceil(total / limit);

  res.render('contacts/index', { contacts, currentPage: page, totalPages, total, limit });
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
