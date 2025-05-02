const express = require('express');
const mongoose = require('mongoose');

const hotelDataAddedToDBRouter = require("C://my test 1/JAVAS/TravelApp/routes/dataimport.router.js");
const categoryDataAddedToDBRouter = require("C://my test 1/JAVAS/TravelApp/routes/categoryimport.router.js");


const hotelRouter = require("C://my test 1/JAVAS/TravelApp/routes/hotel.router.js");
const categoryRouter = require("C://my test 1/JAVAS/TravelApp/routes/category.router.js");
const singleHotelRouter = require("C://my test 1/JAVAS/TravelApp/routes/singlehotel.router.js");
const authRouter = require("C://my test 1/JAVAS/TravelApp/routes/auth.router.js");
const wishlistRouter = require("C://my test 1/JAVAS/TravelApp/routes/wishlist.router.js")

const connectDB = require("C://my test 1/JAVAS/TravelApp/config/dbconfig.js");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Define API routes
app.use("/api/hotel", hotelRouter); // This handles GET and POST for /api/hotel
app.use("/api/hoteldata", hotelDataAddedToDBRouter); // This handles hotel data import
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

const PORT = process.env.PORT || 3508;

// Base route for testing
app.get("/", (req, res) => {
    res.send("Hello Guys");
});

// MongoDB connection events
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB successfully.");
});
mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

// Start the server
app.listen(process.env.PORT || PORT, () => {
    console.log("Server is UP and Running");
});