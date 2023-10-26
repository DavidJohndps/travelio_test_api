const {Router} = require('express');
const router = Router();
const bookController = require('../../controller/book');

// Route for searching books
router.get('/search/:query', bookController.searchBooks);
router.get('/subject/:query/:category', bookController.searchBookByCategory);

module.exports = router;