const { createLogger, transports, format, transport } = require("winston");
const { combine, timestamp, label, prettyPrint, colorize, printf } = format;

// Log format

const logFormat = printf(({ level, message, timestamp }) => {
    return `Timestamp: ${(timestamp)}\nLevel: ${level}\nMessage: ${message}\n`
});

// Logs to console AND file
const consoleLogger = createLogger({
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                logFormat
            )
        }),
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" })
    ],
    format: combine(
        timestamp(),
        prettyPrint()
      ),    
});

// Logs only to file
const fileLogger = createLogger({
    transports: [
        new transports.File({ filename: "error.log", level: "error", format: logFormat}),
        new transports.File({ filename: "combined.log", format: logFormat})
    ],
    format: combine(
        timestamp(),
        prettyPrint()
    ),  
})

module.exports = {
    consoleLogger,
    fileLogger,
};