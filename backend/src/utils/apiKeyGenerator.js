const crypto = require("crypto");

const generateApiKey = () => {

    // 32 random bytes → 64 hex characters
    const random = crypto.randomBytes(32).toString("hex");

    return `sk_live_${random}`;
};

const hashApiKey = (apiKey) => {
    return crypto
        .createHash("sha256")
        .update(apiKey)
        .digest("hex");
};

module.exports = {generateApiKey , hashApiKey};