import type { LogOptions, Plugin } from 'vite';

function addFileUrl(input: string) {
	const filePathRegex = /(?:[a-zA-Z]:)?(?:\/|\\)[\w\-.\/\\\s]+/g;
	return input.replace(filePathRegex, (match) => `file://${match}`);
}

function wrapLoggerMethod(method: (msg: string, options?: LogOptions) => void) {
	return (msg: string, options?: LogOptions) => method(addFileUrl(msg), options);
}

export default function clickableFilePathsPlugin(): Plugin {
	return {
		name: 'clickable-file-path',
		configureServer(server) {
			const logger = server.config.logger;
			logger.info = wrapLoggerMethod(logger.info);
			logger.warn = wrapLoggerMethod(logger.warn);
			logger.warnOnce = wrapLoggerMethod(logger.warnOnce);
			logger.error = wrapLoggerMethod(logger.error);
		},
	};
}
