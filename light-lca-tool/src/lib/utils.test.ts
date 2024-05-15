import { it, expect } from 'vitest';
import { areProjectsEqual, formatDate } from './utils';
import { ProjectAreaOfProduction, ProjectStatus, type Project } from './interfaces';
import { ObjectId } from 'mongodb';

it('compares equality between two projects', () => {
	const _id = new ObjectId();

	let project1: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	let project2: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	expect(areProjectsEqual(project1, project2)).toBe(true);
});

it('compares inequality between two projects with different names', () => {
	const _id = new ObjectId();

	let project1: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	let project2: Project = {
		name: 'Project 2',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	expect(areProjectsEqual(project1, project2)).toBe(false);
});

it('compares inequality between two projects with missing properties', () => {
	const _id = new ObjectId();

	let project1: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	let project2: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	delete project1.creationDate;
	delete project1.status;
	delete project1.areaOfProduction;

	expect(areProjectsEqual(project1, project2)).toBe(false);
});

it('compares equality between two projects with missing properties', () => {
	const _id = new ObjectId();

	let project1: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	let project2: Project = {
		name: 'Project 1',
		owner: 'Owner 1',
		_id,
		creationDate: new Date('2021-01-01'),
		areaOfProduction: ProjectAreaOfProduction.China,
		status: ProjectStatus.Completed,
		efficiency: 31,
		electricityUse: 61,
		useEnergyMix: 12
	};

	delete project1.creationDate;
	delete project1.status;
	delete project1.areaOfProduction;
	delete project2.creationDate;
	delete project2.status;
	delete project2.areaOfProduction;

	expect(areProjectsEqual(project1, project2)).toBe(true);
});

it('formats a Date type with time into the format YYYY-MM-DD', () => {
	const date = new Date('2023-06-15T12:30:00');
	expect(formatDate(date)).toBe('2023-06-15');
});

it('formats a Date type with different time zone into the format YYYY-MM-DD', () => {
	const date = new Date('2024-09-20T00:00:00-03:00');
	expect(formatDate(date)).toBe('2024-09-20');
});

it('formats a Date type with time and milliseconds into the format YYYY-MM-DD', () => {
	const date = new Date('2025-03-10T18:45:30.500Z');
	expect(formatDate(date)).toBe('2025-03-10');
});
