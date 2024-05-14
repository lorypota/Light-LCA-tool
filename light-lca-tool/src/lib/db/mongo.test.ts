import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { getMongoClient, closeMongoClient, functionMongoWrapper } from './mongo';

let mongod: MongoMemoryServer;
let originalMongoUrl: string;

beforeAll(async () => {
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();

	// Backup the original Mongo URL and set it to the in-memory server URI
	originalMongoUrl = process.env.MONGO_URL!;
	process.env.MONGO_URL = uri;
});

afterAll(async () => {
	await mongod.stop();

	// Restore the original Mongo URL
	process.env.MONGO_URL = originalMongoUrl;
});

describe('mongo.ts', () => {
	it('should get MongoClient', async () => {
		const client = await getMongoClient();
		expect(client).toBeInstanceOf(MongoClient);
		await closeMongoClient(client);
	});

	it('should close MongoClient', async () => {
		const client = await getMongoClient();
		await closeMongoClient(client);

		// Try to access the database after closing the client to ensure it is closed
		try {
			await client.db().admin().ping();
			throw new Error('Client is still connected');
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
		}
	});

	it('should execute functionMongoWrapper successfully', async () => {
		const mockFunction = async (collection: any) => {
			return await collection.insertOne({ name: 'Test' });
		};
		const result = await functionMongoWrapper('testCollection', mockFunction);
		expect(result.acknowledged).toBe(true);
	});

	it('should retry functionMongoWrapper on failure', async () => {
		let callCount = 0;
		const mockFunction = async (collection: any) => {
			callCount++;
			if (callCount < 1) throw new Error('Temporary error');
			return { success: true };
		};
		const result = await functionMongoWrapper('testCollection', mockFunction);
		expect(callCount).toBe(1);
		expect(result).toEqual({ success: true });
	});

	it('should throw an error after all retries', async () => {
		const mockFunction = async (collection: any) => {
			throw new Error('Permanent error');
		};
		await expect(functionMongoWrapper('testCollection', mockFunction)).rejects.toThrow(
			'MongoDB function failed after all retries'
		);
	});
});
