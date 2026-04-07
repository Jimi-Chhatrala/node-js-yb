import express from 'express';
import {
  createContact,
  createContactPage,
  deleteContact,
  editContact,
  editContactPage,
  getAllContactsPage,
  viewContactPage,
} from '../controllers/contact.controller.js';

const router = express.Router();

// Display all contacts
router.get('/', getAllContactsPage);

// Create page
router.get('/create', createContactPage);

// Save contact
router.post('/create', createContact);

// View contact
router.get('/view/:id', viewContactPage);

// Edit page
router.get('/edit/:id', editContactPage);

// Update contact
router.put('/edit/:id', editContact);

// Delete contact
router.delete('/delete/:id', deleteContact);

export default router;
