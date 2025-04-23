const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  const filtered = users.filter((usr) => usr.username === username);
  return filtered.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  const filtered = users.filter((usr) => usr.username === username && usr.password === password);
  return filtered.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!(username && password)) {
   return res.status(404).json({message:"Error logging in"});
  }

  if (!authenticatedUser(username, password)) {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }

  let accessToken = jwt.sign({
    data:password
  }, "access", {expiresIn: 60*60});
  
  req.session.authorization = {
    accessToken, username
  }
  return res.status(200).json({message:"User successfully logged in"}); 
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review = req.body.review;
  const isbn = req.params.isbn;
  const username = req.session.authorization["username"];
  
  if (!(review && isbn && username)) {
    return res.status(404).json({message: "Error posting review"});
  }
  books[isbn].reviews[username] = review;
  return res.status(202).json({message:"review successfully posted"});
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization["username"];
  if (!(username in books[isbn].reviews)) {
    return res.status(404).json({message:"the user hasn't posted review on this book"});
  }
  delete books[isbn].reviews[username];
  return res.status(202).json({message:"review successfully deleted"});
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
