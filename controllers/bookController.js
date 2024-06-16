const asyncHandler = require("express-async-handler");

const Books = require("../models/bookModel");

/* All private end points (only for authenticated users) */

/* api/books
@method GET
*/
const getAllBooks = asyncHandler(async (req, res) => {
    const allBooks = await Books.find({ user_id: req.user.id });
    res.status(200).json({ request_name: "get request for all books", resource: allBooks });
})

/* api/books/:id 
@method GET
*/
const getBookById = asyncHandler(async (req, res) => {
    const singleBook = await Books.findById(req.params.id);
    if (!singleBook) {
        res.status(404);
        throw new Error("Book not found");
    }
    res.status(200).json({ request_name: `get request for book with id-${req.params.id}`, resource: singleBook });
})

/* api/books 
@method POST
*/
const setBooks = asyncHandler(async (req, res) => {
    const { title, author, tags } = req.body;
    if (!title) {
        res.status(400);
        throw new Error("Book title is required");
    }
    let newBook
    try {
        newBook = await Books.create({ user_id: req.user.id, title, author, tags });
    } catch (e) {
        console.error(e.status)
    }
    res.status(201).json({ request_name: "add new book to the collection", books: newBook });
})

/* api/books/:id 
@method PUT
*/
const updateBook = asyncHandler(async (req, res) => {
    let singleBook
    try {
        singleBook = await Books.findById(req.params.id);
    } catch (e) {
        if (e.kind === "ObjectId") {
            res.status(404);
            throw new Error("Book not found" , e.reason);
        }
    }
    if (!singleBook) {
        res.status(404);
        throw new Error("Book not found");
    }
    if (singleBook.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update this book");
    }
    const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ request_name: `update book details for id-${req.params.id}`, updatedResource: updatedBook });
})

/* api/books/:id 
@method DELETE
*/
const removeBook = asyncHandler(async (req, res) => {
    const singleBook = await Books.findById(req.params.id);
    if (!singleBook) {
        res.status(404);
        throw new Error("Book not found");
    }
    if (singleBook.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete this book");
    }
    await Books.findByIdAndDelete(req.params.id);
    res.status(200).json({ request_name: `delete book with id-${req.params.id}` });
})

module.exports = { getAllBooks, getBookById, setBooks, updateBook, removeBook }