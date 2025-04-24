# Book Review API Backend

This project is the final assignment for the Coursera course **"Developing Back-End Apps with Node.js and Express"**, offered by IBM. It implements a simple RESTful API for managing book information and user reviews.

## Table of Contents

1.  [Project Description](#project-description)
2.  [Features](#features)
3.  [Technologies Used](#technologies-used)
4.  [Setup and Installation](#setup-and-installation)
5.  [API Endpoints](#api-endpoints)
    * [Public Endpoints](#public-endpoints)
    * [Authenticated Endpoints (Customer)](#authenticated-endpoints-customer)
6.  [Project Structure](#project-structure)
7.  [Acknowledgements](#acknowledgements)
8.  [License](#license)

## Project Description

This project is a backend application built with Node.js and the Express.js framework. It provides a set of API endpoints to access information about books, including details by ISBN, author, and title, and also allows users to register, log in, and manage reviews for books. The application uses simple in-memory data stores for books and users, as instructed by the course.

## Features

The API provides the following functionalities:

* Retrieve a list of all books available in the shop.
* Get details for a specific book based on its ISBN.
* Find books by a specific author.
* Find books by title.
* Retrieve reviews for a specific book by ISBN.
* User registration (public endpoint).
* User login (authenticate and obtain access for customer endpoints).
* Add or modify a review for a book (requires authentication).
* Delete a review for a book (requires authentication).

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
* (Mention any other significant libraries if you used them, e.g., Axios if you used it for *client-side* testing code within the repo, but likely not needed for the server itself beyond basic Node modules).
* Simple in-memory data storage (JavaScript objects/arrays).

## Setup and Installation

To get the project running locally:

1.  **Prerequisites:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
2.  **Clone the repository:**
    ```bash
    git clone https://github.com/chetanjangir0/book-review-application.git 
    cd book-review-application 
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the server:**
    ```bash
    npm start
    # or
    node index.js
    ```
    The server should now be running, typically on `http://localhost:5000` (check your `index.js` or environment configuration if it uses a different port).

## API Endpoints

The API is split into public endpoints (accessible by anyone) and authenticated endpoints (requiring a registered and logged-in user).

### Public Endpoints

| Method | Path                 | Description                                       | Parameters                    | Example Usage (Base URL: `http://localhost:5000`) |
| :----- | :------------------- | :------------------------------------------------ | :---------------------------- | :---------------------------------------------- |
| `GET`  | `/`                  | Get the list of all books                         | None                          | `GET /`                                         |
| `GET`  | `/isbn/:isbn`        | Get book details by ISBN                          | URL Param: `isbn` (e.g., `1`) | `GET /isbn/1`                                   |
| `GET`  | `/author/:author`    | Get books by Author (Returns a list)              | URL Param: `author` (e.g., `Chinua Achebe`) | `GET /author/Chinua Achebe`                     |
| `GET`  | `/title/:title`      | Get books by Title (Returns a list)               | URL Param: `title` (e.g., `Fairy tales`) | `GET /title/Fairy tales`                      |
| `GET`  | `/review/:isbn`      | Get reviews for a specific book by ISBN           | URL Param: `isbn` (e.g., `1`) | `GET /review/1`                                 |
| `POST` | `/register`          | Register a new user                               | Request Body: `username`, `password` | `POST /register` with JSON body `{"username": "testuser", "password": "password123"}` |

### Authenticated Endpoints (Customer)

These endpoints require a user to be logged in. After a successful login, a token or session is typically provided, which needs to be included in subsequent requests (e.g., in headers or cookies, depending on your implementation). The base path for these is often `/customer`.

| Method | Path                       | Description                     | Authentication | Parameters                       | Request Body   | Example Usage (Base URL: `http://localhost:5000`)                                                                                                                                                                 |
| :----- | :------------------------- | :------------------------------ | :------------- | :------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/customer/login`          | User login                      | None (This endpoint *grants* auth) | None                             | `username`, `password` | `POST /customer/login` with JSON body `{"username": "testuser", "password": "password123"}` (On success, you get a token/session to use for subsequent authenticated calls)                                   |
| `PUT`  | `/customer/review/:isbn`   | Add or Modify a book review     | Required       | URL Param: `isbn` (e.g., `1`)    | `review` (string) | `PUT /customer/review/1` with JSON body `{"review": "An excellent read!"}` (Requires authentication token/session)                                                                                               |
| `DELETE`| `/customer/review/:isbn` | Delete a review for a book      | Required       | URL Param: `isbn` (e.g., `1`)    | None           | `DELETE /customer/review/1` (Requires authentication token/session. Deletes the review added by the currently authenticated user for this ISBN).                                                                   |
| `GET`  | `/customer/books`          | (Optional: Get books by logged-in user - if implemented) | Required       | None                             | None           | `GET /customer/books` (Example if you added an endpoint to list books associated with a user, e.g., reviewed books)                                                                                             |

*(Modify the Authenticated Endpoints table based on the exact paths and functionality implemented in your `auth_users.js` and `index.js` for the authenticated routes)*

## Project Structure
