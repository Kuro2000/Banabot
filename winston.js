const winston = require('winston');
const path = require('path');

module.exports = winston.createLogger({
	// Combine log's format
	format: winston.format.combine(
		winston.format.splat(),
		// Format logs' timestamp
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		// Colorize logs
		winston.format.colorize(),

		winston.format.printf(
			log => {
				// Display stack trace instead of message in case of errors
				if(log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
				return `[${log.timestamp}] [${log.level}] ${log.message}`;
			},
		),
	),
	transports: [
		// Display logs in console
		new winston.transports.Console(),
		// Write errors in log file
		new winston.transports.File({
			level: 'error',
			filename: path.join(__dirname, 'errors.log'),
		}),
	],
});