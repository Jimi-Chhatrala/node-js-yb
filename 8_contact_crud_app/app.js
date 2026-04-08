import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.route.js';
import { connectDB } from './config/database.js';

const app = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', contactRoutes);

app.use((req, res) => {
  res.status(404).render('errors/404');
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);

  res.status(500).render('errors/500', {
    error: err.message,
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  // Handle MongoDB CastError
  if (err.name === 'CastError') {
    return res.status(400).render('errors/400', {
      message: 'Invalid ID format',
    });
  }

  res.status(500).render('errors/500', {
    error: err.message,
  });
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED PROMISE:', err);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
