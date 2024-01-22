import { TFIleType, TParsedFile } from '../types';
import _ from 'lodash';
import { parseFile } from './parsers';

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

export const compareTwoFiles = (
	firstPath: string,
	secondPath: string,
	fileType: TFIleType,
): string => {
	const firstFile = parseFile(firstPath, fileType);
	const secondFile = parseFile(secondPath, fileType);

	return compareObjects(firstFile, secondFile);
};
