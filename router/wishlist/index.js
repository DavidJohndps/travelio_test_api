const {Router} = require('express');
const router = Router();
const wishlistController = require('../../controller/wishlist');

// Route for adding a book to the wishlist
router.post('/addWishlist', wishlistController.addToWishlist);

// Route for retrieving a user's wishlist
router.get('/getWishlists', wishlistController.getUserWishlist);

module.exports = router;
