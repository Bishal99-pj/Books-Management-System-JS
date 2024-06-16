const express = require("express");
const router = express.Router();

const { registerHandler, loginHandler, profileHandler } = require("../controllers/authController");
const validateToken = require("../middleware/validateToken");

/* public */
router.post("/register", registerHandler)

/* public */
router.post("/login", loginHandler)

/* private */
router.get("/profile", validateToken, profileHandler)

module.exports = router