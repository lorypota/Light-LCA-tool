import type { Project } from './interfaces';

export const areProjectsEqual = (project1: Project, project2: Project): boolean => {
	return (
		project1.name === project2.name &&
		project1.owner === project2.owner &&
		project1.creationDate === project2.creationDate &&
		project1.areaOfProduction === project2.areaOfProduction &&
		project1.status === project2.status &&
		project1.efficiency === project2.efficiency &&
		project1.electricityUse === project2.electricityUse &&
		project1._id === project2._id &&
		project1.useEnergyMix === project2.useEnergyMix
	);
};

export const formatDate = (date: Date | string): string => {
	if (typeof date == 'string') return date;
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

export function serializeProject(project: Project) {
	return {
		...project,
		_id: project._id.toString()
	};
}

export function serializeProjects(projects: Project[]) {
	return projects.map(serializeProject);
}
