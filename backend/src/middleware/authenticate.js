const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { hashApiKey } = require("../utils/apiKeyGenerator");

const authenticate = async (req, res, next) => {
    try {

        // =========================
        // JWT Authentication
        // =========================

        const authHeader = req.header("Authorization");

        if (authHeader && authHeader.startsWith("Bearer ")) {

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            return next();

        }

        // =========================
        // API Key Authentication
        // =========================

        const apiKey = req.header("x-api-key");

        if (apiKey) {

            const keyHash = hashApiKey(apiKey);

            const result = await pool.query(
                `
                SELECT
                    u.id,
                    u.email,
                    u.plan,
                    ak.id AS api_key_id
                FROM api_keys ak
                JOIN users u
                    ON ak.user_id = u.id
                WHERE
                    ak.key_hash = $1
                    AND ak.status = 'active'
                `,
                [keyHash]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid API Key",
                });
            }

            await pool.query(
                `
                UPDATE api_keys
                SET last_used = CURRENT_TIMESTAMP
                WHERE id = $1
                `,
                [result.rows[0].api_key_id]
            );

            req.user = {
                id: result.rows[0].id,
                email: result.rows[0].email,
                plan: result.rows[0].plan,
            };

            return next();

        }

        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Authentication failed",
        });

    }
};

module.exports = authenticate;