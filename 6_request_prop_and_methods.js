const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/about', (req, res) => {
  // res.send(req.body);

  /*
  Check if the incoming request contains the "Content-Type" header field, and it contains the give mime type.

Examples:

 // With Content-Type: text/html; charset=utf-8
 req.is('html');
 req.is('text/html');
 req.is('text/*');
 // => true

 // When Content-Type is application/json
 req.is('json');
 req.is('application/json');
 req.is('application/*');
 // => true

 req.is('html');
 // => false
   */

  if (req.is('application/json')) {
    res.send({json: req.is('json'), application_json: req.is('application/json'), application_star: req.is('application/*') });
  } else if (req.is('text/html')) {
    res.send({ html: req.is('html'), text_html: req.is('text/html'), text_star: req.is('text/*') });
  } else if (req.is('xml')) {
    res.send('xml');
  } else if (req.is('javascript')) {
    res.send('javascript');
  } else if (req.is('js')) {
    res.send('js');
  } else {
    res.send('Different content type.');
  }
});

app.get('/about', (req, res) => {
  // res.send(req.headers);
  // res.send(req.headers.host);
  // res.send(req.get('host'));
  // res.send(req.get('connection'));
  res.send(req.get('accept'));
});

app.get('/about/:userId', (req, res) => {
  // res.send(req.hostname);
  // res.send(req.ip);
  // res.send(req.ips);
  // res.send(req.method);
  // res.send(req.originalUrl);
  // res.send(req.path);
  // res.send(req.protocol);
  // res.send(req.secure);
  // res.send(req.route);

  if (req.accepts('html')) {
    res.send('<h1>Hello</h1>');
  } else if (req.accepts('json')) {
    res.send({ message: 'Hello' });
  } else if (req.accepts('xml')) {
    res.send('<message>Hello</message>');
  } else {
    res.send('Hello');
  }
});
