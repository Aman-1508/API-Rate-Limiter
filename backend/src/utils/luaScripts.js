const fs = require("fs");
const path = require("path");

const rateLimiterScript = fs.readFileSync(
    path.join(__dirname, "../lua/rateLimiter.lua"),
    "utf8"
);

module.exports = {
    rateLimiterScript,
};