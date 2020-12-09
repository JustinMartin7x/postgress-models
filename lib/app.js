const express = require('express');
const Books = require('./Books');
const app = express();

app.use(express.json());

// app.use(require('./middleware/not-found'));
// app.use(require('./middleware/error'));


app.post('/books', (req, res, next) => {
  Books
    .create(req.body)
    .then(book => res.send(book))
    .catch(next);
});
app.get('/books/:id', (req, res, next) => {
  Books
    .read(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});
app.put('/books/:id', (req, res, next) => {
  Books
    .update(req.params.id, req.body)
    .then(book => res.send(book))
    .catch(next);
});
app.delete('/books/:id', (req, res, next) => {
  Books
    .delete(req.params.id)
    .then(book => res.send(book))
    .catch(next);

});


module.exports = app;
