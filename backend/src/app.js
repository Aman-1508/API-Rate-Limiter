const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        service: "Distributed API Rate Limiter",
        version: "1.0.0",
        status: "UP",
        endpoints: {
            auth: "/api/auth",
            apiKeys: "/api/keys"
        }
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "UP",
        timestamp: new Date().toISOString(),
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/keys", apiKeyRoutes);
module.exports = app;