const client = require("../config/redis");
const rateLimits = require("../config/rateLimitConfig");

const slidingWindowLimiter = async (req, res, next) => {

    try {

        const userPlan = req.user.plan || "free";

        if (userPlan === "admin") {
            return next();
        }

        const {
            limit: LIMIT,
            window: WINDOW
        } = rateLimits[userPlan];

        const key = `sliding_rate:${req.user.id}`;
        const now = Date.now();

        const windowStart = now - WINDOW * 1000;

        await client.zRemRangeByScore(key, 0, windowStart);

        const requestCount = await client.zCard(key);

        if (requestCount >= LIMIT) {

            return res.status(429).json({
                success: false,
                message: "Too Many Requests"
            });

        }

        const crypto = require("crypto");

        await client.zAdd(key, {
            score: now,
            value: `${now}-${crypto.randomUUID()}`,
        });
        
        await client.expire(key, WINDOW);

        next();

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Sliding Window Error"
        });

    }

};

module.exports = slidingWindowLimiter;