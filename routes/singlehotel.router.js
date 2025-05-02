const express = require('express');
const router = express.Router();
const Hotel = require("C://my test 1/JAVAS/TravelApp/model/hotel.model.js");

// Route for fetching all hotels
router.route("/")
    .get(async (req, res) => {
        try {
            const hotels = await Hotel.find(); // Fetches all hotels
            res.json(hotels);
        } catch (err) {
            res.status(500).json({ message: "Error fetching hotels" });
        }
    });

// Route for fetching a single hotel by id
router.route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const hotel = await Hotel.findById(id);
            if (!hotel) {
                return res.status(404).json({ message: "No hotel found" });
            }
            res.json(hotel);
        } catch (err) {
            res.status(500).json({ message: "Error fetching hotel" });
        }
    });

module.exports = router;
