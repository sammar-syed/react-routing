// Import MongoClient
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

async function connectToDatabase() {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("smit");

    return db;
}

connectToDatabase()
export default connectToDatabase;