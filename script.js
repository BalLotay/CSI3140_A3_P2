// Search form elements
const searchForm = document.getElementById("search-form");
const searchTitleOrAuthor = document.getElementById("search-title-or-author");
const searchGenre = document.getElementById("search-genre");
const searchUser = document.getElementById("search-user");
const searchButton = document.getElementById("search-button");

// Add book form elements
const addBookForm = document.getElementById("add-book-form");
const addTitle = document.getElementById("add-title");
const addAuthor = document.getElementById("add-author");
const addGenre = document.getElementById("add-genre");
const addYear = document.getElementById("add-year");
const addUser = document.getElementById("add-user");
const addBookButton = document.getElementById("add-book-button");

// Results list and no results message
const resultsSection = document.getElementById("results-section");
const noResults = document.getElementById("no-results");

// Store users in a global variable.
// This will be used to keep track of users for both
// search and add book forms and to query their IDs.
let users = [];


/**
 * Output books to the results list
 */
function outputBooks(books) {

    // Clear previous results
    while (resultsSection.firstChild) {
        resultsSection.removeChild(resultsSection.firstChild);
    }

    // Show default no results message if there are no books
    if (books.length === 0) {
        const noResults = document.createElement("p");
        noResults.textContent = "No results found.";
        resultsSection.appendChild(noResults);
        return;
    } 

    // Create a new results list
    const resultsList = document.createElement("ul");

    // Iterate through the books and create book items
    books.forEach((book) => {
        const bookItem = document.createElement("ul");

        // Book title and author
        const bookTitleAndAuthor = document.createElement("li");
        bookTitleAndAuthor.textContent = `${book.title} by ${book.author}`;
        bookTitleAndAuthor.style.fontWeight = "bold";

        // Book genre and year
        const genreAndYear = document.createElement("li");
        genreAndYear.textContent = `Genre: ${book.genre}, Year: ${book.year}`;

        // Book user
        const bookUser = document.createElement("li");
        bookUser.textContent = `User: ${book.username}`;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteBook(book.id)); // Delete book by ID

        // Append all elements to the book item
        bookItem.appendChild(bookTitleAndAuthor);
        bookItem.appendChild(genreAndYear);
        bookItem.appendChild(bookUser);
        bookItem.appendChild(deleteButton);

        // Append the book item to the results list
        resultsList.appendChild(bookItem);
    });
    resultsSection.appendChild(resultsList); // Append the results list to the results section
}


/**
 * Wrapper XHR function to simplify handling of AJAX requests
 */
function XHR(method, url, params = null, headers = {}, functionToCall = null) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (headers) {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("XHR response:", xhr.responseText);
            if (functionToCall) {
                functionToCall(xhr.responseText);
            }
        }
    };
    if (params) {
        xhr.send(params);
    } else {
        xhr.send();
    }
    return xhr; // Return the xhr object for further processing if needed
}


/**
 * Get users from the server and populate the search and add user selects
 */
function getUsers() {
    // Helper function to process the response from the server
    // and populate the user selects
    function getUsersHelper(responseText) {
        users = JSON.parse(responseText);
        console.log("Users loaded:", users);

        // Populate the search and add user selects
        users.forEach((user) => {
            let option = document.createElement("option");
            option.value = user.username;
            option.textContent = user.username;
            searchUser.appendChild(option);
            addUser.appendChild(option.cloneNode(true)); // Clone the option for addUser select
        });
    }

    // Make the XHR request to get users
    XHR("GET", "php/get-users.php", null, {}, getUsersHelper);
}



/**
 * Delete a book by its ID
 */
function deleteBook(bookId) {
    function deleteBookHelper() { // Re-run the current search to update the results
        searchForm.dispatchEvent(new Event("submit"));
    }

    // Prepare the parameters for the delete request
    let params = "id=" + encodeURIComponent(bookId);
    let headers = { "Content-Type": "application/x-www-form-urlencoded" };

    // Make the XHR request to delete the book
    XHR("POST", "php/delete-book.php", params, headers, deleteBookHelper);
}


// Add event listener for the search form submission
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the user's ID
    let selectedUser = users.find((user) => user.username === searchUser.value);
    let userId = selectedUser ? selectedUser.id : "";

    // Prepare the parameters for the search request
    let query = searchTitleOrAuthor.value
        ? "query=" + encodeURIComponent(searchTitleOrAuthor.value)
        : "";
    let genre = searchGenre.value
        ? "&genre=" + encodeURIComponent(searchGenre.value)
        : "";
    let user = searchUser.value ? "&user_id=" + encodeURIComponent(userId) : "";

    let url = "php/search-books.php?" + query + genre + user;
    console.log(url);
    
    console.log('Search submitted:', searchTitleOrAuthor.value, searchGenre.value, searchUser.value);

    // Send the XHR request to search for books
    XHR("GET", url, null, {}, (responseText) => {
        let results = JSON.parse(responseText);
        console.log("Search results:", results);
        outputBooks(results);
    });
});


// Add event listener for the add book form submission
addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(
        "Add book submitted:",
        addTitle.value,
        addAuthor.value,
        addGenre.value,
        addYear.value,
        addUser.value
    );

    // Get the user's ID
    let selectedUser = users.find((user) => user.username === addUser.value);
    let userId = selectedUser ? selectedUser.id : "";

    let url = "php/add-book.php";
    let params = "title=" + encodeURIComponent(addTitle.value) +
                 "&author=" + encodeURIComponent(addAuthor.value) +
                 "&genre=" + encodeURIComponent(addGenre.value) +
                 "&year=" + encodeURIComponent(addYear.value) +
                 "&user_id=" + encodeURIComponent(userId);
    let headers = { "Content-Type": "application/x-www-form-urlencoded" };

    // Make the XHR request to add the book
    XHR("POST", url, params, headers, (responseText) => {
        console.log("Add book response:", responseText);
        // Re-run the current search to update the results
        searchForm.dispatchEvent(new Event("submit"));
    });
});


// Load users when the page is loaded
getUsers();