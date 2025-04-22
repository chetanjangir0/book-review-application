const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function doesExist(username) {
  const filtered = users.filter((usr) => usr.username === username);
  return filtered.length > 0;
}

public_users.post("/register", (req,res) => {
  username = req.body.username;
  password = req.body.password;
  if (! (username && password)) {
    res.status(404).json({message: "Unable to register user"});
  }
  if (doesExist(username)) {
    res.status(404).json({message: "user already exists!"});
  }
  users.push({username, password});
  res.status(200).json({message: "user successful registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (isbn in books) {
    res.json(books[isbn])
  }
  return res.status(404).json({message: "book not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  for (let isbn in books) {
    if (author === books[isbn].author) {
      res.json(books[isbn]);
    }
  }
  return res.status(404).json({message: "author not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  for (let isbn in books) {
    if (title === books[isbn].title) {
      res.json(books[isbn]);
    }
  }
  return res.status(404).json({message: "title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (isbn in books) {
    res.json(books[isbn].reviews);
  }
  return res.status(404).json({message: "book not found"});
});

module.exports.general = public_users;
