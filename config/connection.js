const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

async function connectDb() {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_URI);
        console.log(`MongoDb connected: ${connect.connection.host} on DB: ${connect.connection.name}`)
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = connectDb