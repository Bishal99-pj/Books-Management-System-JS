const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/connection");
const dotenv = require("dotenv").config();

connectDb();

const app = express();

const port = process.env.PORT || 8080;

// express middlewares (in order)
app.use(express.json());
app.use(process.env.BASE_RESOURCE_URL, require("./routes/bookRoutes"));
app.use(process.env.BASE_AUTH_URL, require("./routes/authRoutes"));
app.use(errorHandler)


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
