import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new transports.File({ filename: 'logger.log' }),
        new transports.Console(), // Optional: log to console
    ],
});

export default logger;