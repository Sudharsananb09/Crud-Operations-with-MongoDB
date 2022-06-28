const router = require('express').Router();
const books = require('./books_dumps.js');
var bookDirectory = books;

// Get all the books
router.get('/', (req, res) => {
    res.send(bookDirectory);
  });
  
  // Get a specific book
  router.get('/:id', async function (req, res) {
    const { id } = req.params;
    var bookExist = await bookDirectory.filter((ele) => ele.isbn === id);
    if (bookExist.length == 0) return res.send('Book doesn\'t exist');
    res.send(bookExist);
  });
  
  // Insert a json document
  router.post('/', async function (req, res) {
    var isbn = req.body.isbn;
    const bookExist = await bookDirectory.filter((ele) => ele.isbn === isbn);
    if (bookExist.length != 0) return res.send('Book already exist');
    books.push(req.body);
    res.send({ message: 'The book has been added' });
  });

  // Update a json document
  router.put('/:id', async function (req, res) {
    const { id } = req.params;
    const body = req.body;
    books.forEach((book, index) => {
      if (book.isbn === id) {
        console.log(book.id);
        books[index] = body;
      }
    });
    res.send({ message: `The book with ID ${id} has been updated` });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    books.forEach((book, index) => {
      if (book.isbn === id) {
        books.splice(index);
      }
    });
    res.json({ message: `Book with id #${id} has been deleted` });
  });

module.exports = router; 