const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");

const {
    createApiKey,
    listApiKeys,
    renameApiKey,
    revokeApiKey,
} = require("../controllers/apiKeyController");

// Create API Key
router.post("/", authenticate, createApiKey);

// List API Keys
router.get("/", authenticate, listApiKeys);

// Rename API Key
router.patch("/:id", authenticate, renameApiKey);

// Revoke API Key
router.patch("/:id/revoke", authenticate, revokeApiKey);

// Test Authentication
router.get("/me", authenticate, (req, res) => {
    return res.json({
        success: true,
        user: req.user,
    });
});

module.exports = router;