const algorithms = require("../services/rateLimiter");
const rateLimitConfig = require("../config/rateLimitConfig");

const rateLimiter = async (req, res, next) => {

    try {

        const algorithm = rateLimitConfig.algorithm;

        const handler = algorithms[algorithm];

        if (!handler) {
            return res.status(500).json({
                success: false,
                message: "Unknown Rate Limiter",
            });
        }

        return handler(req, res, next);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Rate Limiter Error",
        });

    }

};

module.exports = rateLimiter;