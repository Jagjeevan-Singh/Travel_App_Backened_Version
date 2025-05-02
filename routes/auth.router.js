const express = require('express'); 
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require("C://my test 1/JAVAS/TravelApp/model/user.model.js");
const signupHandler = require("C://my test 1/JAVAS/TravelApp/controllers/signupController.js");

const router = express.Router();

// GET: Test route for register
router.get('/register', (req, res) => {
    res.send("This is the GET /api/auth/register endpoint for testing.");
});

// Registration route (POST)
router.route("/register")
    .post(signupHandler);

// Login route
router.route("/login")
    .post(async (req, res) => {
        try {
            const user = await User.findOne({ number: req.body.number });
            if (!user) {
                return res.status(401).json({ message: "Invalid Mobile Number" });
            }

            // Decrypt the password
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
            if (decryptedPassword !== req.body.password) {
                return res.status(401).json({ message: "Incorrect Password" });
            }

            // Create a token and send user info
            const { password, ...rest } = user._doc; // Exclude password from user data
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
            res.json({ ...rest, accessToken });

        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    });

module.exports = router;