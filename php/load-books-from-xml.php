<?php
$conn = new mysqli("localhost", "root", "", "library");

// Register the namespace with a prefix (as used in the XML)
$xml = simplexml_load_file("../book-format.xml");
$xml->registerXPathNamespace('lib', 'http://localhost/library');

// Use XPath to get all lib:book elements
$books = $xml->xpath('//lib:book');

// print_r($books);
foreach ($books as $book) {
    $b = $book->children('http://localhost/library');

    $title = $b->title;
    $author = $b->author;
    $genre = $b->genre;
    $year = intval($b->year);
    $username = $b->user;

    // Get user_id from username
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

    if (!$user_id) continue; // Skip books with unknown users

    $stmt = $conn->prepare("INSERT INTO books (title, author, genre, year, user_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssii", $title, $author, $genre, $year, $user_id);
    $stmt->execute();
}

echo "Books loaded from XML.";
$conn->close();
?>