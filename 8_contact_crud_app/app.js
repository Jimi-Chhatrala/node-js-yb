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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
