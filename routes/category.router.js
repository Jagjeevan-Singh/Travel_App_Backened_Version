const express = require('express');
const router = express.Router();

// Corrected file path to use relative or path module
const Category = require("C://my test 1/JAVAS/TravelApp/model/category.model.js");

router.route("/")
.get(async (req, res) => {
    try {
        const categories = await Category.find({});
        
        // If no categories are found, respond with a 404
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        // If categories are found, respond with the data
        res.json(categories);

    } catch (err) {
        console.error("Error fetching categories:", err);
        
        // Use 500 Internal Server Error for issues on the server side
        res.status(500).json({ message: "Could not retrieve categories due to a server error" });
    }
});

module.exports = router;
