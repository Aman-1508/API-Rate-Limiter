const client = require("../config/redis");

const testSlidingWindow = async (req, res) => {
    try {

        const key = "sliding_demo";

        const now = Date.now();

        await client.zAdd(key, {
            score: now,
            value: now.toString(),
        });

        const requests = await client.zRangeWithScores(key, 0, -1);

        res.status(200).json({
            success: true,
            totalRequests: requests.length,
            requests,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    testSlidingWindow,
};