const Wishlist = require("C://my test 1/JAVAS/TravelApp/model/wishlist.model.js");

const createWishlistHandler = async (req, res) => {
    const newWishlist = new Wishlist(req.body);
    try{
        const newWishlist = await newWishlist.save();
        res.status(201).json(savedWishlist);
    }catch(err){
        res.status(500).json({ message: "failed to create wishlist" })
    }
}

const deleteWishlistHandler = async (req, res) => {
    console.log("Received request body:", req.body); // Log request body
    const newWishlist = new Wishlist(req.body);
    try {
        const savedWishlist = await newWishlist.save();
        res.status(201).json(savedWishlist);
    } catch (err) {
        console.error("Error saving wishlist:", err); // Log the error
        res.status(500).json({ message: "Failed to create wishlist", error: err.message });
    }
}

const getWishlistHandler = async (req, res) => {
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
}



module.exports = {createWishlistHandler, deleteWishlistHandler, getWishlistHandler};