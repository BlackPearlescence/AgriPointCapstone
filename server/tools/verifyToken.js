// Verify Token Middleware

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" })
    }
    jwt.verify(token, "allmyhatersmademewhoiamtodayakingofthisworld", (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" })
        }
        req.customerId = decoded.sub;
        next();
    });
}


module.exports = verifyToken