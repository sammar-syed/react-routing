import express from "express";
import cors from "cors";
import connectToDatabase from "./database.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());

// Creating POST API - CRUD
app.post("/students", async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection("students");

    await collection.insertOne(req.body);

    res.json({ message: "Student saved successfully" });
});

// READ - GET
app.get("/students", async (req, res)=>{
    try{
        const db = await connectToDatabase();
        const collection = db.collection("students");

        const students = await collection.find().toArray();

        res.json(students);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
} )

// UPDATE (PUT)
app.put("/students/:id", async(req,res)=>{
    try{
        const db = await connectToDatabase();
        const collection = db.collection("students");

        await collection.updateOne(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: req.body
            }
        );
        res.json({
            message: "Student updated successfully"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
})

// DELETE
app.delete("/students/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("students");

        const result = await collection.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});