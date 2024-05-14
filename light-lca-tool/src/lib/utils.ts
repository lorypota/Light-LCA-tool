import type { Project } from './interfaces';
interface ProjectComparison extends Project {
	[key: string]: any;
}

export const areProjectsEqual = (
	project1: Partial<ProjectComparison>,
	project2: Partial<ProjectComparison>
): boolean => {
	const keys1 = Object.keys(project1);
	const keys2 = Object.keys(project2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (project1[key] !== project2[key]) {
			return false;
		}
	}

	return true;
};

export const formatDate = (date: Date | string): string => {
	if (typeof date == 'string') return date;
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};
