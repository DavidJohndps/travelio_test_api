const axios = require('axios');
// const Book = require('../models/book.model'); // Define the Book model

// Controller for searching books
async function searchBooks(req, res) {
  try {
    const {params: {query}} = req;
    const {data: {items}} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if(!items) return res.status(200).json({status: 200, data: [], total: 0})
    const books = items?.map((item) => {
      const {volumeInfo} = item
      return {
        category: volumeInfo?.categories ? volumeInfo.categories[0] : 'Unknown Category',
        title: volumeInfo?.title,
        description: volumeInfo?.description || 'There`s no description for this book',
        language: volumeInfo?.language,
        author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown Author',
        thumbnail: volumeInfo?.imageLinks ? volumeInfo.imageLinks?.thumbnail : '',
        ratings: volumeInfo?.averageRating || 0,
      };
    });
    return res.status(200).json({status: 200, data: [...books], total: books.length});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while searching for books.' });
  }
}
async function searchBookByCategory(req, res) {
  try {
    const {params: {category, query}} = req;
    const {data: {items}} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${category}`);
    if(!items) return res.status(200).json({status: 200, data: [], total: 0})
    const books = items?.map((item) => {
      const {volumeInfo} = item
      return {
        category: volumeInfo?.categories ? volumeInfo.categories[0] : 'Unknown Category',
        title: volumeInfo?.title,
        description: volumeInfo?.description || 'There`s no description for this book',
        language: volumeInfo?.language,
        author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown Author',
        thumbnail: volumeInfo?.imageLinks ? volumeInfo.imageLinks?.thumbnail : '',
        ratings: volumeInfo?.averageRating || 0,
      };
    });
    return res.status(200).json({status: 200, data: [...books], total: books.length});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while searching for books.' });
  }
}

module.exports = {
  searchBooks,
  searchBookByCategory
};
