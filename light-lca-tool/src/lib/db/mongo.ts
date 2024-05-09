import { MONGO_URL, MONGO_RETRY_TIMES, MONGO_RETRY_WAIT_SECONDS } from '$env/static/private';
import { MongoClient } from 'mongodb';

export const getMongoClient = async () =>
	await MongoClient.connect(MONGO_URL, { connectTimeoutMS: 100 });

export const closeMongoClient = async (client: MongoClient | null) => {
	if (client !== null) await client.close();
};

/**
 * Wraps a MongoDB function with error handling and retry logic.
 *
 * @param collectionName - The name of the MongoDB collection to operate on.
 * @param func - The MongoDB function to execute.
 * @param params - Optional parameters to pass to the MongoDB function.
 * @returns A promise that resolves to the result of the MongoDB function.
 * @throws An error if the MongoDB function fails after all retries.
 */
export const functionMongoWrapper = async <R>(
	collectionName: string,
	func: (collection: any, params?: any) => Promise<R>,
	params: any = null
) => {
	let client: MongoClient | null = null;
	let result: R;
	let retries = 0;
	while (retries < Number(MONGO_RETRY_TIMES)) {
		try {
			client = await getMongoClient();
			// connected to MongoDB
			let collection = client.db().collection(collectionName);
			if (params === null) result = await func(collection);
			else result = await func(collection, params);
			await closeMongoClient(client);
			// closed MongoDB connection;
			return result;
		} catch (e) {
			retries++;
			console.error(`Error in MongoDB function: ${e}`);
			await closeMongoClient(client);
			await new Promise<void>((resolve) =>
				setTimeout(resolve, Number(MONGO_RETRY_WAIT_SECONDS) * 1000)
			);
		}
	}
	throw new Error('MongoDB function failed after all retries');
};
