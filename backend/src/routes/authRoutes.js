const express = require("express");

const router = express.Router();

const {
    register,
    login,
} = require("../controllers/authController");

const authenticate = require("../middleware/authMiddleware");
const rateLimiter = require("../middleware/rateLimiter");
const slidingWindowLimiter =
    require("../middleware/slidingWindowLimiter");


router.post("/register", register);

router.post("/login", login);

router.get(
    "/profile",
    authenticate,
    rateLimiter,
    (req, res) => {

        res.json({
            success: true,
            user: req.user
        });


    }
);

module.exports = router;