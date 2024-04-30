export enum ProjectStatus {
	Draft = 'Draft',
	Completed = 'Complete'
}

export interface Project {
	id: string;
	name: string;
	owner: string;
	creationDate?: Date;
	status?: ProjectStatus;
	areaOfProduction?: string; // TODO: enum
	efficiency?: number;
	useEnergyMix?: number;
	electricityUse?: number;
}
