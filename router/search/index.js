const {Router} = require('express');
const router = Router();
const bookController = require('../../controller/book');

// Route for searching books
router.get('/search', bookController.searchBooks);
router.get('/subject', bookController.searchBookByCategory);

module.exports = router;