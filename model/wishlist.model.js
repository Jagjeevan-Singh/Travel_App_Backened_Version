const mongoose = require('mongoose');

// Define the schema for the Wishlist
const wishlistSchema = new mongoose.Schema({
    hotelId: { type: String, required: true }, // Required hotelId field
    userId: { type: String, required: true }, // Optional: To link the wishlist to a user
    dateAdded: { type: Date, default: Date.now } // Optional: Timestamp for when the hotel was added
});

// Create an index on hotelId for improved query performance
wishlistSchema.index({ hotelId: 1 });

// Create the Wishlist model based on the schema
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Export the Wishlist model for use in other parts of the application
module.exports = Wishlist;
