const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Users = require("../models/userModel");

/* api/auth/register 
@public
@method POST
*/
const registerHandler = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const userExists = await Users.findOne({ email });
    if (userExists) {
        res.status(409);
        throw new Error("user already exists, please login");
    }
    /* 1. hash password */
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ userName, email, password: hashedPassword });

    if (user) {
        res.status(201).json({ message: "user registered successfully", _id: user.id, userName: user.userName, email: user.email });
    } else {
        res.status(400);
        throw new Error("invalid user data");
    }
})

/* api/auth/login 
@public 
@method POST
*/
const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = await Users.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({ user: { userName: user.userName, email: user.email, id: user.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        res.status(200).json({ message: "user loggedin successfully", user_id: user.id, accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
})

/* api/auth/profile 
@private (validateToken middleware)
@method GET
*/
const profileHandler = asyncHandler(async (req, res) => {
    res.json({ message: "current user profile" , user: req.user });
})

module.exports = { registerHandler, loginHandler, profileHandler }