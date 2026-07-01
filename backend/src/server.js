require("dotenv").config();

const app = require("./app");
require("./config/db");
require("./config/redis");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
