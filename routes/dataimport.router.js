const express = require('express');
const Hotel = require("C://my test 1/JAVAS/TravelApp/model/hotel.model.js");
const hotels = require("C://my test 1/JAVAS/TravelApp/data/hotel.js"); // Assuming this exports an object with a 'data' property

const router = express.Router();

router.route("/")
    .post(async (req, res) => {
        try {
            // Optionally check for existing data and only clear if needed
            const existingHotels = await Hotel.find({});
            if (existingHotels.length > 0) {
                await Hotel.deleteMany({}); // Deletes all entries
            }
            
            const hotelsInDB = await Hotel.insertMany(hotels.data);
            res.json(hotelsInDB);
        } catch (err) {
            console.error("Error adding data to DB:", err); // Log the error
            res.status(500).json({ message: "Could not add data to DB", error: err.message }); // Return error message
        }
    });

module.exports = router;