const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop using async-await with Axios
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://yourapiurl.com/books'); // Replace with your actual API URL
    const books = response.data;
    res.send(JSON.stringify(books, null, 2));
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the book list" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    // Simulating an Axios request to fetch book details based on ISBN
    const book = books[isbn]; // Replace this line with an actual Axios request if using an external API
    if (book) {
      res.send(JSON.stringify(book, null, 2));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the book details" });
  }
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    // Simulating an Axios request to fetch book details based on author
    const bookList = Object.values(books).filter(book => book.author === author); // Replace this line with an actual Axios request if using an external API
    if (bookList.length > 0) {
      res.send(JSON.stringify(bookList, null, 2));
    } else {
      res.status(404).json({ message: "No books found by this author" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the book details" });
  }
});

// Get book details based on title using async-await with Axios
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    // Simulating an Axios request to fetch book details based on title
    const bookList = Object.values(books).filter(book => book.title === title); // Replace this line with an actual Axios request if using an external API
    if (bookList.length > 0) {
      res.send(JSON.stringify(bookList, null, 2));
    } else {
      res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the book details" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.send(JSON.stringify(book.reviews, null, 2));
  } else {
    res.status(404).json({ message: "No reviews found for this book" });
  }
});

module.exports.general = public_users;
