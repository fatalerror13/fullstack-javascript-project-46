import { existsSync, readFileSync } from 'node:fs';

export const parseJsonByPath = (path: string): JSON => {
	if (existsSync(path)) {
		const fileSting1 = readFileSync(path, { encoding: 'utf8' });
		return JSON.parse(fileSting1) as JSON;
	} else {
		throw new Error(`File with path ${path} not exist`);
	}
};
