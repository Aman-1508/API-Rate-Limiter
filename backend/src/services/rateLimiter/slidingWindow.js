const client = require("../../config/redis");
const { slidingWindowScript } = require("../../utils/luaScripts");
const rateLimitConfig = require("../../config/rateLimitConfig");
const crypto = require("crypto");

const slidingWindow = async (req, res, next) => {

    try {

        const userPlan = req.user.plan || "free";

        if (userPlan === "admin") {
            return next();
        }

        const {
            limit: LIMIT,
            window: WINDOW,
        } = rateLimitConfig.plans[userPlan];

        const key = `sliding_rate:${req.user.id}`;

        const now = Date.now();

        const requestId = `${now}-${crypto.randomUUID()}`;

        const result = await client.eval(slidingWindowScript, {
            keys: [key],
            arguments: [
                String(now),
                String(WINDOW),
                String(LIMIT),
                requestId,
            ],
        });

        const allowed = Boolean(Number(result[0]));
        const requestCount = Number(result[1]);
        const remaining = Number(result[2]);
        const ttl = Number(result[3]);

        res.set({
            "X-RateLimit-Limit": LIMIT,
            "X-RateLimit-Remaining": remaining,
            "X-RateLimit-Reset": Math.ceil(ttl / 1000),
        });

        if (!allowed) {
            return res.status(429).json({
                success: false,
                message: "Too Many Requests",
                retryAfter: Math.ceil(ttl / 1000),
            });
        }

        next();

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Sliding Window Error",
        });

    }

};

module.exports = slidingWindow;
