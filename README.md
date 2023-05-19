# Nybook Client for COMP 584

Nybook is full stack application that allows authenticated user to register authors, books and assign books to their respective authors.

Nybook Client allows for 

### Authors
- GET 		: getting all authors
- GET 		: getting a specific author by id and displaying information
- POST 		: adding a new author
- PUT 		: updating existing author
- DELETE 	: deleting existing author

### Books
- GET 		: getting books authors
- GET 		: navigating to book's author's info page by selecting 
- POST 		: adding a new book and assigning to author
- PUT 		: updating existing book
- DELETE 	: deleting existing book

For convenience all this functionalities are available within respective route's tables.

## Furthermore, I also implemented custom Not Found (HTTP 404) Pages
This components gets loaded in our routes and AuthorInfoComponent will redirect to this page is client tries to get information about author which does not exist.