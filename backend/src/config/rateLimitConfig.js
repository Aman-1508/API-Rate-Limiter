const rateLimitConfig = {

    algorithm: "sliding",

    plans: {

        free: {
            limit: 10,
            window: 60,
        },

        premium: {
            limit: 100,
            window: 60,
        },

        admin: {
            limit: Number.MAX_SAFE_INTEGER,
            window: 60,
        }

    }

};

module.exports = rateLimitConfig;