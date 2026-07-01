const fs = require("fs");
const path = require("path");

const fixedWindowScript = fs.readFileSync(
    path.join(__dirname, "../lua/fixedWindow.lua"),
    "utf8"
);

const slidingWindowScript = fs.readFileSync(
    path.join(__dirname, "../lua/slidingWindow.lua"),
    "utf8"
);

const tokenBucketScript = fs.readFileSync(
    path.join(__dirname, "../lua/tokenBucket.lua"),
    "utf8"
);

module.exports = {
    fixedWindowScript,
    slidingWindowScript,
    tokenBucketScript
};