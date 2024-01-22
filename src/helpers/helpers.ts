import { existsSync, readFileSync } from 'node:fs';
import { TFIleType, TParsedFile } from '../types';
import _ from 'lodash';

export const parseJsonByPath = (path: string): TParsedFile => {
	if (existsSync(path)) {
		const fileString = readFileSync(path, { encoding: 'utf8' });
		return JSON.parse(fileString) as TParsedFile;
	} else {
		throw new Error(`File with path ${path} not exist`);
	}
};

// fixme
export const parseYamlByPath = (path: string): TParsedFile => {
	if (existsSync(path)) {
		const fileString = readFileSync(path, { encoding: 'utf8' });
		return JSON.parse(fileString) as TParsedFile;
	} else {
		throw new Error(`File with path ${path} not exist`);
	}
};

export const compareObjects = (firstFile: TParsedFile, secondFile: TParsedFile): string => {
	const firstFileKeys = Object.keys(firstFile);
	const secondFileKeys = Object.keys(secondFile);
	const uniqKeys = [...new Set([...firstFileKeys, ...secondFileKeys])];
	const sortedUniqKeys = _.sortBy(uniqKeys);

	const result: string[] = [];
	result.push('{');

	for (const key of sortedUniqKeys) {
		const onlyFirstFileHasKey = firstFileKeys.includes(key) && !secondFileKeys.includes(key);
		const onlySecondFileHasKey = !firstFileKeys.includes(key) && secondFileKeys.includes(key);

		if (onlyFirstFileHasKey) {
			result.push(`  - ${key}: ${firstFile[key]}`);
		} else if (onlySecondFileHasKey) {
			result.push(`  + ${key}: ${secondFile[key]}`);
		} else {
			if (firstFile[key] === secondFile[key]) {
				result.push(`    ${key}: ${firstFile[key]}`);
			} else {
				result.push(`  - ${key}: ${firstFile[key]}`);
				result.push(`  + ${key}: ${secondFile[key]}`);
			}
		}
	}

	result.push('}');

	return result.join('\n');
};

export const parseFile = (path: string, fileType: TFIleType): TParsedFile => {
	switch (fileType) {
		case 'json':
			return parseJsonByPath(path);
		case 'yaml':
			return parseYamlByPath(path);
		default:
			throw new Error(`File format ${fileType} is not supported`);
	}
};

export const compareTwoFiles = (
	firstPath: string,
	secondPath: string,
	fileType: TFIleType,
): string => {
	const firstFile = parseFile(firstPath, fileType);
	const secondFile = parseFile(secondPath, fileType);

	return compareObjects(firstFile, secondFile);
};
