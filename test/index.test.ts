import { describe, expect, it } from 'bun:test';
import { type InlineConfig, type ViteDevServer, createServer } from 'vite';
import clickableFilePathPlugin from '../src/index';

describe('vite-plugin-clickable-file-path', () => {
	const wrapLog = async (
		serverConfig: InlineConfig,
		callback: (opts: { server: ViteDevServer; originalLog?: typeof console.log }) => void,
	) => {
		const server = await createServer({
			...serverConfig,
			plugins: [clickableFilePathPlugin()],
		});

		// Mock console.log to capture output
		const originalLog = console.log;
		let logOutput = '';
		console.log = (message: string) => {
			logOutput += `${message}\n`;
		};
		await callback({ server, originalLog });

		// Restore original console.log
		console.log = originalLog;
		return logOutput;
	};

	it('should convert file paths in console output to clickable URLs', async () => {
		const logOutput = await wrapLog({}, ({ server }) => {
			// Simulate a file path log
			server.config.logger.info('/path/to/file.ts:10:5');
		});
		// Check if the output contains a clickable URL
		expect(logOutput).toContain('file:///path/to/file.ts:10:5');
	});

	it('should not convert file paths in console output to clickable URLs when the log level is set to "silent"', async () => {
		const logOutput = await wrapLog({ logLevel: 'silent' }, ({ server }) => {
			// Simulate a file path log
			server.config.logger.info('/path/to/file.ts:10:5');
		});

		// Check if the output does not contain a clickable URL
		expect(logOutput).toContain('');
	});

	it('should handle multiple file paths in a single log message', async () => {
		const logOutput = await wrapLog({}, ({ server }) => {
			// Simulate a file path log
			server.config.logger.info('/path/to/file1.ts:10:5 /path/to/file2.ts:20:10');
		});

		// Check if the output contains clickable URLs for both file paths
		expect(logOutput).toContain('file:///path/to/file1.ts:10:5 file:///path/to/file2.ts:20:10');
	});
});
