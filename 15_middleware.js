const express = require('express');
const app = express();
const router = express.Router();

// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1>');
// });

// app.use((req, res, next) => {
//   // console.log('Hello from middleware');
//   // console.log(`Request Method: ${req.method}, Route URL: ${req.url}`);
//   const date = new Date();
//   // console.log(`Current Date: ${date.getDate()}, Month: ${date.getMonth() + 1} `);
//   console.log(`Current Hour: ${date.getHours()}, Minute: ${date.getMinutes()} `);
//   next();
// });

const myMiddleware = (req, res, next) => {
  // console.log('Hello from middleware');
  // console.log(`Request Method: ${req.method}, Route URL: ${req.url}`);
  const date = new Date();
  // console.log(`Current Date: ${date.getDate()}, Month: ${date.getMonth() + 1} `);
  console.log(`Current Hour: ${date.getHours()}, Minute: ${date.getMinutes()} `);
  next();
};

const middleware1 = (req, res, next) => {
  console.log('Middleware 1');
  next();
};

const middleware2 = (req, res, next) => {
  console.log('Middleware 2');
  next();
};

// app.use(myMiddleware);

router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

router.get('/', (req, res) => {
  res.send('<h1>Home API Route</h1>');
});

router.get('/contact', (req, res) => {
  res.send('<h1>Contact API Route</h1>');
});

app.use('/api', router);

app.get('/', middleware1, middleware2, (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.get('/contact', myMiddleware, (req, res) => {
  res.send('<h1>Contact Page</h1>');
});

app.use((req, res) => {
  res.status(404).send('<h1>Page not found.</h1>');
});

app.use((error, req, res, next) => {
  console.log(`Error Middleware`);
  console.error(error.stack);
  res.status(500).send('Something Broke..!');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('/public'));

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
