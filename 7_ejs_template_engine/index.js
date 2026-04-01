import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  // res.send('<h1>About Page</h1>');
  res.render('about', {
    title: 'Dynamic About Page',
    message: 'This is about page message from EJS Template.',
    items: ['D', 'E', 'F'],
    users: [
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane', age: 30 },
      { id: 3, name: 'Mike', age: 28 },
    ],
  });
  // res.render('other');
});

app.listen(3000, () => {
  console.log('Server running on 3000');
});
