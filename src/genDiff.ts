#!/usr/bin/env node

import { Command } from 'commander';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { parseJsonByPath } from './helpers/helpers';

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
			const file1 = parseJsonByPath(filepath1);
			const file2 = parseJsonByPath(filepath2);
			console.log(`file1: `, file1);
			console.log(`file2: `, file2);
		});

	program.parse(process.argv);
};

genDiff();

export default genDiff;
