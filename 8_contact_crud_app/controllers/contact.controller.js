import Contact from '../models/contact.js';

export const getAllContactsPage = async (req, res) => {
  const contacts = await Contact.find();
  res.render('contacts/index', { contacts });
};

export const createContactPage = async (req, res) => {
  res.render('contacts/create');
};

export const createContact = async (req, res) => {
  await Contact.create(req.body);
  res.redirect('/');
};

export const viewContactPage = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('contacts/view', { contact });
};

export const editContactPage = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('contacts/edit', { contact });
};

export const editContact = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
};

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
