const {Schema, model} = require('mongoose')

const bookSchema = new Schema({
    title: String,
    author: String,
    thumbnail: String,
    ratings: Number,
});

module.exports = model('Book', bookSchema);