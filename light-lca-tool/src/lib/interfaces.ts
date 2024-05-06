export enum AlertType {
	success = 'variant-filled-success',
	error = 'variant-filled-error'
}

export enum ProjectStatus {
	Draft = 'Draft',
	Completed = 'Complete'
}

export interface Project {
	id: string;
	name: string;
	owner: string;
	creationDate?: Date | string;
	status?: ProjectStatus;
	areaOfProduction?: string; // TODO: enum
	efficiency?: number;
	useEnergyMix?: number;
	electricityUse?: number;
}
