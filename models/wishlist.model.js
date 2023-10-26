const {Schema, model} = require('mongoose')
const bookSchema = require('./book.model.js')

const wishlistSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    books: [new Schema({
    title: String,
    author: String,
    thumbnail: String,
    ratings: Number,
})]
});

module.exports = model('Wishlist', wishlistSchema);