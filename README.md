# CSI3140_A3_P2

Contains files for Assignment 3 Part 2 for CSI3140 - Summer 2025. 

## Contributors

- Balpreet Singh
- Matthew Tang

## Prerequisites

- XAMPP

## Instructions

1. Clone this repository to the XAMPP htdocs folder:
    - Windows: `C:/xampp/htdocs`
    - Mac/Linux: `/Applications/XAMPP/xamppfiles/htdocs` or `/var/www/html`
2. Start up XAMPP
3. Import `library.sql` within XAMPP
3. Open [`http://localhost/CSI3140_A3_P2/php/load-books-from-xml.php`](http://localhost/CSI3140_A3_P2/php/load-books-from-xml.php) in the browser once to import the books into the database
4. Open [`http://localhost/CSI3140_A3_P2/index.html`](http://localhost/CSI3140_A3_P2/index.html) in the browser to run the app

## TODO

- [x] MySQL
    - [x] Create MySQL database `library` with tables `users` and `books`
    - [x] Insert at least 3 users
    - [x] Insert at least 7 books with various titles, authors, genres, and user associations
    - [x] Add functionality to load books from XML into the database using a PHP script

- [x] Web Page with Ajax, DOM, and UI Elements
    - [x] Add text input to search by title or author
    - [x] Add dropdown to filter by genre
    - [x] Add dropdown to filter by user (populated via Ajax from get_users.php)
    - [x] Add 'Search' button
    - [x] Add form to add a new book (includes user selection)
    - [x] Add display section for results rendered with DOM methods
    - [x] Add delete button next to each result
    - [x] Search books using search box, genre filter, and user filter
    - [x] Fetch data from backend using Ajax (GET/POST)
    - [x] Render results dynamically using DOM methods (no innerHTML)
    - [x] Add book via form with all fields
    - [x] Delete book and refresh list without reload
    - [x] Show proper messages when no results found
    - [x] UI works smoothly and handles edge cases
    - [x] Code is clean, organized, and uses semantic variable names and structure
    - [x] JavaScript avoids redundancy and is modular

- [x] XML File
    - [x] Create book-format.xml with at least five books
    - [x] Ensure XML is well-formed and valid
    - [x] Use namespace with URI: http://localhost/library
    - [x] Use lib:library as root node and lib:book for each entry
    - [x] Include lib:title, lib:author, lib:genre, lib:year, and lib:user fields for each book