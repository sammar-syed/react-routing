
// Import MongoClient
import { MongoClient } from "mongodb";

// URL OF MONGO DB - Connection String
const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

// 1. Function to connect with DB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("smit");
        return db;
    }
    catch (err) {
        console.error("Error connecting to MongoDB", err);
        throw err;
    }
}

// 2. Insert Data into SMIT Database
// async function insertData() {
//     await client.connect();

//     const db = client.db("smit");
//     const collection = db.collection("students");

//     const result = await collection.insertOne({
//         name: "Samra",
//         role: "Software Developer",
//         age: 34,
//         city: "Multan"
//     })

//     console.log(result);
// }

// Get Data from DB using Nodejs
async function getData() {
    await client.connect();

    const db = client.db("smit");
    const collection = db.collection("students");
    const data = await collection.find().toArray();
    console.log(data);
}
// insertData().catch(console.err);


// Delete One Document

async function deleteData() {
    await client.connect();

    const db = client.db("smit");
    const collection = db.collection("students");

    // Delete query
    const result = await collection.deleteOne({ name: "Shafaq" });

    console.log(result);
}


export { connectToDatabase, deleteData, getData }
connectToDatabase()
deleteData()
getData()
