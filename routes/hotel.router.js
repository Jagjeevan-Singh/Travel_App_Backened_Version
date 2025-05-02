const express = require('express');
const router = express.Router();
const Hotel = require("C://my test 1/JAVAS/TravelApp/model/hotel.model.js");

// GET route to fetch all hotels
router.route("/")
    .get(async (req, res) => {
        const hotelCategory = req.query.category // http://localhost:3500/api/hotels?category=National+Park
        try {
            let hotelss
            if (hotelCategory){
                hotel = await Hotel.find({ category: hotelCategory })
            }else{
                hotelss = await Hotel.find({});
            }
            const hotels = await Hotel.find({});
            hotels.length > 0 ? res.json(hotels) : res.status(404).json({ message: "No data found" });
        } catch (err) {
            console.error("Error fetching hotels:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
    // POST route to add a new hotel
    .post(async (req, res) => {
        try {
            const newHotel = new Hotel(req.body); // Create a new hotel instance from request body
            await newHotel.save(); // Save the hotel to the database
            res.status(201).json({ message: "Hotel added successfully!", hotel: newHotel }); // Respond with success message
        } catch (err) {
            console.error("Error adding hotel:", err);
            res.status(500).json({ message: "Could not add data to DB", error: err.message }); // Respond with error message
        }
    });

module.exports = router;
