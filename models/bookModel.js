const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "associated user not found"]
    },
    title: {
        type: String,
        required: [true, "please add the book title to save"],
        validate: {
            validator: (value) => {
                return value.length >= 2;
            },
            message: "book title must be at least 2 characters long"
        }
    },
    author: {
        type: String,
    },
    tags: {
        type: [String],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Books", bookSchema)