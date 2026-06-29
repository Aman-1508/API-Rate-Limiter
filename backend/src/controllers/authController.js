const register = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Register API is working"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const login = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Login API is working"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    register,
    login,
};