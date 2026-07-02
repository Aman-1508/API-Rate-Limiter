const {client} = require("../../config/redis");
const { tokenBucketScript } = require("../../utils/luaScripts");
const rateLimitConfig = require("../../config/rateLimitConfig");

const tokenBucket = async (req, res, next) => {
    try {
        const userPlan = req.user.plan || "free";

        if (userPlan === "admin") {
            return next();
        }

        // Current config (derived refill rate)
        const {
            capacity: CAPACITY,
            refillRate,
            ttl,
        } = rateLimitConfig.plans[userPlan].tokenBucket;

        // // Tokens generated per second
        // const refillRate = CAPACITY / WINDOW;

        const key = `token_bucket:${req.user.id}`;

        const now = Date.now();

        const result = await client.eval(tokenBucketScript, {
            keys: [key],
            arguments: [
                String(now),
                String(CAPACITY),
                String(refillRate),
                String(ttl),
            ],
        });

        const allowed = Boolean(Number(result[0]));
        const tokensLeft = Number(result[1]);
        const retryAfter = Number(result[2]);

        res.set({
            "X-RateLimit-Limit": CAPACITY,
            "X-RateLimit-Remaining": Math.floor(tokensLeft),
            "Retry-After": retryAfter,
        });

        if (!allowed) {
            return res.status(429).json({
                success: false,
                message: "Too Many Requests",
                retryAfter,
            });
        }

        next();

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Token Bucket Error",
        });

    }
};

module.exports = tokenBucket;