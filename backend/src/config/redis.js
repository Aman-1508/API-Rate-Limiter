const { createClient } = require("redis");

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

client.on("connect", () => {
    console.log("✅ Redis Connected");
});

client.on("error", (err) => {
    console.error("❌ Redis Error:", err.message);
});

(async () => {
    await client.connect();
})();

module.exports = client;