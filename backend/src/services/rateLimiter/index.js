const fixedWindow = require("./fixedWindow");
const slidingWindow = require("./slidingWindow");
const tokenBucket = require("./tokenBucket");

module.exports = {
    fixed: fixedWindow,
    sliding: slidingWindow,
    tokenBucket: tokenBucket,
};