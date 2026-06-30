const client = require("../config/redis");
const { rateLimiterScript } = require("../utils/luaScripts");
const rateLimits = require("../config/rateLimitConfig");

const rateLimiter = async (req, res, next) => {
    try {

        const userPlan = req.user.plan || "free";

        if (userPlan === "admin") {
            return next();
        }

        const {
            limit: LIMIT,
            window: WINDOW,
        } = rateLimits[userPlan];

        const key = `rate_limit:${req.user.id}`;

        const result = await client.eval(rateLimiterScript, {
            keys: [key],
            arguments: [
                WINDOW.toString(),
                LIMIT.toString()
            ],
        });

        const allowed = Boolean(Number(result[0]));
        const requestCount = Number(result[1]);
        const remaining = Number(result[2]);
        const ttl = Number(result[3]);

        res.set({
            "X-RateLimit-Limit": LIMIT,
            "X-RateLimit-Remaining": remaining,
            "X-RateLimit-Reset": ttl,
        });

        if (!allowed) {
            return res.status(429).json({
                success: false,
                message: "Too Many Requests",
                retryAfter: ttl,
            });
        }

        next();

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Rate Limiter Error",
        });

    }
};

module.exports = rateLimiter;