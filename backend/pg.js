const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "book_database";

let db;

async function connectdb() {
    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");

        db = client.db(dbName);
        return db;
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

function setdb() {
    if (!db) {
        throw new Error("Database not connected. Call connectdb() first.");
    }
    return db;
}


module.exports = { connectdb, setdb };
