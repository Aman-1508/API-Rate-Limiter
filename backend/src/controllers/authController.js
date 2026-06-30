const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (existingUser.rowCount > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            `INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
            RETURNING id, name, email, plan, created_at`,
            [name, email, hashedPassword]
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser.rows[0]
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const login = async (req, res) => {
    try {

        const { email, password ,plan } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rowCount === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        
        const token = jwt.sign(
    {
        id: user.rows[0].id,
        email: user.rows[0].email,
        plan: user.rows[0].plan
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES_IN
    }
);

// Success Response
return res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        plan: user.rows[0].plan
    }
});

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    register,
    login,
};