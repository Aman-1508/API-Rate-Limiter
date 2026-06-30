const client = require("../config/redis");

const testRedis = async (req, res) => {
    try {

        await client.set("name", "Aman");

        const name = await client.get("name");

        res.json({
            success: true,
            name
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    testRedis
};