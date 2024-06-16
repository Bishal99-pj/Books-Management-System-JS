const express = require("express");
const router = express.Router();


const {getAllBooks, getBookById, setBooks, updateBook, removeBook} = require("../controllers/bookController");
const validateToken = require("../middleware/validateToken");

/* All private end points (only for authenticated users) */
router.use(validateToken)

router.route("/").get(getAllBooks).post(setBooks)

router.route("/:id").get(getBookById).put(updateBook).delete(removeBook)

module.exports = router