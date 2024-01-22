#!/usr/bin/env node

import { Command } from 'commander';
import { compareTwoFiles, parseJsonByPath } from './helpers/helpers';

const program = new Command();

const genDiff = (path1?: string, path2?: string): void => {
	program
		.name('gendiff')
		.description('Compares two configuration files and shows a difference.')
		.version('0.0.1')
		.argument('<filepath1>')
		.argument('<filepath2>')
		.option('-f, --format <type>', 'output format')
		.action((filepath1, filepath2) => {
			const options = program.opts();

			console.log(compareTwoFiles(filepath1, filepath2, options?.format));
		});

	program.parse(process.argv);
};

genDiff();

export default genDiff;
