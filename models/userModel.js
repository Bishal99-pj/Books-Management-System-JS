const { match } = require("assert");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please enter the username"]
    },
    email: {
        type: String,
        required: [true, "please enter the email"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true, "please enter the password"],
        match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password must be valid"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("users" , userSchema)