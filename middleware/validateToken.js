const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization || req.headers.AUTHORIZATION;
    if (authHeader && authHeader.startsWith("Bearer")) {
        /* read token */
        token = authHeader.split(" ")[1];
        /* validate token */
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized, token validation failed! " + err);
            }
            /* pass user information to the next request */
            req.user = decoded.user;
            next();
        });
    }
    if (!token) {
        res.status(401);
        throw new Error("User is not authorized, no token found");
    }
})

module.exports = validateToken