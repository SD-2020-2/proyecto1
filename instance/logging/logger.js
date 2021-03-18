const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	transports: [
		new transports.File({
			filename: 'instance.log',
			level: 'info',
			format: format.combine(format.timestamp(), format.simple()),
		}),
	],
});

module.exports = logger;
