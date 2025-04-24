const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  username = req.body.username;
  password = req.body.password;
  if (!(username && password)) {
    return res.status(404).json({message: "Unable to register user"});
  }
  if (isValid(username)) {
    return res.status(404).json({message: "user already exists!"});
  }
  users.push({username, password});
  return res.status(200).json({message: "user successful registered"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const bookList = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 500);
    });

    return res.status(200).json(bookList);
  } catch(err) {
    return res.status(500).json({message: err});
  }
});

const getBookByIsbn = (isbn) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isbn in books) {
        resolve(books[isbn]);
      } else {
        reject("book not found");
      }
    }, 500);
  });
};

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const book = await getBookByIsbn(isbn);
    return res.status(200).json(book);
  } catch(err) {
    return res.status(404).json({message: err});
  }
});
 

const getBooksByAuthor = (author)=> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let matchingBooks = []
      for (let isbn in books) {
        if (books[isbn].author == author) {
          matchingBooks.push(books[isbn]);
        }
      }
      if (matchingBooks.length == 0) {
        reject("Books by this author not found");
      } else {
        resolve(matchingBooks);
      }
    });
  });
}

// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const author = req.params.author;
  try {
    const bookList = await getBooksByAuthor(author);
    return res.status(200).json(bookList);
  } catch(err) {
    return res.status(404).json({message: err});
  }
});

const getBooksByTitle = (title)=> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let matchingBooks = []
      for (let isbn in books) {
        if (books[isbn].title == title) {
          matchingBooks.push(books[isbn]);
        }
      }
      if (matchingBooks.length == 0) {
        reject("Books by this author not found");
      } else {
        resolve(matchingBooks);
      }
    });
  });
}

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  const title = req.params.title;
  try {
    const booksList = await getBooksByTitle(title);
    return res.status(200).json(booksList);
  } catch(err) {
    return res.status(404).json({message: err});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (isbn in books) {
    return res.json(books[isbn].reviews);
  }
  return res.status(404).json({message: "book not found"});
});

module.exports.general = public_users;
