const express = require('express');
const Wishlist = require("C://my test 1/JAVAS/TravelApp/model/wishlist.model.js");
const verifyUser = require("C://my test 1/JAVAS/TravelApp/middleware/verifyuser.js");

const router = express.Router();

// POST: Add a new hotel to the wishlist
router.route("/")
    .post(verifyUser, async (req, res) => {
        console.log("Received request body:", req.body); // Log request body
        const newWishlist = new Wishlist(req.body);
        try {
            const savedWishlist = await newWishlist.save();
            res.status(201).json(savedWishlist);
        } catch (err) {
            console.error("Error saving wishlist:", err); // Log the error
            res.status(500).json({ message: "Failed to create wishlist", error: err.message });
        }
    })
    .get(verifyUser, async (req, res) => {
        try {
            const wishlist = await Wishlist.find({});
            wishlist.length ? res.json(wishlist) : res.json({ message: "No items found in the wishlist" });
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            res.status(500).json({ message: "Failed to fetch wishlist", error: err.message });
        }
    });

// DELETE: Remove a hotel from the wishlist by id
router.route("/:id")
    .delete(verifyUser, async (req, res) => {
        const hotelId = req.params.id; // Use req.params.id
        try {
            const deletedWishlist = await Wishlist.findOneAndDelete({ hotelId });
            if (deletedWishlist) {
                res.json({ message: "Hotel deleted from wishlist" });
            } else {
                res.status(404).json({ message: "Wishlist item not found" });
            }
        } catch (err) {
            console.error("Error deleting wishlist item:", err);
            res.status(500).json({ message: "Could not delete hotel from wishlist", error: err.message });
        }
    });

module.exports = router;