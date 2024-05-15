import { describe, it, beforeAll, afterAll, beforeEach, expect, vi } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, ObjectId } from 'mongodb';
import {
	getProjectsArray,
	countProjects,
	getProjectByID,
	updateProjectByID,
	changeStatusByID
} from './projects';
import { ProjectAreaOfProduction, type Project, type ProjectStatus } from '$lib/interfaces';

let mongod: MongoMemoryServer;
let client: MongoClient;
let db: any;
let projectsCollection: any;

beforeAll(async () => {
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();
	client = new MongoClient(uri);
	await client.connect();
	db = client.db('test');
	projectsCollection = db.collection('projects');
});

afterAll(async () => {
	await client.close();
	await mongod.stop();
});

beforeEach(async () => {
	await projectsCollection.deleteMany({});
});

describe('projects.ts', () => {
	it('should get projects array', async () => {
		const mockProjects: Array<Partial<Project>> = [
			{
				name: 'Test Project',
				owner: 'Owner',
				creationDate: new Date('2023-05-14'),
				areaOfProduction: ProjectAreaOfProduction.China
			},
			{
				name: 'Test Project 2',
				owner: 'Owner 2',
				creationDate: new Date('2023-05-15'),
				areaOfProduction: ProjectAreaOfProduction.Europe
			}
		];

		await projectsCollection.insertMany(mockProjects);
		const result = await getProjectsArray(projectsCollection, {
			limit: 10,
			skip: 0,
			filter: '',
			searchString: ''
		});

		expect(result).toEqual(mockProjects);
	});

	it('should count projects', async () => {
		await projectsCollection.insertMany([{ name: 'Project 1' }, { name: 'Project 2' }]);
		const result = await countProjects(projectsCollection, { filter: '', searchString: '' });
		expect(result).toBe(2);
	});
});
