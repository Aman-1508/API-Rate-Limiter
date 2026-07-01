const { createClient } = require("redis");

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error("❌ Redis: Max retries reached.");
                return false;
            }

            console.log(`🔄 Redis reconnect attempt ${retries}...`);
            return Math.min(retries * 500, 5000);
        },
    },
});

client.on("connect", () => {
    console.log("🔄 Connecting to Redis...");
});

client.on("ready", () => {
    console.log("✅ Redis Connected");
});

client.on("reconnecting", () => {
    console.log("♻️ Reconnecting to Redis...");
});

client.on("end", () => {
    console.log("⚠️ Redis connection closed.");
});

client.on("error", (err) => {
    console.error("❌ Redis Error:", err.message);
});

const connectRedis = async () => {
    try {
        if (!client.isOpen) {
            await client.connect();
        }
    } catch (err) {
        console.error("❌ Failed to connect Redis:", err.message);
    }
};

module.exports = {
    client,
    connectRedis,
};