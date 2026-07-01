const rateLimitConfig = {

    // Change this to switch algorithms
    algorithm: "tokenBucket",
    // fixed | sliding | tokenBucket

    plans: {

        free: {

            fixed: {
                limit: 10,
                window: 60,
            },

            sliding: {
                limit: 10,
                window: 60,
            },

            tokenBucket: {
                capacity: 10,
                refillRate: 10 / 60, 
                ttl: 120,
            },

        },

        premium: {

            fixed: {
                limit: 100,
                window: 60,
            },

            sliding: {
                limit: 100,
                window: 60,
            },

            tokenBucket: {
                capacity: 100,
                refillRate: 100 / 60,
                ttl: 120,
            },

        },

        admin: {

            fixed: {
                limit: Number.MAX_SAFE_INTEGER,
                window: 60,
            },

            sliding: {
                limit: Number.MAX_SAFE_INTEGER,
                window: 60,
            },

            tokenBucket: {
                capacity: Number.MAX_SAFE_INTEGER,
                refillRate: Number.MAX_SAFE_INTEGER,
                ttl: 120,
            },

        }

    }

};

module.exports = rateLimitConfig;