const { createClient } = require("redis");
require("dotenv").config();

const client = process.env.REDIS_URL
    ? createClient({
          url: process.env.REDIS_URL,
      })
    : createClient({
          socket: {
              host: process.env.REDIS_HOST,
              port: Number(process.env.REDIS_PORT),
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
        process.exit(1);
    }
};

module.exports = {
    client,
    connectRedis,
};