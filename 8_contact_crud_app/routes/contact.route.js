import express from 'express';
import Contact from '../models/contact.js';

const router = express.Router();


// Display all contacts
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.render('contacts/index', { contacts });
});

// Create page
router.get('/create', (req, res) => {
  res.render('contacts/create');
});

// Save contact
router.post('/create', async (req, res) => {
  await Contact.create(req.body);
  res.redirect('/');
});

// View contact
router.get('/view/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('contacts/view', { contact });
});

// Edit page
router.get('/edit/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('contacts/edit', { contact });
});

// Update contact
router.put('/edit/:id', async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Delete contact
router.delete('/delete/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

export default router;
