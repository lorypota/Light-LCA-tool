import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);

// connect to the database
export async function connect(): Promise<void> {
	await client.connect();
}

export default client.db();
