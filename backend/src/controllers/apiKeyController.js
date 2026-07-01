const pool = require("../config/db");

const {
    generateApiKey,
    hashApiKey,
} = require("../utils/apiKeyGenerator");

// ======================================
// Create API Key
// ======================================

const createApiKey = async (req, res) => {

    try {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Key name is required",
            });
        }

        const apiKey = generateApiKey();

        const keyHash = hashApiKey(apiKey);

        await pool.query(
            `
            INSERT INTO api_keys
            (user_id, name, key_hash)
            VALUES ($1, $2, $3)
            `,
            [
                req.user.id,
                name,
                keyHash,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "API Key created successfully",
            apiKey,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================================
// List API Keys
// ======================================

const listApiKeys = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
                id,
                name,
                status,
                created_at,
                last_used
            FROM api_keys
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            apiKeys: result.rows,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================================
// Rename API Key
// ======================================

const renameApiKey = async (req, res) => {

    try {

        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const result = await pool.query(
            `
            UPDATE api_keys
            SET name = $1
            WHERE
                id = $2
                AND user_id = $3
            RETURNING *
            `,
            [
                name,
                id,
                req.user.id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "API Key not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "API Key renamed successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================================
// Revoke API Key
// ======================================

const revokeApiKey = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            UPDATE api_keys
            SET status = 'revoked'
            WHERE
                id = $1
                AND user_id = $2
            RETURNING *
            `,
            [
                id,
                req.user.id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "API Key not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "API Key revoked successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

module.exports = {
    createApiKey,
    listApiKeys,
    renameApiKey,
    revokeApiKey,
};