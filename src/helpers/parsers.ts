import { TFIleType, TParsedFile } from '../types';
import { existsSync, readFileSync } from 'node:fs';
import yaml from 'js-yaml';

export const parsers = (path: string): TParsedFile => {
	if (existsSync(path)) {
		const fileString = readFileSync(path, { encoding: 'utf8' });
		return JSON.parse(fileString) as TParsedFile;
	} else {
		throw new Error(`File with path ${path} not exist`);
	}
};

export const parseYamlByPath = (path: string): TParsedFile => {
	if (existsSync(path)) {
		const fileString = readFileSync(path, { encoding: 'utf-8' });

		return yaml.load(fileString) as TParsedFile;
	} else {
		throw new Error(`File with path ${path} not exist`);
	}
};

export const parseFile = (path: string, fileType: TFIleType): TParsedFile => {
	switch (fileType) {
		case 'json':
			return parsers(path);
		case 'yaml':
			return parseYamlByPath(path);
		default:
			throw new Error(`File format ${fileType} is not supported`);
	}
};
