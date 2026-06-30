const fixedWindow = require("./fixedWindow");
const slidingWindow = require("./slidingWindow");

const algorithms = {
    fixed: fixedWindow,
    sliding: slidingWindow,
};

module.exports = algorithms;