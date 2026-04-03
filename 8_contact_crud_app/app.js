import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.route.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
await mongoose.connect('mongodb://127.0.0.1:27017/contactDB');

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', contactRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
