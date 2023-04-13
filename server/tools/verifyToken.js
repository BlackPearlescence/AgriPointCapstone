// Verify Token Middleware


const { consoleLogger } = require("../errorhandling/logger");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.agrijwt;
    consoleLogger.info(token)
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" })
    }
    try {
        const decoded = jwt.verify(token, "allmyhatersmademewhoiamtodayakingofthisworld", { ignoreExpiration: false });
        req.customerId = decoded.sub
        next()
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.clearCookie("agrijwt")
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token expired" })
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" })
        }
    }
}


module.exports = verifyToken