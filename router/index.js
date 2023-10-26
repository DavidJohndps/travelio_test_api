const {Router} = require('express')
const router = Router()

const search = require('./search')
const wishlist = require('./wishlist')

router.use('/books', search)
router.use('/wishlists', wishlist)

module.exports = router

