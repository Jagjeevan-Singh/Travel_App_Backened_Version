const express = require('express');
const Category = require("C://my test 1/JAVAS/TravelApp/model/category.model.js");
const categories = require("C://my test 1/JAVAS/TravelApp/data/categories.js"); // Assuming this exports an object with a 'data' property

const router = express.Router();

router.route("/")
    .post(async (req, res) => {
        try {
            // Optionally check for existing data and only clear if needed
            const existingHotels = await Category.find({});
            if (existingHotels.length > 0) {
                await Category.deleteMany({}); // Deletes all entries
            }
            
            const categoriesInDB = await Category.insertMany(categories.data);
            res.json(categoriesInDB);
        } catch (err) {
            console.error("Error adding data to DB:", err); // Log the error
            res.status(500).json({ message: "Could not add categories to DB", error: err.message }); // Return error message
        }
    });

module.exports = router;