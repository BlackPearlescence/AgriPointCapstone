const express = require("express");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { Customer, BlacklistToken } = require("../schema.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { handleInvalidCredentialsError, handleBadRegistrationDetailsError, handleLogoutFailureError } = require("../errorhandling/errors.js");
const { consoleLogger } = require("../errorhandling/logger.js");
const verifyToken = require("../tools/verifyToken.js");

const router = express.Router();

// Local Strategy
passport.use(new LocalStrategy(Customer.authenticate()));

// JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "allmyhatersmademewhoiamtodayakingofthisworld"
}, (jwtPayload, done) => {
    Customer.findById(jwtPayload.sub)
        .then((customer) => {
            if (customer) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => done(err, false))
}));


router.use(cookieParser());

// Check if user is logged in already
router.get("/check", verifyToken,  async (req, res, next) => {
    const customerId = req.customerId;
    consoleLogger.info(customerId)
    try {
        const customer = await Customer.findById(customerId)
        res.status(StatusCodes.OK).json({ message: "User is logged in.", ...customer })
    } catch (err) {
        consoleLogger.error("didnt work")
        next(err)
    }
})


// Registration
router.post("/register", async (req, res, next) => {
    const { username, password, first_name, last_name } = req.body
    consoleLogger.info(`Registering user ${username}...`)
    Customer.register(new Customer({ username, first_name, last_name }), password, (err) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid registration details" })
        } else {
            res.status(StatusCodes.CREATED).json({ message: "User registered successfully." })
        }
    });
});

// router.use(handleBadRegistrationDetailsError)


// Login
// router.post("/login", (req, res, next) => {
//     const { username, password } = req.body;
//     Customer.findOne({ username }, (err, customer) => {
//         if (err) {
//             return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" })
//         } else if (!customer) {
//             return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" })
//         }
//         customer.authenticate(password, (err, authenticated) => {
//             if (err) {
//                 next(err)
//             } else if (!authenticated) {
//                 next(err)
//             } else {
                // const token = jwt.sign({ sub: customer._id }, "allmyhatersmademewhoiamtodayakingofthisworld", { expiresIn: "1h" });
                // res.cookie("jwt", token, { httpOnly: true, sameSite: true });
                // res.status(StatusCodes.OK).json({ message: "User logged in successfully." })
//             }

//         })
//     })
// })

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const customer = await Customer.findOne({ username });
        const authenticated = await customer.authenticate(password);
        consoleLogger.info(authenticated)
        console.log(authenticated)
        if (!customer || !authenticated.user) {
            err.message(authenticated.error)
            next(err)
        } else {
            consoleLogger.info("User logged in successfully")
            const token = jwt.sign({ sub: customer._id }, "allmyhatersmademewhoiamtodayakingofthisworld", { expiresIn: "10s" } );
            res.cookie("agrijwt", token, { httpOnly: true, sameSite: true });
            res.status(StatusCodes.OK).json({ message: "User logged in successfully.", token})
        }
    } catch(err) {
        next(err)
    }
})

router.use(handleInvalidCredentialsError)

router.post("/logout", verifyToken, async (req, res, next) => {
    try {
        const token = req.cookies.agrijwt;
        res.clearCookie("agrijwt")

        consoleLogger.info(token)
        await BlacklistToken.create({ token })
        res.status(StatusCodes.OK).json({ message: "User logged out successfully", token })
    } catch (err) {
        next(err)
    }
   
})

router.use(handleLogoutFailureError)


module.exports = router;