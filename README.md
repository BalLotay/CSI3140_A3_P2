# CSI3140_A3_P2

## Description

Contains files for Assignment 2 Part 2 for CSI3140 - Summer 2025. 

### Contributors

- Balpreet Singh
- Matthew Tang

### TODO
- [ ] MySQL
    - [ ] Create MySQL database `library` with tables `users` and `books`
    - [ ] Insert at least 3 users
    - [ ] Insert at least 7 books with various titles, authors, genres, and user associations
    - [ ] Add functionality to load books from XML into the database using a PHP script

- [ ] Web Page with Ajax, DOM, and UI Elements
    - [x] Add text input to search by title or author
    - [x] Add dropdown to filter by genre
    - [x] Add dropdown to filter by user (populated via Ajax from get_users.php)
    - [x] Add 'Search' button
    - [x] Add form to add a new book (includes user selection)
    - [x] Add display section for results rendered with DOM methods
    - [ ] Add delete button next to each result
    - [ ] Search books using search box, genre filter, and user filter
    - [ ] Fetch data from backend using Ajax (GET/POST)
    - [ ] Render results dynamically using DOM methods (no innerHTML)
    - [ ] Add book via form with all fields
    - [ ] Delete book and refresh list without reload
    - [ ] Show proper messages when no results found
    - [ ] UI works smoothly and handles edge cases
    - [ ] Code is clean, organized, and uses semantic variable names and structure
    - [ ] JavaScript avoids redundancy and is modular

- [x] XML File
    - [x] Create book-format.xml with at least five books
    - [x] Ensure XML is well-formed and valid
    - [x] Use namespace with URI: http://localhost/library
    - [x] Use lib:library as root node and lib:book for each entry
    - [x] Include lib:title, lib:author, lib:genre, lib:year, and lib:user fields for each book