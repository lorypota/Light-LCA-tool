export enum AlertType {
	success = 'variant-filled-success',
	error = 'variant-filled-error'
}

export enum ProjectAreaOfProduction {
	Europe = 'Europe',
	UnitedStates = 'United States',
	Italy = 'Italy',
	France = 'France',
	Germany = 'Germany',
	Denmark = 'Denmark',
	UnitedKingdom = 'United Kingdom',
	Portugal = 'Portugal',
	Spain = 'Spain',
	China = 'China',
	Russia = 'Russia',
	India = 'India'
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
	areaOfProduction?: ProjectAreaOfProduction; // TODO: enum
	efficiency?: number;
	useEnergyMix?: number;
	electricityUse?: number;
}
