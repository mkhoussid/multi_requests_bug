import chalk from 'chalk';
import { errorMatrix } from './constants';

export const errorHandler = ({ err, functionName = 'function', level = errorMatrix.LEVELS.INFO, prefixText = '' }) => {
	switch (level) {
		case errorMatrix.LEVELS.INFO:
			console.log(
				chalk.bgBlue(`[fastify] ${prefixText ? `${prefixText}\n` : ''}[fastify] Error in \`${functionName}\`:\n`),
				chalk.whiteBright(err.stack),
				'\n--------',
			);
			break;

		case errorMatrix.LEVELS.ERROR:
			console.log(
				chalk.bgRed(`[fastify] ${prefixText ? `${prefixText}\n` : ''}[fastify] Error in \`${functionName}\`:\n`),
				chalk.whiteBright(err.stack),
				'\n--------',
			);
			break;

		default:
			throw new Error(`params incorrectly passed to errorHandler`);
	}
};

export const isFeatureEnabled = ({ feature }) => parseInt(process.env[feature]);

export const generateNumberInRange = (num = 6) => {
	const max = parseInt(`1${'0'.repeat(num - 1)}`);
	const min = max / 10 - 1;

	return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1) + min).toString();
};
