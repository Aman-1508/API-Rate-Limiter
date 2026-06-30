const express = require("express");

const router = express.Router();

const { testRedis } = require("../controllers/redisController");

router.get("/test", testRedis);

module.exports = router;