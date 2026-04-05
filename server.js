const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB");

// schema
const TransactionSchema = new mongoose.Schema({
    text: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

// routes

// GET all transactions
app.get("/transactions", async (req, res) => {
    const data = await Transaction.find();
    res.json(data);
});

// ADD transaction
app.post("/transactions", async (req, res) => {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.json(newTransaction);
});

// DELETE transaction
app.delete("/transactions/:id", async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// start server
app.listen(5000, () => console.log("Server running on port 5000"));