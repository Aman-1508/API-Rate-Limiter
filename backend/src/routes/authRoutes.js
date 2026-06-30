const express = require("express");

const router = express.Router();

const {
    register,
    login,
} = require("../controllers/authController");

const authenticate = require("../middleware/authMiddleware");
const rateLimiter = require("../middleware/rateLimiter");

router.post("/register", register);

router.post("/login", login);

router.get(
    "/profile",
    authenticate,
    rateLimiter,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Protected Route Accessed",
            user: req.user
        });

    }
);

module.exports = router;