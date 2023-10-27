const Wishlist = require('../models/wishlist.model'); // Define the Wishlist model

// Controller for adding a book to the wishlist
async function addToWishlist(req, res) {
  // Implement the logic to add a book to the wishlist
  try {
    const { body: { book, userId } } = req
    if (!userId) {
        return res.status(422).json({status: 422, message: 'User Required to be passed'})
    }
    if (!book) {
        return res.status(422).json({status: 422, message: 'Book Required to be passed'})
    }
    // console.log({book, userId})
    const user = await Wishlist.findOne({userId});
    console.log({user})

    if (user) {
      const isWishlisted = user._doc.books.some(wishlistedBook => wishlistedBook.title === book.title)
      if (isWishlisted) {
        return res.status(422).json({
          status: 422,
          message: 'This Book already added to user`s wishlist'
        })
      }
      if (user && user._doc.books.length !== 0) {
        user._doc.books.push(book)
        const {_doc: newWishlist} = await user.save()
        return res.status(200).json({
            status: 200,
            data: {...newWishlist}
        })
      }
    }

    if (!user) {
      const { _doc: newWishlist } = await Wishlist.create({
        userId,
        books: [book]
      })
      return res.status(200).json({
          status: 200,
          data: {...newWishlist}
      })
    }

  } catch (error) {
    if (error) {
      console.log(error)
      return
        // const {status, message} = error
        // return res.status(status).json({status,message})
    }
  }
}

// Controller for retrieving a user's wishlist
async function getUserWishlist(req, res) {
  // Implement the logic to retrieve a user's wishlist
  try {
    const {query: {userId}} = req
    const response = await Wishlist.find({ userId })

    return res.status(200).json({
        status: 200,
        data: [...response],
        total: response?.length || 0
    })
  } catch (error) {
    if (error) {
        console.log(error)
        return
        // const {status, message} = error
        // return res.status(status).json({status,message})
    }
  }
}

module.exports = {
  addToWishlist,
  getUserWishlist,
};
