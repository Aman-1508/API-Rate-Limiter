require("dotenv").config();

const app = require("./app");
require("./config/db");

const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 5000;

(async () => {
    await connectRedis();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on ${PORT}`);
    });
})();